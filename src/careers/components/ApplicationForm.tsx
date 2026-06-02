import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { TextInputField } from "@src/lib/formFields/TextInputField";
import { type ReactElement, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useSubmitApplication } from "../api/useSubmitApplication";

const MAX_RESUME_MB = 5;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const applicationFormSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  yearsOfExperience: z.coerce.number().min(0, "Must be 0 or more"),
  skills: z.string().min(1, "Required"),
  linkedIn: z.string().optional(),
  portfolio: z.string().optional(),
  coverLetter: z.string().optional(),
});

type ApplicationFormFields = z.infer<typeof applicationFormSchema>;

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onSuccess: (applicationId: string) => void;
}

export function ApplicationForm({
  jobId,
  jobTitle,
  onSuccess,
}: ApplicationFormProps): ReactElement {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const formMethods = useForm<ApplicationFormFields>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      yearsOfExperience: 0,
      skills: "",
      linkedIn: "",
      portfolio: "",
      coverLetter: "",
    },
  });

  const { mutate, isPending } = useSubmitApplication({
    onSuccess: (data) => onSuccess(data.id),
  });

  function handleResumeChange(file: File | undefined) {
    setResumeError(null);
    if (!file) {
      setResume(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setResumeError("Resume must be PDF, DOC, or DOCX");
      setResume(null);
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setResumeError(`Max file size is ${MAX_RESUME_MB} MB`);
      setResume(null);
      return;
    }
    setResume(file);
  }

  return (
    <FormProvider {...formMethods}>
      <Box
        component="form"
        onSubmit={formMethods.handleSubmit((data) => {
          if (!resume) {
            setResumeError("Resume is required");
            return;
          }
          mutate({ ...data, jobId, resume });
        })}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 560 }}
      >
        <Typography variant="body2" color="text.secondary">
          Applying for: <strong>{jobTitle}</strong>
        </Typography>

        <TextInputField name="fullName" label="Full Name" required fullWidth />
        <TextInputField name="email" label="Email" type="email" required fullWidth />
        <TextInputField name="phone" label="Phone" required fullWidth />
        <TextInputField name="location" label="Current Location" required fullWidth />
        <TextInputField
          name="yearsOfExperience"
          label="Years of Experience"
          type="number"
          required
          fullWidth
        />
        <TextInputField name="skills" label="Skills" required fullWidth multiline rows={2} />
        <TextInputField name="linkedIn" label="LinkedIn (optional)" fullWidth />
        <TextInputField name="portfolio" label="Portfolio / GitHub (optional)" fullWidth />
        <TextInputField
          name="coverLetter"
          label="Cover Letter (optional)"
          fullWidth
          multiline
          rows={4}
        />

        <Box>
          <Typography variant="body2" gutterBottom>
            Resume (PDF, DOC, DOCX — max {MAX_RESUME_MB} MB) *
          </Typography>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => handleResumeChange(e.target.files?.[0])}
          />
          {resume ? (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Selected: {resume.name}
            </Typography>
          ) : null}
          {resumeError ? (
            <Typography variant="caption" color="error" display="block">
              {resumeError}
            </Typography>
          ) : null}
        </Box>

        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </Box>
    </FormProvider>
  );
}
