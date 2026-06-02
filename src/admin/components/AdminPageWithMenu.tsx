import { Box, Toolbar } from "@mui/material";
import { FullScreenPageLayout } from "@src/lib/layouts";
import { Outlet } from "react-router-dom";

import { AdminMenuDrawer } from "./AdminMenuDrawer";

export function AdminPageWithMenu() {
  return (
    <FullScreenPageLayout>
      <AdminMenuDrawer />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          px: { sm: 4, xs: 2 },
          overflow: "auto",
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />
        <Box sx={{ flexGrow: 1, py: { sm: 4, xs: 2 } }}>
          <Outlet />
        </Box>
      </Box>
    </FullScreenPageLayout>
  );
}
