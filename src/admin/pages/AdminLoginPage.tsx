import { Box, Button, CircularProgress, Link, TextField, Typography } from "@mui/material";
import { useSupabaseAuthContext } from "@src/auth/useSupabaseAuth";
import { FullScreenPageLayout } from "@src/lib/layouts";
import { type ReactElement, useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";

export function AdminLoginPage(): ReactElement {
  const { signIn, getAccessToken, isAuthenticated, loading } = useSupabaseAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <FullScreenPageLayout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <CircularProgress />
        </Box>
      </FullScreenPageLayout>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);

      const token = await getAccessToken();
      if (!token) {
        throw new Error("Unable to complete admin login. Please try again.");
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Invalid email or password");
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FullScreenPageLayout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          py: 8,
        }}
      >
        <Typography variant="h2" align="center">
          Datt.ai Admin
        </Typography>
        <Typography color="text.secondary" align="center">
          Sign in with your HR or admin account
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        {error ? (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        ) : null}

        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </Button>

        <Typography align="center" variant="body2">
          <Link component={RouterLink} to="/careers">
            Back to Careers
          </Link>
        </Typography>
      </Box>
    </FullScreenPageLayout>
  );
}
