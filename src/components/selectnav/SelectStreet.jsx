import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";
// import { styled } from "@mui/system";

// const StyledBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   position: "relative",
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "transparent",
//   },
// }));

const SelectStreet = ({
  isOpen,
  onClose,
  onStreetSelect,
  selectedStreet,
  streets,
}) => {
  const { data, isLoading, get } = useDataFetcher();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // const streets = [
  //   "حي اول",
  //   "شارع اول",
  //   "شارع ثاني",
  //   "المدينة المنورة",
  //   "جدة",
  //   "رياض",
  //   "أبها",
  // ];
  const [searchTextstreet, setSearchTextstreet] = useState("");

  const handleStreetSelection = (street) => {
    onStreetSelect(street);
    onClose();
  };

  const handleStreetSearchChange = (event) => {
    setSearchTextstreet(event.target.value);
  };

  const filteredStreets = streets?.filter((street) =>
    street.includes(searchTextstreet.trim())
  );

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
      <Box sx={{ display: "flex", position: "relative" }}>
        <SearchIcon
          sx={{
            position: "absolute",
            top: "2rem !important",
            right: "1rem",
            width: "0.8em",
          }}
        />

        <TextField
          value={searchTextstreet}
          onChange={handleStreetSearchChange}
          InputLabelProps={{
            sx: {
              left: "unset",
              right: 0,
              top: 1,
              textAlign: "right",
              paddingRight: "4rem",
              color: (theme) => "rgba(0, 0, 0, 0.54)",
              "&.Mui-focused": {
                color: "var( --green-color)",
                paddingRight: "0rem",
                fontSize: "1rem",
                marginRight: "1rem",
                right: "1rem",
              },
            },
          }}
          InputProps={{
            sx: {
              textAlign: "right",
              paddingX: "1.2rem",
              "&::placeholder": {
                textAlign: "right",
                paddingX: "1rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)",
              },
              "&.Mui-focused.Mui-visited fieldset": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)",
              },
            },
          }}
          label="ابحث عن حي"
          variant="outlined"
          margin="normal"
          fullWidth
        />
      </Box>
      {filteredStreets.length > 0
        ? filteredStreets?.map((street) => (
            <Typography
              key={street}
              sx={{
                position: "relative",
                padding: "15px 28px",
                borderRadius: "25px",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "rgb(243, 244, 251)",
                },
                backgroundColor:
                  selectedStreet === street ? "rgb(243, 244, 251)" : "",
              }}
              onClick={() => handleStreetSelection(street)}
            >
              {street}
              {selectedStreet === street && (
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
          ))
        : ""}
    </Box>
  );
};

export default SelectStreet;
