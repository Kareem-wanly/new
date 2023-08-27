import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../../api/useDataFetcher ";

const EditInformation = ({
  type,
  ad,
  onCancel,
  setStateLoading,
  setGetDataState,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [title, setTitle] = useState(ad.title);
  const [updatedValues, setUpdatedValues] = useState();
  const { data, isLoading, post } = useDataFetcher();

  useEffect(() => {
    setUpdatedValues(ad);
  }, [ad]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setUpdatedValues((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStateLoading(true);

    const formDataSend = new FormData();
    // Verify that updatedValues is populated
    formDataSend.append("title", title);
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
            body: JSON.stringify({ title }),
          }
        );
        if (res) {
          setStateLoading(false);
          setGetDataState((prev) => !prev);
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
            body: JSON.stringify({ title }),
          }
        );
        if (res) {
          setStateLoading(false);
          setGetDataState((prev) => !prev);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box>
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>
            {t("user_dashboard.incoming_orders.card1.label1")}
          </Typography>
          <TextField
            type="text"
            name="title"
            value={updatedValues?.title}
            onChange={handleTitleChange}
            sx={{
              maxWidth: "340px",
              width: { xs: "80%", md: "90%" },
              marginInline: "1rem auto",

              borderRadius: "12px !important",
              boxShadow: "1",
              "& .css-1iy5sao-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            InputProps={{
              sx: {
                "& input": {
                  borderRadius: "12px !important",
                  padding: "13px 0.8rem",
                },
              },
            }}
          ></TextField>
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

export default EditInformation;
