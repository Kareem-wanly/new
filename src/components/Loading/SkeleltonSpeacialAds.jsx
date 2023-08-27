import React from "react";
import { Skeleton, Box } from "@mui/material";

const SkeleltonSpeacialAds = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "-1.5rem",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Skeleton
          sx={{
            width: { xs: "100%", md: "450px" },
            height: { xs: "350px", md: "350px" },
            borderRadius: "16px",
            margin: "auto",
            marginLeft: "10px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            height: "200px",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <Skeleton
                  animation="wave"
                  sx={{ width: { xs: "10rem", md: "15rem" } }}
                />
                <Skeleton
                  animation={false}
                  sx={{ width: { xs: "7rem", md: "10rem" } }}
                />
              </Box>
              <Box>
                <Skeleton
                  animation={false}
                  sx={{ width: { xs: "7rem", md: "10rem" } }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "7rem", md: "10rem" },
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Skeleton animation="wave" />
              <Skeleton
                animation={false}
                sx={{ width: "5rem", marginRight: "auto", height: "2rem" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SkeleltonSpeacialAds;
