import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
// import { styled } from "@mui/system";

// const StyledBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   position: "relative",
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "transparent",
//   },
// }));

const HomeType = ({
  isOpen,
  onClose,
  onHomeSelect,
  selectedHome,
  homes,
  setFilterProps,
}) => {
  // const homes = ["استراحة", "عطلة", "فيلا", "مزرعة "];
  const [searchText, setSearchText] = useState("");
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const handleHomeSelection = (home) => {
    onHomeSelect(home);
    onClose(); // Close the SelectCity component when a city is selected
    // console.log("this home" ,home)
  };
  // useEffect(() => {
  //   setFilterProps((prev) => ({
  //     ...prev,
  //     city: selectedHome,
  //   }));
  // }, [selectedHome]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredCities = homes.filter(
    (home) =>
      home.ar_name.includes(searchText.trim()) ||
      home.en_name.includes(searchText.trim())
  );

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "290px",
        position: "absolute",
        top: "11rem",
        right: { xs: "auto", md: "-3rem" },
        minHeight: "16px",
        height: "23rem",
        overflowX: "hidden",
        overflowY: "auto",
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
          value={searchText}
          onChange={handleSearchChange}
          // sx={{ marginTop: "-2px" }}
          InputLabelProps={{
            sx: {
              left: "unset",
              right: 0,
              top: 1,
              textAlign: "right",
              paddingRight: "4rem",
              color: (theme) => "rgba(0, 0, 0, 0.54)", // Set the default label color
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
                borderBottomColor: "rgba(0, 0, 0, 0.54)", // Set the desired bottom border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)", // Set the desired bottom border color when focused
              },
              "&.Mui-focused.Mui-visited fieldset": {
                borderColor: "transparent",
                borderBottomColor: "rgba(0, 0, 0, 0.54)", // Set the desired bottom border color when focused and visited
              },
            },
          }}
          label="ابحث عن عقار"
          variant="outlined"
          margin="normal"
          fullWidth
        />
      </Box>
      {homes.map((home) => (
        <Typography
          key={home.id}
          sx={{
            position: "relative",
            padding: "15px 28px",
            borderRadius: "25px",
            fontSize: "1.2rem",
            "&:hover": {
              backgroundColor: "rgb(243, 244, 251)",
            },
            backgroundColor:
              selectedHome === home.id ? "rgb(243, 244, 251)" : "",
          }}
          onClick={() => handleHomeSelection(home.id)}
        >
          {lang === "ar" ? home.ar_name : home.en_name}
          {selectedHome === home.id && (
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

export default HomeType;
