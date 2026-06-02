import { AdminAuthGuard } from "@src/auth/AdminAuthGuard";
import { NotFoundPage } from "@src/lib/layouts";
import { type ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AdminPageWithMenu } from "./components/AdminPageWithMenu";
import { ApplicationDetailPage } from "./pages/ApplicationDetailPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { JobFormPage } from "./pages/JobFormPage";
import { JobsPage } from "./pages/JobsPage";

export function AdminRoutes(): ReactElement {
  return (
    <AdminAuthGuard>
      <Routes>
        <Route element={<AdminPageWithMenu />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/new" element={<JobFormPage />} />
          <Route path="jobs/:jobId/edit" element={<JobFormPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="applications/:id" element={<ApplicationDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AdminAuthGuard>
  );
}
