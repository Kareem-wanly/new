import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Loader = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        position: "absolute",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(150, 150, 150, .3)",
        zIndex: "10000000",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default Loader;
