import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { type ReactElement, useState } from "react";

interface EmailModalProps {
  open: boolean;
  title: string;
  defaultSubject: string;
  defaultBody: string;
  onClose: () => void;
  onSend: (payload: { subject: string; body: string }) => void;
  isSending?: boolean;
}

export function EmailModal({
  open,
  title,
  defaultSubject,
  defaultBody,
  onClose,
  onSend,
  isSending,
}: EmailModalProps): ReactElement {
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth />
        <TextField
          label="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          multiline
          rows={8}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={isSending}
          onClick={() => onSend({ subject, body })}
        >
          {isSending ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
