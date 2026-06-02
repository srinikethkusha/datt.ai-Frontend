import { type AllowedUseMutationOptions, type AllowedUseQueryOptions } from "@src/api/types";
import {
  type Application,
  applicationSchema,
  type applicationStatusSchema,
} from "@src/careers/types";
import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { adminApiClient } from "./adminApiClient";

const applicationsSchema = z.array(applicationSchema);

export function useGetApplications(
  filters?: { jobId?: string; status?: string; search?: string },
  options: AllowedUseQueryOptions<Application[]> = {},
): UseQueryResult<Application[]> {
  return useQuery({
    ...options,
    queryKey: ["admin", "applications", filters],
    queryFn: async () => {
      const { data } = await adminApiClient.get("/admin/applications", { params: filters });
      return applicationsSchema.parse(data);
    },
  });
}

export function useGetApplication(id: string): UseQueryResult<Application> {
  return useQuery({
    queryKey: ["admin", "applications", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await adminApiClient.get(`/admin/applications/${id}`);
      return applicationSchema.parse(data);
    },
  });
}

export function useUpdateApplicationStatus(
  id: string,
  options: AllowedUseMutationOptions<Application, z.infer<typeof applicationStatusSchema>> = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (status) => {
      const { data } = await adminApiClient.patch(`/admin/applications/${id}/status`, {
        status,
      });
      return applicationSchema.parse(data);
    },
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
      void queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      options.onSuccess?.(...args);
    },
  });
}

export function useSendInterviewEmail(
  id: string,
  options: AllowedUseMutationOptions<unknown, { subject: string; body: string }> = {},
) {
  return useMutation({
    ...options,
    mutationFn: async (payload: { subject: string; body: string }) => {
      const { data } = await adminApiClient.post(
        `/admin/applications/${id}/send-interview`,
        payload,
      );
      return data;
    },
  });
}

export function useSendOfferLetter(
  id: string,
  options: AllowedUseMutationOptions<unknown, { subject: string; body: string }> = {},
) {
  return useMutation({
    ...options,
    mutationFn: async (payload: { subject: string; body: string }) => {
      const { data } = await adminApiClient.post(
        `/admin/applications/${id}/send-offer`,
        payload,
      );
      return data;
    },
  });
}

export async function downloadApplicationResume(id: string): Promise<void> {
  const { data } = await adminApiClient.get(`/admin/applications/${id}/resume`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resume";
  link.click();
  window.URL.revokeObjectURL(url);
}
