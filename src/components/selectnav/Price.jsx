import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

const Price = ({
  isOpen,
  onClose,
  onPriceSelect,
  handlePriceSelection,
  selectedPrice,
}) => {
  const prices = [
    [null, null],
    [100, 1000],
    [10000, 50000],
    [50000, 1000000],
  ];

  // const [selectedOptionPrice, setSelectedOptionPrice] = useState(selectedPrice);

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // const handlePriceSelection = ([min, max]) => {
  //   setSelectedOptionPrice([min, max]);
  //   onPriceSelect([min, max]);
  //   onClose(); // Close the Price component when a price is selected
  // };

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
      {prices.map(([min, max]) => (
        <Typography
          key={`${min}-${max}`}
          sx={{
            position: "relative",
            padding: "15px 28px",
            borderRadius: "25px",
            fontSize: "1.2rem",
            "&:hover": {
              backgroundColor: "rgb(243, 244, 251)",
            },
            backgroundColor:
              selectedPrice &&
              selectedPrice[0] === min &&
              selectedPrice[1] === max
                ? "rgb(243, 244, 251)"
                : "",
          }}
          onClick={() => handlePriceSelection([min, max])}
        >
          {min === null && max === null
            ? t("subnav.price_choose_option") // Display "اختر" or "Choose" for this option
            : `From ${min} to ${max}`}
          {selectedPrice &&
            selectedPrice[0] === min &&
            selectedPrice[1] === max && (
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

export default Price;
