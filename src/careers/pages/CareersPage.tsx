import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useGetJobs } from "@src/careers/api/useGetJobs";
import { EMPLOYMENT_TYPE_LABELS } from "@src/careers/types";
import { type ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

export function CareersPage(): ReactElement {
  const { data: jobs, isLoading, isError } = useGetJobs();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="error" gutterBottom>
          Unable to load job openings.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Make sure the backend is running on port 3000 (database-cons: npm run start:dev).
        </Typography>
      </Box>
    );
  }

  if (!jobs?.length) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h2" gutterBottom>
          Careers at Datt.ai
        </Typography>
        <Typography color="text.secondary">No open positions right now. Check back soon.</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h2" gutterBottom>
          Careers at Datt.ai
        </Typography>
        <Typography color="text.secondary">
          Explore our open positions and apply directly from this page.
        </Typography>
      </Box>

      <Stack spacing={2}>
        {jobs.map((job) => (
          <Card key={job.id} variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h3">{job.title}</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label={job.location} size="small" />
                  <Chip label={EMPLOYMENT_TYPE_LABELS[job.employmentType]} size="small" />
                  <Chip label={job.experience} size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {job.skills}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {job.description}
                </Typography>
                {job.salary ? (
                  <Typography variant="body2">Salary: {job.salary}</Typography>
                ) : null}
                <Typography variant="caption" color="text.secondary">
                  Posted {new Date(job.postedAt).toLocaleDateString()}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/careers/${job.id}`} variant="outlined">
                View Details
              </Button>
              <Button component={RouterLink} to={`/careers/${job.id}/apply`} variant="contained">
                Apply
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
