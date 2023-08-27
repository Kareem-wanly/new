import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Container, Button } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckIcon from "@mui/icons-material/Check";
import useDataFetcher from "../api/useDataFetcher ";

const Cards = () => {
  const { data, isLoading, get } = useDataFetcher();
  useEffect(() => {
    get("/api/memberships/all");
  }, []);

  return (
    <Container sx={{ marginTop: "17rem" }}>
      <Typography
        sx={{
          color: "var(--green-color)",
          fontSize: "25px",
          fontWeight: "700",
          marginBottom: "2rem",
        }}
      >
        العضويات
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "right" },
        }}
      >
        {isLoading ? (
          <Typography>Loading cards...</Typography>
        ) : (
          data?.memberships.map((membership) => (
            <Box
              key={membership.id}
              sx={{
                width: "300px",
                minHeight: "300px",
                marginX: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Paper
                sx={{ padding: "1rem", height: "100%", position: "relative" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <AccountBalanceIcon sx={{ color: "var(--green-color)" }} />
                  <Typography
                    sx={{
                      marginRight: "10px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {membership.ar_name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "25px",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      color: "orange",
                      marginLeft: "10px",
                      fontSize: "25px",
                    }}
                  >
                    {membership.price}
                  </Typography>
                  <Typography sx={{ color: "gray", fontSize: "18px" }}>
                    ريال / سنة
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    marginBottom: "1rem",
                  }}
                >
                  <CheckIcon
                    sx={{ color: "var(--green-color)", marginLeft: "5px" }}
                  />
                  <Typography sx={{ marginLeft: "10px" }}>
                    عدد الإعلانات:
                  </Typography>
                  <Typography>{membership.count_ads} </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    marginBottom: "1rem",
                  }}
                >
                  <CheckIcon
                    sx={{ color: "var(--green-color)", marginLeft: "5px" }}
                  />
                  <Typography sx={{ marginLeft: "10px" }}>
                    عدد المشتركين:
                  </Typography>
                  <Typography> {membership.count_members}</Typography>
                </Box>

                <Button
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    backgroundColor: "var(--green-color)",
                    color: "white",
                    borderRadius: "20px",
                    display: "block",
                    marginRight: "auto",
                    minWidth: "7rem",
                    "&:hover": {
                      backgroundColor: "var(--green-color)",
                      color: "white",
                    },
                  }}
                >
                  اشترك الأن
                </Button>
              </Paper>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default Cards;
