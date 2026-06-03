import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EMPLOYMENT_TYPE_LABELS } from "@src/careers/types";
import { type ReactElement, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useDeleteJob, useGetAdminJobs } from "../api/useAdminJobs";

export function JobsPage(): ReactElement {
  const { data: jobs, isLoading } = useGetAdminJobs();
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = (jobId: string) => {
    setJobToDelete(jobId);
  };

  const handleDeleteCancel = () => {
    setJobToDelete(null);
  };

  const handleDeleteConfirmation = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete, {
        onSuccess: () => {
          setJobToDelete(null);
        },
      });
    }
  };

  const jobToDeleteTitle = jobs?.find((j) => j.id === jobToDelete)?.title || "";

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h2">Job Management</Typography>
        <Button component={RouterLink} to="/admin/jobs/new" variant="contained">
          Create Job
        </Button>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{EMPLOYMENT_TYPE_LABELS[job.employmentType]}</TableCell>
                <TableCell>
                  <Chip
                    label={job.status}
                    color={job.status === "ACTIVE" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button component={RouterLink} to={`/admin/jobs/${job.id}/edit`} size="small">
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteConfirm(job.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(jobToDelete)} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Job Posting</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the job posting "<strong>{jobToDeleteTitle}</strong>"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirmation}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
