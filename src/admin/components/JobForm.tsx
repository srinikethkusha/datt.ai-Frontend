import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { EMPLOYMENT_TYPE_LABELS, type Job, jobStatusSchema } from "@src/careers/types";
import { SelectField } from "@src/lib/formFields/SelectField";
import { TextInputField } from "@src/lib/formFields/TextInputField";
import { type ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const jobFormSchema = z.object({
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"]),
  experience: z.string().min(1),
  skills: z.string().min(1),
  description: z.string().min(1),
  salary: z.string().optional(),
  status: jobStatusSchema.default("ACTIVE"),
  deadline: z.string().min(1),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  defaultValues?: Partial<Job>;
  onSubmit: (values: JobFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function JobForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save",
}: JobFormProps): ReactElement {
  const formMethods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      department: defaultValues?.department ?? "",
      location: defaultValues?.location ?? "",
      employmentType: defaultValues?.employmentType ?? "FULL_TIME",
      experience: defaultValues?.experience ?? "",
      skills: defaultValues?.skills ?? "",
      description: defaultValues?.description ?? "",
      salary: defaultValues?.salary ?? "",
      status: defaultValues?.status ?? "ACTIVE",
      deadline: defaultValues?.deadline
        ? new Date(defaultValues.deadline).toISOString().slice(0, 10)
        : "",
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Box
        component="form"
        onSubmit={formMethods.handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 640 }}
      >
        <TextInputField name="title" label="Job Title" required fullWidth />
        <TextInputField name="department" label="Department" required fullWidth />
        <TextInputField name="location" label="Location" required fullWidth />
        <SelectField
          name="employmentType"
          label="Employment Type"
          fullWidth
          options={Object.entries(EMPLOYMENT_TYPE_LABELS).map(([value, key]) => ({
            value,
            key,
          }))}
        />
        <TextInputField name="experience" label="Experience Required" required fullWidth />
        <TextInputField name="skills" label="Skills" required fullWidth multiline rows={2} />
        <TextInputField
          name="description"
          label="Job Description"
          required
          fullWidth
          multiline
          rows={6}
        />
        <TextInputField name="salary" label="Salary (optional)" fullWidth />
        <SelectField
          name="status"
          label="Status"
          fullWidth
          options={[
            { value: "ACTIVE", key: "Active" },
            { value: "INACTIVE", key: "Inactive" },
          ]}
        />
        <TextInputField
          name="deadline"
          label="Application Deadline"
          type="date"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </Box>
    </FormProvider>
  );
}
