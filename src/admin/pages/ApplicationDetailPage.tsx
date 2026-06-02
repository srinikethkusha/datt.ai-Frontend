import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  APPLICATION_STATUS_LABELS,
  type Application,
  applicationStatusSchema,
} from "@src/careers/types";
import { useToast } from "@src/lib/notifications/useToast";
import { type ReactElement, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  downloadApplicationResume,
  useGetApplication,
  useSendInterviewEmail,
  useSendOfferLetter,
  useUpdateApplicationStatus,
} from "../api/useAdminApplications";
import { EmailModal } from "../components/EmailModal";

export function ApplicationDetailPage(): ReactElement {
  const { id = "" } = useParams();
  const { showSuccessToast, showErrorToast } = useToast();
  const { data: application, isLoading } = useGetApplication(id);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  const { mutate: updateStatus } = useUpdateApplicationStatus(id, {
    onSuccess: () => showSuccessToast("Status updated"),
  });

  const { mutate: sendInterview, isPending: sendingInterview } = useSendInterviewEmail(id, {
    onSuccess: () => {
      showSuccessToast("Interview email sent");
      setInterviewOpen(false);
    },
  });

  const { mutate: sendOffer, isPending: sendingOffer } = useSendOfferLetter(id, {
    onSuccess: () => {
      showSuccessToast("Offer letter sent");
      setOfferOpen(false);
    },
  });

  if (isLoading || !application) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Button component={RouterLink} to="/admin/applications" sx={{ mb: 2 }}>
        Back to applications
      </Button>
      <Typography variant="h2" gutterBottom>
        {application.fullName}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Applied for: {application.job?.title ?? application.jobId}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
        <Typography>Email: {application.email}</Typography>
        <Typography>Phone: {application.phone}</Typography>
        <Typography>Location: {application.location}</Typography>
        <Typography>Experience: {application.yearsOfExperience} years</Typography>
        <Typography>Skills: {application.skills}</Typography>
        {application.linkedIn ? <Typography>LinkedIn: {application.linkedIn}</Typography> : null}
        {application.portfolio ? <Typography>Portfolio: {application.portfolio}</Typography> : null}
        {application.coverLetter ? (
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            Cover letter: {application.coverLetter}
          </Typography>
        ) : null}
      </Box>

      <TextField
        select
        label="Status"
        value={application.status}
        onChange={(e) =>
          updateStatus(e.target.value as Application["status"])
        }
        sx={{ minWidth: 280, mb: 2 }}
      >
        {Object.values(applicationStatusSchema.enum).map((s) => (
          <MenuItem key={s} value={s}>
            {APPLICATION_STATUS_LABELS[s]}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          onClick={() =>
            void downloadApplicationResume(id).catch(() => showErrorToast("Download failed"))
          }
        >
          Download Resume
        </Button>
        <Button variant="outlined" onClick={() => setInterviewOpen(true)}>
          Send Interview Email
        </Button>
        <Button variant="contained" onClick={() => setOfferOpen(true)}>
          Send Offer Letter
        </Button>
      </Box>

      <EmailModal
        open={interviewOpen}
        title="Send interview email"
        defaultSubject={`Interview invitation — Datt.ai`}
        defaultBody={`Dear ${application.fullName},\n\nWe would like to invite you for an interview regarding your application.\n\nBest regards,\nDatt.ai HR Team`}
        onClose={() => setInterviewOpen(false)}
        onSend={(payload) => sendInterview(payload)}
        isSending={sendingInterview}
      />

      <EmailModal
        open={offerOpen}
        title="Send offer letter"
        defaultSubject={`Offer letter — Datt.ai`}
        defaultBody={`Dear ${application.fullName},\n\nPlease find attached our offer letter. We look forward to welcoming you to Datt.ai.\n\nBest regards,\nDatt.ai HR Team`}
        onClose={() => setOfferOpen(false)}
        onSend={(payload) => sendOffer(payload)}
        isSending={sendingOffer}
      />
    </Box>
  );
}
