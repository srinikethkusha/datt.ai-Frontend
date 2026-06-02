import { NotFoundPage } from "@src/lib/layouts";
import { type ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { ApplyPage } from "./pages/ApplyPage";
import { ApplySuccessPage } from "./pages/ApplySuccessPage";
import { CareersPage } from "./pages/CareersPage";
import { JobDetailsPage } from "./pages/JobDetailsPage";

export function CareersRoutes(): ReactElement {
  return (
    <Routes>
      <Route index element={<CareersPage />} />
      <Route path=":jobId/apply/success" element={<ApplySuccessPage />} />
      <Route path=":jobId/apply" element={<ApplyPage />} />
      <Route path=":jobId" element={<JobDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
