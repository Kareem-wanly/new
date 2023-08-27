import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./confirmLocation.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const customFormControlClass = {
  flexFlow: "row",
  display: "flex",
  width: "100%",
};

const OrderDetails = ({
  formData,
  setFormData,
  inputErrors,
  setInputErrors,
  setError,
  type_aqar,
  type_res,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [inputValues, setInputValues] = useState(formData.inputValues || {});

  useEffect(() => {
    if (Object.keys(inputValues).length > 0) {
      return;
    } else {
      if (
        formData.price &&
        formData.space &&
        formData.width &&
        formData.height
      ) {
        setInputValues((prev) => ({
          ...prev,
          price: formData.price,
        }));
        if (formData.space) {
          setInputValues((prev) => ({
            ...prev,
            area: formData.space,
          }));
        }
        if (formData.width) {
          setInputValues((prev) => ({
            ...prev,
            width: formData.width,
          }));
        }
        if (formData.height) {
          setInputValues((prev) => ({
            ...prev,
            height: formData.height,
          }));
        }
      }
    }

    if (formData.type_aqar) {
      setSelectedtype(formData.type_aqar.id);
    }
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      inputValues,
    }));
  }, [inputValues]);

  const [radioSelected, setRadioSelected] = useState(
    formData.radioSelected || ""
  );

  const [showAdditionalBox, setShowAdditionalBox] = useState(
    formData.showAdditionalBox || false
  );

  const [additionalRadioSelected, setAdditionalRadioSelected] = useState(
    formData.additionalRadioSelected || ""
  );
  const [selectedtype, setSelectedtype] = useState(formData.type_aqar_id || "");

  const [selectedRes, setSelectedRes] = useState(formData?.type_res_id || "");

  const handleCityChange = (event) => {
    setSelectedtype(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      type_aqar_id: event.target.value,
    }));
  };
  const handleChangeRes = (event) => {
    setSelectedRes(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      type_res_id: event.target.value,
    }));
  };

  const homedata = [
    {
      title: t("user_dashboard.order_details.label1"),
      subtitle: t("user_dashboard.order_details.hint1"),
      placeholder: t("user_dashboard.order_details.placeholder1"),
      name: "price",
    },
    {
      title: t("user_dashboard.order_details.label2"),
      subtitle: t("user_dashboard.order_details.hint2"),
      placeholder: t("user_dashboard.order_details.placeholder2"),
      name: "area",
    },
    {
      title: t("user_dashboard.order_details.label3"),
      subtitle: t("user_dashboard.order_details.hint3"),
      placeholder: t("user_dashboard.order_details.placeholder3"),
      name: "width",
    },
    {
      title: t("user_dashboard.order_details.label4"),
      subtitle: t("user_dashboard.order_details.hint4"),
      placeholder: t("user_dashboard.order_details.placeholder4"),
      name: "height",
    },
  ];

  useEffect(() => {
    if (formData) {
      setRadioSelected(formData.advertiser_relationship);
      setAdditionalRadioSelected(formData.advertiser_relationship_type);

      if (formData.advertiser_relationship === "option3") {
        setShowAdditionalBox(true);
      } else {
        setShowAdditionalBox(false);
      }
    }
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      advertiser_relationship: radioSelected,
      advertiser_relationship_type: additionalRadioSelected,
    }));
  }, [radioSelected, showAdditionalBox, additionalRadioSelected, setFormData]);

  const formatNumber = (value) => {
    if (!value) return "";

    // Remove thousand separators
    const number = parseFloat(value.replace(/,/g, ""));

    // Check if the parsed value is a valid number
    if (isNaN(number)) return "";

    // Format number with thousand separators
    return number.toLocaleString("en-US");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const formattedValue = formatNumber(value);
    const newInputValues = {
      ...inputValues,
      [name]: formattedValue,
    };
    const allInputsFilled = Object.values(newInputValues).every(
      (val) => val !== ""
    );

    setInputValues(newInputValues);

    if (allInputsFilled) {
      setInputErrors(false);
    } else {
      setInputErrors(true);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      inputValues: newInputValues,
    }));
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setRadioSelected(value);
    if (value === "option3") {
      setShowAdditionalBox(true);
    } else {
      setShowAdditionalBox(false);
      setAdditionalRadioSelected("");
    }
  };
  const handleAdditionalRadioChange = (event) => {
    const { value } = event.target;
    setAdditionalRadioSelected(value);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "600",
            marginBottom: "16px",
            marginTop: "8px",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          {t("user_dashboard.new_order.order_info.main_title")}
        </Typography>
        {homedata.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "12px",
            }}
            key={index}
          >
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <label
                htmlFor={`my-text-field-${index}`}
                style={{ fontWeight: "500", marginBottom: "4px" }}
              >
                {item.title}
              </label>
              <span
                style={{
                  color: "#999",
                  marginRight: "0.5rem",
                  fontSize: "11px",
                }}
              >
                ({item.subtitle}){" "}
              </span>
            </Box>
            <TextField
              type="text"
              size="small"
              name={item.name}
              placeholder={item.placeholder}
              value={inputValues[`${item.name}`] || ""}
              onChange={handleInputChange}
              error={inputErrors[`input-${index}`]}
              helperText={inputErrors[`input-${index}`] ? "قيمة غير صحيحة" : ""}
              sx={{
                borderRadius: "12px",
                textAlign: "right",
                "& input[type=number]": {
                  " WebkitAppearance": "textfield",
                },
              }}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <InputLabel sx={{ color: "black", fontWeight: "500" }}>
          {lang === "ar" ? "سكني أو تجاري" : "Residential or commercial"}
        </InputLabel>
        <Select
          value={
            selectedtype
              ? selectedtype
              : formData.type_aqar
              ? formData.type_aqar.id
              : ""
          }
          onChange={handleCityChange}
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
          {type_aqar?.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {lang === "ar" ? type.ar_name : type.en_name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {formData?.category_aqar?.en_name.includes("sale") ? (
        ""
      ) : (
        <Box>
          <InputLabel sx={{ color: "black", fontWeight: "500" }}>
            {lang === "ar" ? "نوع العقار" : "property type"}
          </InputLabel>
          <Select
            value={
              selectedRes
                ? selectedRes
                : formData.type_res
                ? formData.type_res.id
                : ""
            }
            onChange={handleChangeRes}
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
            {type_res?.map((type) => (
              <MenuItem key={type?.id} value={type?.id}>
                {lang === "ar" ? type?.ar_name : type?.en_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      <Box>
        <Typography sx={{ fontWeight: "500" }}>
          {t("user_dashboard.order_details.title2")}
        </Typography>
        <FormControl
          component="fieldset"
          sx={{
            marginTop: "4px",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            flexFlow: "row",
            ".css-17pr1ty-MuiFormGroup-root": {
              display: "row",
              flexDirection: "row",
              flexFlow: "row",
              width: "100%",
            },
            "&.css-3oog02": customFormControlClass,
            "& .MuiFormGroup-root": {
              width: "100%",
              flexFlow: "row",
            },
          }}
        >
          <RadioGroup
            name={`radio-group`}
            value={radioSelected}
            onChange={handleRadioChange}
            sx={{ display: "flex" }}
          >
            {["option1", "option2", "option3"].map((value, index) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio sx={{ opacity: "0" }} />}
                label={
                  value === "option1"
                    ? t("user_dashboard.order_details.option1")
                    : value === "option2"
                    ? t("user_dashboard.order_details.option2")
                    : t("user_dashboard.order_details.option3")
                }
                sx={{
                  backgroundColor:
                    radioSelected === value ? "var(--green-color)" : "white",
                  color: radioSelected === value ? "white" : "black",
                  border: "1px solid #cdcdcd",
                  // width: "30%",
                  flex: "1",
                  marginX: "0",
                  borderRadius: value === "option3" ? "4px" : "0",
                  padding: "0.3rem",
                  position: "relative",
                  "& .MuiFormControlLabel-label": {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                }}
                name={`custom-radio-${index}`} // Add the index to the name prop
              />
            ))}
          </RadioGroup>
        </FormControl>
        {showAdditionalBox && (
          <Box sx={{ marginTop: "1rem" }}>
            <RadioGroup
              name={`additional-radio`}
              value={additionalRadioSelected}
              onChange={handleAdditionalRadioChange}
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "0.5rem",
                justifyContent: "space-evenly",
              }}
            >
              {[
                {
                  value: "حصري",
                  label: t("user_dashboard.order_details.option3_opt1"),
                },
                {
                  value: "غير حصري",
                  label: t("user_dashboard.order_details.option3_opt2"),
                },
              ].map((option, index) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio sx={{ opacity: "0" }} />}
                  label={option.label}
                  name={`custom-radio-${index}`}
                  sx={{
                    backgroundColor:
                      additionalRadioSelected === option.value
                        ? "var(--green-color)"
                        : "white",
                    color:
                      additionalRadioSelected === option.value
                        ? "white"
                        : "black",
                    border: "1px solid #cdcdcd",
                    borderRadius: "4px",
                    padding: "0.3rem",
                    width: "40%",
                    marginX: "0",
                    position: "relative",
                    "& .MuiFormControlLabel-label": {
                      position: "absolute",
                      width: "100%",
                      textAlign: "center",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </Box>
        )}
      </Box>
    </>
  );
};

export default OrderDetails;
