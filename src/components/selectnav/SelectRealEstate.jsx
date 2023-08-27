import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";

const SelectRealEstate = ({
  isOpen,
  onClose,
  onRealEstateSelect,
  selectedRealEstate,
  realEstates,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // const realEstates = [
  //   "Real Estate 1",
  //   "Real Estate 2",
  //   "Real Estate 3",
  //   "Real Estate 4",
  // ];
  const [selectedOption, setSelectedOption] = useState(selectedRealEstate);

  const handleRealEstateSelection = (realEstate) => {
    // const index = realEstates.findIndex(
    //   (item) => (lang === "ar" ? item.ar_name : item.en_name) === realEstate
    // );
    setSelectedOption(realEstate);
    onRealEstateSelect(realEstate);
    onClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "290px",
        position: "absolute",
        right: "-3rem",
        minHeight: "16px",
        height: "23rem",
        overflowX: "hidden",
        overflowY: "scroll",
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        borderRadius: "32px",
      }}
    >
      {realEstates?.map((realEstate, i) => (
        <Typography
          key={i}
          sx={{
            position: "relative",
            padding: "15px 28px",
            borderRadius: "25px",
            fontSize: "1.2rem",
            "&:hover": {
              backgroundColor: "rgb(243, 244, 251)",
            },
            backgroundColor:
              realEstate?.id === selectedRealEstate?.id
                ? "rgb(243, 244, 251)"
                : "#fff",
          }}
          onClick={() => handleRealEstateSelection(realEstate)}
        >
          {lang === "ar" ? realEstate.ar_name : realEstate.en_name}
          {realEstate?.id === selectedRealEstate?.id && (
            <CheckIcon
              sx={{
                position: "absolute",
                left: lang === "ar" && "20px",
                right: lang === "en" && "20px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var( --green-color)",
              }}
            />
          )}
        </Typography>
      ))}
    </Box>
  );
};

export default SelectRealEstate;
