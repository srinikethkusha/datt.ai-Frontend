import axios, { type AxiosError } from "axios";
import { environmentConfig } from "@src/environment";
import { supabase } from "@src/auth/supabaseClient";

export class AdminApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly isBackendAuthConfig = false,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

export async function getAdminAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export const adminApiClient = axios.create({
  baseURL: environmentConfig.BACKEND_API_URL,
});

adminApiClient.interceptors.request.use(async (config) => {
  const headers = await getAdminAuthHeaders();
  Object.assign(config.headers, headers);
  return config;
});

adminApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        throw new AdminApiError(
          "Backend rejected your login token. Set SUPABASE_URL, SUPABASE_JWT_SECRET, and SUPABASE_SERVICE_ROLE_KEY in datt.ai-BE/.env, then restart the backend.",
          401,
          true,
        );
      }

      await supabase.auth.signOut();
      window.location.href = "/admin/login";
    }

    throw error;
  },
);
