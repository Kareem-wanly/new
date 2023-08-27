import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";

const GreenCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    "& .MuiIconButton-label": {
      backgroundColor: "white",
      border: "1px solid gray",
    },
    "& svg": {
      color: "white",
      width: "20px",
      height: "20px",
      backgroundColor: "var(--green-color)",
      border: "1px solid gray",
    },
  },
  "& .MuiIconButton-label": {
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    backgroundColor: "white",
    border: "1px solid gray",
  },
  "& svg": {
    borderRadius: "50%",
    color: "white",
    border: "1px solid gray",
    width: "20px", // Increase the width
    height: "20px", // Increase the height
  },
}));

const CheckBoxHome = ({ setFilterProps, FilterProps }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, get } = useDataFetcher();
  // const [selectedItem, setSelectedItem] = useState(null);

  const [checkboxeshome, setcheckboxeshome] = useState([]);

  useEffect(() => {
    get(`/api/deal/get_categories`);
  }, []);

  useEffect(() => {
    if (data) {
      setcheckboxeshome(data?.categories);
      // setFilterProps((prev) => ({
      //   ...prev,

      //   category_id: data?.categories[0].id,
      // }));
    }
  }, [data]);

  const handleChange = (event, id) => {
    const { name } = event.target;

    // setSelectedItem((prevSelectedItem) =>
    //   prevSelectedItem === name ? null : name
    // );

    setFilterProps((prev) => ({
      ...prev,
      category_id: id,
    }));
  };
  // useEffect(() => {

  // }, [setFilterProps]);

  return (
    <div>
      {checkboxeshome?.map((checkbox) => (
        <FormControlLabel
          key={checkbox?.id}
          control={
            <GreenCheckbox
              checked={FilterProps?.category_id === checkbox?.id}
              onChange={(event) => handleChange(event, checkbox.id)}
              name={checkbox?.en_name}
              icon={<CheckIcon />}
              checkedIcon={<CheckIcon />}
            />
          }
          label={lang === "ar" ? checkbox?.ar_name : checkbox?.en_name}
          sx={{
            width: "130px",
          }}
        />
      ))}
    </div>
  );
};

export default CheckBoxHome;
