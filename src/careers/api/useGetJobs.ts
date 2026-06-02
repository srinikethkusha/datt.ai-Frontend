import { type AllowedUseQueryOptions, get } from "@src/api";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { jobsResponseSchema, type Job } from "../types";

export function useGetJobs(
  options: AllowedUseQueryOptions<Job[]> = {},
): UseQueryResult<Job[]> {
  const url = "/jobs";

  return useQuery({
    ...options,
    meta: {
      userErrorMessage: "Error while loading job openings",
    },
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await get({
        url,
        responseSchema: jobsResponseSchema,
      });
      return response.data;
    },
  });
}
