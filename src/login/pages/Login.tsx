import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "@src/auth/useAuth";
import { type ReactElement } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";

export function Login(): ReactElement {
  const { setAuthUser, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/demo/posts" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h2">Demo login (posts)</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          setAuthUser({ userId: "user-id", name: "Test User" });
          navigate("/demo/posts");
        }}
      >
        Login to demo posts
      </Button>
      <Button component={RouterLink} to="/admin/login" variant="contained">
        HR Admin Login
      </Button>
      <Button component={RouterLink} to="/careers" variant="text">
        View Careers
      </Button>
    </Box>
  );
}
