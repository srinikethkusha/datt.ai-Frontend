import { type AllowedUseMutationOptions, type AllowedUseQueryOptions } from "@src/api/types";
import { type Job, jobSchema, jobsResponseSchema } from "@src/careers/types";
import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";

import { adminApiClient } from "./adminApiClient";

export function useGetAdminJobs(
  options: AllowedUseQueryOptions<Job[]> = {},
): UseQueryResult<Job[]> {
  return useQuery({
    ...options,
    queryKey: ["admin", "jobs"],
    queryFn: async () => {
      const { data } = await adminApiClient.get("/admin/jobs");
      return jobsResponseSchema.parse(data);
    },
  });
}

export function useGetAdminJob(jobId: string): UseQueryResult<Job> {
  return useQuery({
    queryKey: ["admin", "jobs", jobId],
    enabled: Boolean(jobId),
    queryFn: async () => {
      const { data } = await adminApiClient.get(`/admin/jobs/${jobId}`);
      return jobSchema.parse(data);
    },
  });
}

export type JobFormInput = {
  title: string;
  department: string;
  location: string;
  employmentType: Job["employmentType"];
  experience: string;
  skills: string;
  description: string;
  salary?: string;
  status?: Job["status"];
  deadline: string;
};

export function useCreateJob(
  options: AllowedUseMutationOptions<Job, JobFormInput> = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (input) => {
      const { data } = await adminApiClient.post("/admin/jobs", input);
      return jobSchema.parse(data);
    },
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "jobs"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      void queryClient.invalidateQueries({ queryKey: ["jobs"] });
      options.onSuccess?.(...args);
    },
  });
}

export function useUpdateJob(
  jobId: string,
  options: AllowedUseMutationOptions<Job, JobFormInput> = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (input) => {
      const { data } = await adminApiClient.put(`/admin/jobs/${jobId}`, input);
      return jobSchema.parse(data);
    },
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "jobs"] });
      void queryClient.invalidateQueries({ queryKey: ["jobs"] });
      options.onSuccess?.(...args);
    },
  });
}
