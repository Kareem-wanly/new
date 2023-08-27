import React from "react";
import { Typography } from "@mui/material";

const OrderTitles = ({ title }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: "600",
        marginBottom: "24px",
        marginTop: "8px",
        fontSize: { xs: "1.2rem", md: "1.5rem" },
      }}
    >
      {title}
    </Typography>
  );
};

export default OrderTitles;
