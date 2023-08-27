import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import _debounce from "lodash/debounce";

// Custom styles for the range slider
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#3f51b5", // Change the color of the track
  height: 8, // Adjust the height of the track
  "& .MuiSlider-thumb": {
    height: "26px",
    width: "26px",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 9px 46px",
    marginTop: "0px",
    marginRight: "-15px",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "none", // Add a hover effect to the thumb
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      right: "50%",
      transform: "translateX(50%)",
      height: "8px",
      width: "8px",
      backgroundColor: "rgb(233, 236, 241)",
      borderRadius: "10px",
    },
    "&::after": {
      top: "-15px",
      right: "-15px",
      left: "-15px",
      bottom: "-15px",
      content: '""',
      position: "absolute",
      borderRadius: "50%",
      borderColor: "black",
    },
  },
  "& .MuiSlider-valueLabel": {
    left: "calc(-50% + 8px)", // Adjust the position of the value label
    backgroundColor: "#fff",
    color: "black",
    border: "1px solid gray",
    borderRadius: "1rem",
    fontWeight: "bold",

    "&::before": {
      borderBottom: "1px solid gray",
      borderRight: "1px solid gray",
    },
  },
  "& .MuiSlider-track": {
    display: "block",
    position: "absolute",
    borderRadius: "1px",
    backgroundColor: "var(--green-color)",
    borderColor: "var(--green-color)",
    height: "26px",
  },
  "& .MuiSlider-rail": {
    height: "26px",
    backgroundColor: "rgb(234, 237, 242)",
    borderRadius: "16px",
  },
}));

function PriceSlider({ setFilterProps, FilterProps, prices }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [range, setRange] = useState([]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };
  useEffect(() => {
    const debounceHandler = _debounce(() => {
      setFilterProps((prev) => ({
        ...prev,
        min_price: range[0],
        max_price: range[1],
      }));
    }, 2000);

    debounceHandler();

    return () => {
      debounceHandler.cancel();
    };
  }, [range, 2000]);

  useEffect(() => {
    setRange([FilterProps?.min_price, FilterProps?.max_price]);
  }, [FilterProps?.min_price, FilterProps?.max_price]);
  const formatLabel = (value) => {
    return lang === "ar" ? `${value} ر.س` : ` ${value} SAR`;
  };
  const valueLabelFormat = (value) => {
    return lang === "ar" ? `${value} ر.س` : ` ${value} SAR`;
  };

  return (
    <div>
      <CustomSlider
        $currency={lang}
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        min={prices ? prices[0] : 0}
        max={prices ? prices[1] : 0}
        marks={[
          { value: range[0], label: `${formatLabel(range[0])}` },
          { value: range[1], label: `${formatLabel(range[1])}` },
        ]}
        aria-labelledby="range-slider"
      />
    </div>
  );
}

export default PriceSlider;
