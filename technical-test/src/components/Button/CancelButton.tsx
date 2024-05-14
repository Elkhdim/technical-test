import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface CancelButtonProps {
  to: string;
  label?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  to,
  label = "Cancel",
}) => {
  return (
    <Button
      variant="outlined"
      component={Link}
      to={to}
      color="secondary"
      sx={{ mr: 2 }}
    >
      {label}
    </Button>
  );
};

export default CancelButton;
