import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore, Inbox } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { Link as RouterLink } from "react-router-dom";

export enum MenuKeys {
  MOVIES = "movies",
}

interface MenuItem {
  icon: JSX.Element;
  text: string;
  link?: string;
  children?: MenuItem[];
}

interface MenuItems {
  [key: string]: MenuItem;
}

const MENU_ITEMS: MenuItems = {
  [MenuKeys.MOVIES]: {
    icon: <Inbox sx={{ color: "#fff" }} />,
    text: "Movies",
    link: "/",
  },
};

interface SidebarProps {
  activeMenu?: MenuKeys;
}

interface OpenState {
  [key: string]: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu }) => {
  const [openState, setOpenState] = useState<OpenState>({});

  const handleClick = (item: string) => {
    setOpenState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  useEffect(() => {
    if (activeMenu) {
      setOpenState((prevState) => ({
        ...prevState,
        [activeMenu]: true,
      }));
    }
  }, [activeMenu]);

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", sm: "block" },
        position: "fixed",
        top: 60,
        left: 0,
        height: "100vh",
        width: 250,
        boxShadow: 3,
        bgcolor: "#ff4c6f",
        zIndex: 1,
        color: "#fff",
      }}
    >
      <List sx={{ marginTop: "30px" }}>
        {Object.entries(MENU_ITEMS).map(
          ([key, { icon, text, link, children }]) => (
            <React.Fragment key={key}>
              <ListItem disablePadding>
                <ListItemButton
                  component={children ? "div" : RouterLink} // Use "div" instead of undefined
                  to={link} // Provide a default path
                  onClick={handleClick ? () => handleClick(key) : undefined} // Ensure onClick is always a function or omitted
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {children &&
                    (openState[key] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {children && (
                <Collapse
                  in={openState[key]}
                  timeout="auto"
                  unmountOnExit
                  sx={{ marginLeft: "10px" }}
                >
                  <List component="div" disablePadding>
                    {children.map((child, index) => (
                      <ListItemButton
                        component={RouterLink}
                        to={child.link || "/default-path"} // Provide a default path as fallback
                        key={index}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          )
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
