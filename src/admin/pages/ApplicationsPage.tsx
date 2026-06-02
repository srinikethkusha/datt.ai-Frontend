import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { APPLICATION_STATUS_LABELS, applicationStatusSchema } from "@src/careers/types";
import { type ReactElement, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useGetApplications } from "../api/useAdminApplications";

export function ApplicationsPage(): ReactElement {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { data: applications, isLoading } = useGetApplications({
    search: search || undefined,
    status: status || undefined,
  });

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Applications
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Status"
          size="small"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {Object.values(applicationStatusSchema.enum).map((s) => (
            <MenuItem key={s} value={s}>
              {APPLICATION_STATUS_LABELS[s]}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.fullName}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.job?.title ?? app.jobId}</TableCell>
                <TableCell>
                  {APPLICATION_STATUS_LABELS[app.status]}
                </TableCell>
                <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/admin/applications/${app.id}`}
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}
