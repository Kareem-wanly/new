import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";

import styles from "./confirmLocation.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";

const ConfimLocation = ({ formData, setFormData, interfaces, mapData }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [selectedCity, setSelectedCity] = useState(formData.city || null);

  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    formData.neighborhood || null
  );

  const [selectedRoad, setSelectedRoad] = useState(formData.road || null);

  const [selectedInterface, setSelectedInterface] = useState(
    formData.interface_id || null
  );

  useEffect(() => {
    if (
      formData.space &&
      formData.neighborhood &&
      formData.road &&
      formData.interface_aqar
    ) {
      setSelectedCity(formData.space);
      setSelectedNeighborhood(formData.neighborhood);
      setSelectedRoad(formData.road);
      setSelectedInterface(formData.interface_aqar.id);
    }
  }, []);

  useEffect(() => {
    setSelectedCity(mapData.cityName);
    setSelectedNeighborhood(mapData.neighborhoodName);
    setSelectedRoad(mapData.rood);
    setFormData((prevData) => ({
      ...prevData,
      city: mapData.cityName,
      neighborhood: mapData.neighborhoodName,
      road: mapData.rood,
    }));
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      city: event.target.value,
    }));
  };

  const handleNeighborhoodChange = (event) => {
    setSelectedNeighborhood(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      neighborhood: event.target.value,
    }));
  };

  const handleRoadChange = (event) => {
    setSelectedRoad(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      road: event.target.value,
    }));
  };

  const handleInterfaceChange = (event) => {
    setSelectedInterface(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      interface_id: event.target.value,
    }));
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "24px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {t("user_dashboard.property_location.title")}
      </Typography>

      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {t("user_dashboard.property_location.label1")}
      </InputLabel>
      <TextField
        type="text"
        size="small"
        InputProps={{
          readOnly: mapData.cityName ? true : false,
        }}
        value={selectedCity}
        onChange={handleCityChange}
        sx={{
          width: "100%",
          borderRadius: "12px",
          textAlign: lang === "ar" ? "right" : "left",
          "&[readonly]": {
            backgroundColor: "lightgray",
            color: "darkgray",
          },
        }}
      />
      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {t("user_dashboard.property_location.label2")}
      </InputLabel>
      <TextField
        type="text"
        size="small"
        InputProps={{
          readOnly: mapData.neighborhoodName ? true : false,
        }}
        value={selectedNeighborhood}
        onChange={handleNeighborhoodChange}
        sx={{
          width: "100%",
          borderRadius: "12px",
          textAlign: lang === "ar" ? "right" : "left",
        }}
      />
      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {lang === "ar" ? "اسم الشارع" : "road name"}
      </InputLabel>
      <TextField
        type="text"
        size="small"
        value={selectedRoad}
        onChange={handleRoadChange}
        InputProps={{
          readOnly: mapData.rood ? true : false,
        }}
        sx={{
          width: "100%",
          borderRadius: "12px",
          textAlign: lang === "ar" ? "right" : "left",
          "&[readonly]": {
            backgroundColor: "lightgray",
            color: "darkgray",
          },
        }}
      />
      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {t("user_dashboard.property_location.label3")}
      </InputLabel>
      <Typography sx={{ color: "gray", fontSize: "14px" }}>
        {t("user_dashboard.property_location.hint")}
      </Typography>
      <Select
        value={selectedInterface}
        onChange={handleInterfaceChange}
        label=""
        required
        IconComponent={ArrowDropDownIcon}
        className={`${styles.select} select`}
        classes={lang === "ar" && { icon: styles.selectIcon }}
        sx={{
          width: "100%",
          marginTop: ".2rem",
          padding: 0,
          borderRadius: "6px",
          textAlign: lang === "ar" ? "right" : "left",
          "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
            {
              padding: "10px 4px", // Remove padding from the input element
            },
        }}
      >
        {interfaces.map((interface_item) => (
          <MenuItem
            value={interface_item.id}
            className={
              selectedInterface === interface_item.en_name
                ? styles.selectedMenuItem
                : ""
            }
          >
            {lang === "ar" ? interface_item.ar_name : interface_item.en_name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ConfimLocation;
