import { Box, Typography } from "@mui/material";
import { type ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCreateJob, useGetAdminJob, useUpdateJob } from "../api/useAdminJobs";
import { JobForm, type JobFormValues } from "../components/JobForm";

export function JobFormPage(): ReactElement {
  const { jobId } = useParams();
  const isEdit = Boolean(jobId);
  const navigate = useNavigate();
  const { data: job, isLoading } = useGetAdminJob(jobId ?? "");

  const { mutate: createJob, isPending: isCreating } = useCreateJob({
    onSuccess: () => navigate("/admin/jobs"),
  });

  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob(jobId ?? "", {
    onSuccess: () => navigate("/admin/jobs"),
  });

  function handleSubmit(values: JobFormValues) {
    const payload = {
      ...values,
      deadline: new Date(values.deadline).toISOString(),
      salary: values.salary || undefined,
    };
    if (isEdit) {
      updateJob(payload);
    } else {
      createJob(payload);
    }
  }

  if (isEdit && isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        {isEdit ? "Edit Job" : "Create Job"}
      </Typography>
      <JobForm
        defaultValues={job}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
        submitLabel={isEdit ? "Update Job" : "Create Job"}
      />
    </Box>
  );
}
