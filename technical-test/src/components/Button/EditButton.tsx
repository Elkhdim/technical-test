import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
  onClick?: () => void; // Optional click handler
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<EditIcon />}
      onClick={onClick}
      sx={{ mr: 1 }}
    >
      Edit
    </Button>
  );
};

export default EditButton;
