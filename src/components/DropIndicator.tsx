import React from "react";
import { Box } from "@mui/material";

interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

const DropIndicator = ({ beforeId, column }: DropIndicatorProps): JSX.Element => {
  return (
    <Box
      data-before={beforeId || "-1"}
      data-column={column}
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
