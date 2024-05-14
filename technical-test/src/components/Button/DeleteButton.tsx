import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  onClick?: () => void; // Optional click handler
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={onClick}
      sx={{ mr: 1 }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
