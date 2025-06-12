import React from "react";
import { Box } from "@mui/material";

interface DropIndicatorProps {
  beforeId: string | null;
  status: string;
}

const DropIndicator: React.FC<DropIndicatorProps>  = ({ beforeId, status }) => {
  return (
    <Box
      data-before={beforeId || "-1"}
      data-status={status}
      sx={{
        my: 0.5,
        height: '2px',
        width: '100%',
        backgroundColor: '#a78bfa',
        opacity: 0,
      }}
    />
  );
};

export default DropIndicator;
