import { Box, Button, Typography } from "@mui/material";
import { type ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

export function ApplySuccessPage(): ReactElement {
  return (
    <Box sx={{ textAlign: "center", py: 6, maxWidth: 560, mx: "auto" }}>
      <Typography variant="h2" gutterBottom color="success.main">
        Application Submitted
      </Typography>
      <Typography paragraph>
        Thank you for applying at Datt.ai. Your application has been received successfully.
        Our HR and technical team will review your profile and contact you regarding next
        steps.
      </Typography>
      <Button component={RouterLink} to="/careers" variant="contained">
        Back to Careers
      </Button>
    </Box>
  );
}
