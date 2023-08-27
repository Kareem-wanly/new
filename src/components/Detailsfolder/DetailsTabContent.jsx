import React from "react";
import { Box, Typography } from "@mui/material";

const DetailsTabContent = ({ title }) => {
  return (
    <Box sx={{ marginY: "2rem" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginY: "2rem",
          fontSize: { xs: "1.5rem", md: "2.25rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default DetailsTabContent;
