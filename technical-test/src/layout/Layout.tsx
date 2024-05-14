import Navbar from "../components/common/Navbar/Navbar";
import Sidebar, { MenuKeys } from "../components/common/Sidebar/Sidebar";

import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeMenu?: MenuKeys;
}

const Layout = ({ children, activeMenu }: AdminLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerWidth = isMobile ? 0 : 240;

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <Sidebar activeMenu={activeMenu} />
          </Box>
        </Drawer>
      )}
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Toolbar />
        <Box
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
