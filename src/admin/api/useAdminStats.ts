import { adminStatsSchema } from "@src/careers/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { adminApiClient } from "./adminApiClient";

export type AdminStats = z.infer<typeof adminStatsSchema>;

export function useAdminStats(): UseQueryResult<AdminStats> {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const { data } = await adminApiClient.get("/admin/stats");
      return adminStatsSchema.parse(data);
    },
  });
}
