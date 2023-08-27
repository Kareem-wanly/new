import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import GeneralContext from "../context/generalContext";

const About = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { generalData } = useContext(GeneralContext);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "100%",
          maxHeight: "100vh",
          marginTop: "8rem",
          marginBottom: "13rem",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              color: "var(--green-color)",
              marginBottom: "2rem",
              fontWeight: "500",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {lang === "ar"
              ? "نبذة مختصرة عن منصة عقارتك"
              : "A brief overview of your real estate platform"}
          </Typography>
          <FontAwesomeIcon
            icon={faQuoteLeft}
            style={{ color: "#fdc57b", fontSize: "25px", marginRight: "1rem" }}
          />
        </Box>
        <Typography sx={{ color: "gray" }}>
          {lang === "ar"
            ? generalData.ar_about_us_text
            : generalData.en_about_us_text}
        </Typography>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          style={{
            color: "#fdc57b",
            fontSize: "25px",
            marginRight: "1rem",
            marginTop: "2rem",
          }}
        />
      </Box>
    </Container>
  );
};

export default About;
