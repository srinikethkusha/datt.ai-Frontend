import { z } from "zod";

export const employmentTypeSchema = z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"]);
export const jobStatusSchema = z.enum(["ACTIVE", "INACTIVE"]);

export const jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  department: z.string(),
  location: z.string(),
  employmentType: employmentTypeSchema,
  experience: z.string(),
  skills: z.string(),
  description: z.string(),
  salary: z.string().nullable().optional(),
  status: jobStatusSchema,
  deadline: z.string(),
  postedAt: z.string(),
  updatedAt: z.string(),
});

export const jobsResponseSchema = z.array(jobSchema);

export type Job = z.infer<typeof jobSchema>;

export const EMPLOYMENT_TYPE_LABELS: Record<Job["employmentType"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
};

export const applicationStatusSchema = z.enum([
  "RECEIVED",
  "HR_SCREENING",
  "TECH_EVAL",
  "INTERVIEW",
  "FINAL_REVIEW",
  "OFFER_SENT",
  "REJECTED",
  "CLOSED",
]);

export const applicationSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  yearsOfExperience: z.number(),
  skills: z.string(),
  linkedIn: z.string().nullable().optional(),
  portfolio: z.string().nullable().optional(),
  coverLetter: z.string().nullable().optional(),
  resumePath: z.string(),
  status: applicationStatusSchema,
  appliedAt: z.string(),
  updatedAt: z.string(),
  job: z.object({ id: z.string(), title: z.string() }).optional(),
});

export type Application = z.infer<typeof applicationSchema>;

export const APPLICATION_STATUS_LABELS: Record<
  z.infer<typeof applicationStatusSchema>,
  string
> = {
  RECEIVED: "Application Received",
  HR_SCREENING: "HR Screening",
  TECH_EVAL: "Technical Evaluation",
  INTERVIEW: "Interview Scheduled",
  FINAL_REVIEW: "Final Review",
  OFFER_SENT: "Offer Letter Sent",
  REJECTED: "Rejected",
  CLOSED: "Closed",
};

export const adminStatsSchema = z.object({
  activeJobs: z.number(),
  totalApplications: z.number(),
  newApplicationsThisWeek: z.number(),
  applicationsByStatus: z.record(z.string(), z.number()),
});
