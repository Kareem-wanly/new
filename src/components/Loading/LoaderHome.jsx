import React from "react";
// import { Box } from "@mui/material";
// import { Visa } from "../../assets";
// import { Logo } from "../../assets";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const LoaderHome = () => {
  return (
    // <Box
    //   sx={{
    //     backgroundColor: "white",
    //     position: "absolute",
    //     top: "0",
    //     left: "0",
    //     width: "100%",
    //     height: "100%",
    //     minHeight: "100vh",
    //     zIndex: "1000000000000000000000000",
    //   }}
    // >
    //   <img
    //     src={Logo}
    //     style={{
    //       position: "absolute",
    //       top: "50%",
    //       left: "50%",
    //       transform: "translate(-50% , -50%)",
    //       width: "100px",
    //       height: "100px",
    //     }}
    //     alt="logo"
    //   />
    // </Box>
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "absolute",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: "10000000",
      }}
    >
      <CircularProgress color="success" size="5rem" />
    </Box>
  );
};

export default LoaderHome;
