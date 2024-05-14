// SaveButton.js
import React from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface SaveButtonProps {
  onClick?: () => void;
  label?: string;
}

const SaveButton = ({ onClick, label = "Save" }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<SaveIcon />}
      color="primary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default SaveButton;
