import React from "react";
import Titles from "./Titles";
import { Container } from "@mui/material";
import CarsouelCity from "./CarsouelCity";
import { useTranslation } from "react-i18next";
// import styles from "../../styles/CarsouelCity.module.css"

const ImportantCities = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Titles title={t("homepage.titles.title1")} />
      <CarsouelCity></CarsouelCity>
    </Container>
  );
};

export default ImportantCities;
