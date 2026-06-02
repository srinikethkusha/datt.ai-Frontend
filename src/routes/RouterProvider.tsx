import { AdminLoginPage } from "@src/admin/pages/AdminLoginPage";
import { AdminRoutes } from "@src/admin/Routes";
import { CareersLayout } from "@src/careers/components/CareersLayout";
import { CareersRoutes } from "@src/careers/Routes";
import { FullScreenPageLayout, NotFoundPage } from "@src/lib/layouts";
import { LoginRoutes } from "@src/login/Routes";
import { type ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";

export function RouterProvider(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/careers" replace />} />

        <Route
          path="/careers/*"
          element={
            <CareersLayout>
              <CareersRoutes />
            </CareersLayout>
          }
        />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route
          path="/login/*"
          element={
            <FullScreenPageLayout>
              <LoginRoutes />
            </FullScreenPageLayout>
          }
        />

        <Route path="/demo/*" element={<PrivateRoutes />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
