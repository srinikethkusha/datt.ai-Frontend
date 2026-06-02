import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { type ReactNode } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";

interface CareersLayoutProps {
  children?: ReactNode;
}

export function CareersLayout({ children }: CareersLayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component={RouterLink}
            to="/careers"
            variant="h4"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Datt.ai Careers
          </Typography>
          <Button component={RouterLink} to="/admin/login" variant="outlined" color="primary">
            Admin Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children ?? <Outlet />}
      </Container>
    </Box>
  );
}
