import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useSupabaseAuthContext } from "@src/auth/useSupabaseAuth";
import { useBreakpoint } from "@src/lib/mui/useBreakpoint";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { label: "Jobs", path: "/admin/jobs", icon: <WorkIcon /> },
  { label: "Applications", path: "/admin/applications", icon: <PeopleIcon /> },
];

export function AdminMenuDrawer() {
  const isSmallScreen = useBreakpoint();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useSupabaseAuthContext();

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", py: 1 }}>
      <Typography variant="h4" sx={{ px: 2, py: 2 }}>
        Datt.ai Admin
      </Typography>
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname.startsWith(item.path)}
              onClick={() => setDrawerIsOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            void signOut();
            navigate("/admin/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setDrawerIsOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Datt.ai Admin</Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={!isSmallScreen || drawerIsOpen}
          onClose={() => setDrawerIsOpen(false)}
          sx={{
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
