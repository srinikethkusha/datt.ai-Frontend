import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGetJob } from "@src/careers/api/useGetJob";
import { ApplicationForm } from "@src/careers/components/ApplicationForm";
import { NotFoundPage } from "@src/lib/layouts";
import { type ReactElement } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

export function ApplyPage(): ReactElement {
  const { jobId = "" } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useGetJob(jobId);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !job) {
    return <NotFoundPage />;
  }

  return (
    <Box>
      <Button component={RouterLink} to={`/careers/${jobId}`} sx={{ mb: 2 }}>
        Back to job
      </Button>
      <Typography variant="h2" gutterBottom>
        Apply for {job.title}
      </Typography>
      <ApplicationForm
        jobId={job.id}
        jobTitle={job.title}
        onSuccess={() => navigate(`/careers/${jobId}/apply/success`, { replace: true })}
      />
    </Box>
  );
}
