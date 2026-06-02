import { type AllowedUseQueryOptions, get } from "@src/api";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { jobSchema, type Job } from "../types";

export function useGetJob(
  jobId: string,
  options: AllowedUseQueryOptions<Job> = {},
): UseQueryResult<Job> {
  const url = `/jobs/${jobId}`;

  return useQuery({
    ...options,
    enabled: Boolean(jobId),
    meta: {
      userErrorMessage: "Error while loading job details",
    },
    queryKey: ["jobs", jobId],
    queryFn: async () => {
      const response = await get({
        url,
        responseSchema: jobSchema,
      });
      return response.data;
    },
  });
}
