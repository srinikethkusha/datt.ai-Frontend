import { type EnvironmentVariableKeys } from "../types";

export const environmentConfigMock: Record<EnvironmentVariableKeys, string> = {
  BACKEND_API_URL: "https://api.backend.com",
  SUPABASE_URL: "https://test.supabase.co",
  SUPABASE_ANON_KEY: "test-anon-key",
};
