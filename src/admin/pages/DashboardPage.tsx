import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { APPLICATION_STATUS_LABELS } from "@src/careers/types";
import { type ReactElement } from "react";

import { AdminApiError } from "../api/adminApiClient";
import { useAdminStats } from "../api/useAdminStats";

export function DashboardPage(): ReactElement {
  const { data: stats, isLoading, isError, error } = useAdminStats();

  const backendAuthError =
    isError && error instanceof AdminApiError && error.isBackendAuthConfig;

  if (backendAuthError) {
    return (
      <Box>
        <Typography variant="h2" gutterBottom>
          Dashboard
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
        <Typography variant="body2" color="text.secondary">
          You are logged in to Supabase, but the NestJS backend cannot verify your token yet.
          Update <code>database-cons/.env</code> and restart <code>npm run start:dev</code>.
        </Typography>
      </Box>
    );
  }

  if (isLoading || !stats) {
    return <Typography>Loading dashboard...</Typography>;
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load dashboard. Is the backend running on port 3000?
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Active jobs</Typography>
              <Typography variant="h3">{stats.activeJobs}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total applications</Typography>
              <Typography variant="h3">{stats.totalApplications}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">New this week</Typography>
              <Typography variant="h3">{stats.newApplicationsThisWeek}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h3" gutterBottom>
        Applications by stage
      </Typography>
      <Grid container spacing={1}>
        {Object.entries(stats.applicationsByStatus).map(([status, count]) => (
          <Grid item xs={12} sm={6} md={4} key={status}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2">
                  {APPLICATION_STATUS_LABELS[status as keyof typeof APPLICATION_STATUS_LABELS] ??
                    status}
                </Typography>
                <Typography variant="h4">{count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
