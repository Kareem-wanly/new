import React from "react";
import { Box, Typography } from "@mui/material";

const HomeRooms = ({ iconRoom, numRoom, titleRoom, checkIcon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: { xs: "47%", sm: "50%" },
        borderBottom: { md: "1px solid #eee" },
        borderLeft: { md: "1px solid #eee" },
        padding: "5px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginX: "0.5rem",
          alignItems: "center",
          display: "flex",
          width: "1.5rem",
          height: "2rem",
          color: "gray",
        }}
      >
        {iconRoom}
      </Box>
      <Typography
        sx={{
          minWidth: { xs: "0", md: "6rem" },
          fontSize: "15px",
          minWidth: { xs: "50%", md: "70%" },
        }}
      >
        {titleRoom}
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          color: "#373636",
          marginRight: "1rem",
          color: "var(--green-color)",
        }}
      >
        {numRoom}
      </Typography>
      <Box>{checkIcon}</Box>
    </Box>
  );
};

export default HomeRooms;
