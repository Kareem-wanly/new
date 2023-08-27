import React, { useState } from "react";
import { Box, Typography, TextField, Button, Tooltip } from "@mui/material";
import styles from "../../addadsolder/confirmLocation.module.css";
import { OrderTitles } from ".";
import { useTranslation } from "react-i18next";

const OrderDescripton = ({ formData, setFormData }) => {
  const [description, setDescription] = useState(formData.description || "");
  const { t } = useTranslation();
  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;
    setDescription(inputValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: inputValue,
    }));
  };

  return (
    <Box>
      <OrderTitles title={t("user_dashboard.property_desc.title")} />
      <Typography
        sx={{
          color: "rgb(118, 118, 118)",
          marginBottom: "8px",
        }}
      >
        {t("user_dashboard.property_desc.hint")}
      </Typography>
      <Typography sx={{ color: "rgb(118, 118, 118)" }}>
        {t("user_dashboard.property_desc.desc")}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            variant="label"
            sx={{
              fontSize: "18px",
              color: "rgb(17, 17, 17)",
              fontWeight: "bold",
            }}
          >
            {t("user_dashboard.property_desc.label")}
          </Typography>
          <Tooltip
            title={
              <div
                style={{
                  border: "1px solid rgb(212,205,299)",
                  borderRadius: "12px",
                  padding: "1rem",

                  backgroundColor: "white",
                  zIndex: "1",
                  fontSize: "1rem",
                  boxShadow: "none",
                  color: "inherit",
                  overflow: "hidden",
                }}
              >
                {/* Content to show when hovering */}
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {t("user_dashboard.property_desc.ex_title")}
                </p>
                <p style={{ color: "rgb(118, 118, 118)" }}>
                  {t("user_dashboard.property_desc.ex_desc")}
                </p>
              </div>
            }
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "transparent",
                  maxWidth: "360px",
                },
              },
            }}
          >
            <Button sx={{ color: "var(--green-color)", fontSize: "17px" }}>
              {t("user_dashboard.property_desc.ex_btn")}
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={7}
        placeholder={t("user_dashboard.property_desc.placeholder")}
        required
        value={description}
        onChange={handleDescriptionChange}
        InputProps={{
          sx: {
            borderRadius: "1rem",
          },
        }}
      />
    </Box>
  );
};

export default OrderDescripton;
