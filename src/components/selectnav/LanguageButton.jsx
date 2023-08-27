import React from "react";

import { Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageButton = ({ isMenuButton }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const arButtonView = i18n.language === "en" ? true : false;

  return (
    <>
      {arButtonView ? (
        <Button
          onClick={() => handleLanguageChange("ar")}
          sx={{
            backgroundColor: "transparent",
            display: {
              xs: isMenuButton ? "inline-flex" : "none",
              md: "inline-flex",
            },
          }}
        >
          <Typography
            variant="label"
            sx={{
              display: "grid",
              color: "rgb(120, 120, 131)",
              fontSize: "11px",
            }}
          >
            Browse In
            <Typography
              variant="span"
              sx={{
                color: "black",
                textDecoration: "underline",
                fontWeight: "bold",
                fonstSize: "14px",
              }}
            >
              arabic
            </Typography>
          </Typography>
        </Button>
      ) : (
        <Button
          onClick={() => handleLanguageChange("en")}
          sx={{
            backgroundColor: "transparent",
            display: {
              xs: isMenuButton ? "inline-flex" : "none",
              md: "inline-flex",
            },
          }}
        >
          <Typography
            variant="label"
            sx={{
              display: "grid",
              color: "rgb(120, 120, 131)",
              fontSize: "11px",
            }}
          >
            التصفح في
            <Typography
              variant="span"
              sx={{
                color: "black",
                textDecoration: "underline",
                fontWeight: "bold",
                fonstSize: "14px",
              }}
            >
              الانكليزية
            </Typography>
          </Typography>
        </Button>
      )}
    </>
  );
};

export default LanguageButton;
