import { DeploymentEnvironmentName, EnvironmentVariableKeys } from "./types";

type Environments = Record<DeploymentEnvironmentName, Record<EnvironmentVariableKeys, string>>;

const environmentConfigs: Environments = {
  [DeploymentEnvironmentName.LOCAL]: {
    BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL ?? "http://localhost:3000",
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  },
  [DeploymentEnvironmentName.DEVELOPMENT]: {
    BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL ?? "http://localhost:3000",
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  },
  [DeploymentEnvironmentName.PRODUCTION]: {
    BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL ?? "https://api.datt.ai",
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  },
};

export function getEnvironmentConfig(environmentName: string | undefined) {
  const normalizedEnvironmentName = Object.values(DeploymentEnvironmentName).includes(
    environmentName as DeploymentEnvironmentName,
  )
    ? (environmentName as DeploymentEnvironmentName)
    : DeploymentEnvironmentName.LOCAL;

  const selectedEnvironment = environmentConfigs[normalizedEnvironmentName];
  return selectedEnvironment ?? environmentConfigs[DeploymentEnvironmentName.LOCAL];
}

export const environmentConfig = getEnvironmentConfig(
  import.meta.env.VITE_ENVIRONMENT_NAME,
);
