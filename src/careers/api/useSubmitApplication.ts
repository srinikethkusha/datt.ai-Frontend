import { postFormData } from "@src/api";
import { type AllowedUseMutationOptions } from "@src/api/types";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { z } from "zod";

const submitResponseSchema = z.object({
  id: z.string(),
});

export interface ApplicationFormValues {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  yearsOfExperience: number;
  skills: string;
  linkedIn?: string;
  portfolio?: string;
  coverLetter?: string;
  resume: File;
}

export function useSubmitApplication(
  options: AllowedUseMutationOptions<{ id: string }, ApplicationFormValues> = {},
): UseMutationResult<{ id: string }, Error, ApplicationFormValues> {
  return useMutation({
    ...options,
    meta: {
      userSuccessMessage: "Application submitted successfully",
      userErrorMessage: "Failed to submit application",
    },
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("jobId", values.jobId);
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("location", values.location);
      formData.append("yearsOfExperience", String(values.yearsOfExperience));
      formData.append("skills", values.skills);
      if (values.linkedIn) formData.append("linkedIn", values.linkedIn);
      if (values.portfolio) formData.append("portfolio", values.portfolio);
      if (values.coverLetter) formData.append("coverLetter", values.coverLetter);
      formData.append("resume", values.resume);

      const data = await postFormData("/applications", formData);
      return submitResponseSchema.parse(data);
    },
  });
}
