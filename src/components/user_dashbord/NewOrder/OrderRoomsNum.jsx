import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { OrderTitles } from ".";
import { useTranslation } from "react-i18next";

const OrderRoomsNum = ({
  formData,
  setFormData,
  categoryQuantity,
  setError,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [aqarCategoryQuantity, setAqarCategoryQuantity] = useState(
    formData.aqarCategoryQuantity || []
  );
  useEffect(() => {
    const is = aqarCategoryQuantity.every((item) => item?.quantity == 0);
    if (formData.QuantityRequest && is) {
      setAqarCategoryQuantity(formData.QuantityRequest);
    }
  }, [aqarCategoryQuantity]);

  useEffect(() => {
    if (aqarCategoryQuantity.length === 0) {
      categoryQuantity.map((ele, index) => {
        setAqarCategoryQuantity((prevValues) => {
          const updatedValues = [...prevValues];
          updatedValues[index] = {
            ...updatedValues[index],
            feature_id: ele.quantity_feature.id,
            quantity_name: ele.quantity_feature.en_name,
            quantity: ele.quantity_feature.min,
          };
          return updatedValues;
        });
      });
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      aqarCategoryQuantity,
    }));
  }, [categoryQuantity]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      aqarCategoryQuantity,
    }));
  }, [aqarCategoryQuantity]);

  const handleIncrement = (index, quantity) => {
    if (aqarCategoryQuantity[index]?.quantity < quantity.quantity_feature.max) {
      setAqarCategoryQuantity((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = {
          ...updatedValues[index],
          feature_id: quantity.quantity_feature.id,
          quantity_name: quantity.quantity_feature.en_name,
          quantity:
            updatedValues[index]?.quantity !== undefined
              ? updatedValues[index]?.quantity + 1
              : 1,
        };
        return updatedValues;
      });
    } else if (aqarCategoryQuantity[index]?.quantity === undefined) {
      setAqarCategoryQuantity((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = {
          ...updatedValues[index],
          feature_id: quantity.quantity_feature.id,
          quantity_name: quantity.quantity_feature.en_name,
          quantity: updatedValues[index]?.quantity === undefined && 1,
        };
        return updatedValues;
      });
    }
  };

  const handleDecrement = (index, quantity) => {
    if (aqarCategoryQuantity[index]?.quantity > quantity.quantity_feature.min) {
      setAqarCategoryQuantity((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = {
          ...updatedValues[index],
          feature_id: quantity.quantity_feature.id,
          quantity_name: quantity.quantity_feature.en_name,
          quantity:
            updatedValues[index]?.quantity !== undefined
              ? updatedValues[index]?.quantity - 1
              : 0,
        };
        return updatedValues;
      });
    } else {
      setAqarCategoryQuantity((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = {
          ...updatedValues[index],
          feature_id: quantity.quantity_feature.id,
          quantity_name: quantity.quantity_feature.en_name,
          quantity: updatedValues[index]?.quantity === undefined && 0,
        };
        return updatedValues;
      });
    }
  };

  const handleChange = (event, index) => {
    let value = parseInt(event.target.value);

    if (isNaN(value)) {
      value = 0;
    } else if (value < event.target.min) {
      value = event.target.min;
    } else if (value > event.target.max) {
      value = event.target.max;
    }

    setAqarCategoryQuantity((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        ...updatedValues[index],
        feature_id: event.target.id,
        quantity_name: event.target.name,
        quantity: value,
      };
      return updatedValues;
    });
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "600",
            marginBottom: "12px",
            marginTop: "8px",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          {t("user_dashboard.property_features.title")}
        </Typography>

        <Typography
          sx={{
            color: "rgb(118, 118, 118)",
          }}
        >
          {t("user_dashboard.property_features.title2")}
        </Typography>

        {categoryQuantity?.map((quantity, index) => (
          <Box
            key={quantity.quantity_feature.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography
              variant="label"
              sx={{
                display: "block",
                marginLeft: lang === "ar" ? "auto" : "",
                marginRight: lang === "en" ? "auto" : "",
              }}
            >
              {lang === "ar"
                ? quantity.quantity_feature.ar_name
                : quantity.quantity_feature.en_name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => handleDecrement(index, quantity)}
                sx={{ fontSize: "2rem", color: "var(--green-color)" }}
              >
                -
              </Button>
              <TextField
                type="number"
                value={aqarCategoryQuantity[`${index}`]?.quantity}
                name={quantity.quantity_feature.en_name}
                onChange={(event) => handleChange(event, index)}
                variant="outlined"
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
                  borderRadius: "12px",
                  textAlign: "center",
                  width: "6rem",
                  height: "3.5rem",
                  "& .css-19dwjcc-MuiInputBase-root-MuiOutlinedInput-root": {
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
                    borderRadius: "12px",
                    padding: "8px 0.8rem",
                    width: "100%",
                    height: "100%",
                  },
                  "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                    WebkitAppearance: "textfield",
                    appearance: "textfield",
                    textAlign: "center",
                  },
                  "& input[type=number]::-moz-number-inner-spin-button, & input[type=number]::-moz-number-outer-spin-button":
                    {
                      MozAppearance: "none",
                      margin: 0,
                    },
                }}
                inputProps={{
                  id: `${quantity.quantity_feature.id}`,
                  min: `${quantity.quantity_feature.min}`,
                  max: `${quantity.quantity_feature.max}`,
                }}
              />
              <Button
                onClick={() => handleIncrement(index, quantity)}
                sx={{ fontSize: "2rem", color: "var(--green-color)" }}
              >
                +
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default OrderRoomsNum;
