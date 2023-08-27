import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import styles from "../../../components/addadsolder/confirmLocation.module.css";
import ClearIcon from "@mui/icons-material/Clear";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";

const EditLocation = ({
  type,
  ad,
  onCancel,
  interfaces,
  setStateLoading,
  setGetDataState,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [selectedInterface, setSelectedInterface] = useState(
    ad.interface_aqar.id || null
  );

  const handleInterfaceChange = (event) => {
    setSelectedInterface(event.target.value);
  };
  const handleSubmit = async (e) => {
    setStateLoading(true);
    e.preventDefault();
    const formDataSend = new FormData();
    // Verify that updatedValues is populated
    formDataSend.append("interface_id", selectedInterface);
    if (type === 0) {
      try {
        const res = await fetch(
          `https://www.dashboard.aqartik.com/api/deal/update/${ad.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
            body: JSON.stringify({ interface_id: selectedInterface }),
          }
        );
        if (res) {
          setGetDataState((prev) => !prev);
          setStateLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (type === 1) {
      try {
        const res = await fetch(
          `https://www.dashboard.aqartik.com/api/real-estate-request/update/${ad.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
            body: JSON.stringify({ interface_id: selectedInterface }),
          }
        );
        if (res) {
          setGetDataState((prev) => !prev);
          setStateLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box>
      <form>
        <Box sx={{ marginY: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              position: "relative",
            }}
          >
            <InputLabel
              sx={{
                color: "black",
                minWidth: { xs: "3rem", sm: "6rem" },
              }}
            >
              {lang === "ar" ? "الاتجاه" : "interface"}
            </InputLabel>
            <Select
              value={selectedInterface}
              onChange={handleInterfaceChange}
              label=""
              required
              IconComponent={ArrowDropDownIcon}
              className={`${styles.select} select`}
              classes={lang === "ar" && { icon: styles.selectIcon }}
              sx={{
                borderRadius: "12px !important",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
                border: "1px solid rgba(0, 0, 0, 0.06) !important",
                paddingBlock: "5px",
                height: "48px",
                width: "100%",
                marginBlock: "4px 12px",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    borderRadius: "1rem",
                  },
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
                  {lang === "ar"
                    ? interface_item.ar_name
                    : interface_item.en_name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Box>
        <Box
          sx={{
            borderWidth: "0px 0px thin",
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.12)",
            margin: "2rem 4rem",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "1rem ",
            marginInline: "auto",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{
              fontWeight: "600",
              borderRadius: "8px",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "var(--green-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "#0b7b5a",
                color: "white",
              },
            }}
          >
            {t("user_dashboard.outgoing_requests.submit_btn")}
          </Button>
          <Button
            sx={{
              fontWeight: "600",
              borderRadius: "8px",
              border: "1px solid var(--green-color)",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "white",
              color: "var(--green-color)",
              "&:hover": {
                backgroundColor: "#e5f9f4",
              },
            }}
            onClick={onCancel}
          >
            {t("user_dashboard.outgoing_requests.cancel_btn")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditLocation;
