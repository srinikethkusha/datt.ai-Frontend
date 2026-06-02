import { useSupabaseAuthContext } from "@src/auth/useSupabaseAuth";
import { type ReactElement, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminAuthGuardProps {
  children: ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps): ReactElement {
  const { isAuthenticated, loading } = useSupabaseAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
