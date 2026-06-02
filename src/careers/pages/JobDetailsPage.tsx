import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useGetJob } from "@src/careers/api/useGetJob";
import { EMPLOYMENT_TYPE_LABELS } from "@src/careers/types";
import { NotFoundPage } from "@src/lib/layouts";
import { type ReactElement } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

export function JobDetailsPage(): ReactElement {
  const { jobId = "" } = useParams();
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

  const isExpired = new Date(job.deadline) < new Date();

  return (
    <Stack spacing={3} maxWidth={800}>
      <Button component={RouterLink} to="/careers" variant="text" sx={{ alignSelf: "flex-start" }}>
        Back to Careers
      </Button>

      <Typography variant="h2">{job.title}</Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label={job.location} />
        <Chip label={EMPLOYMENT_TYPE_LABELS[job.employmentType]} />
        <Chip label={job.experience} />
        <Chip label={job.department} />
      </Stack>

      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
        {job.description}
      </Typography>

      <Box>
        <Typography variant="h4" gutterBottom>
          Skills Required
        </Typography>
        <Typography>{job.skills}</Typography>
      </Box>

      {job.salary ? (
        <Typography variant="body1">
          <strong>Salary Range:</strong> {job.salary}
        </Typography>
      ) : null}

      <Typography variant="caption" color="text.secondary">
        Posted {new Date(job.postedAt).toLocaleDateString()} · Apply by{" "}
        {new Date(job.deadline).toLocaleDateString()}
      </Typography>

      <Button
        component={RouterLink}
        to={`/careers/${job.id}/apply`}
        variant="contained"
        disabled={isExpired}
        sx={{ alignSelf: "flex-start" }}
      >
        {isExpired ? "Application Closed" : "Apply Now"}
      </Button>
    </Stack>
  );
}
