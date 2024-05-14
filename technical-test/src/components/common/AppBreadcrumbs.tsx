// AppBreadcrumbs.tsx
import React from "react";
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <MuiLink
            key={index}
            component={Link}
            to={item.path || "#"}
            underline="hover"
            color="inherit"
          >
            {item.label}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
