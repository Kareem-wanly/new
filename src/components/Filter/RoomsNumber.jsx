import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const RoomsNumber = () => {
  const { t, i18n } = useTranslation();

  return (
    <Box
      sx={{
        "& .custom-textfield": {
          marginTop: "1rem",
          width: "100%",
        },
      }}
    >
      <TextField
        placeholder={t("advertisements_page.filter_sec.rooms_filter.label1")}
        variant="outlined"
        type="number"
        className="custom-textfield"
      />
      <TextField
        placeholder={t("advertisements_page.filter_sec.rooms_filter.label2")}
        variant="outlined"
        type="number"
        className="custom-textfield"
      />
      <TextField
        placeholder={t("advertisements_page.filter_sec.rooms_filter.label3")}
        variant="outlined"
        type="number"
        className="custom-textfield"
      />
      <TextField
        placeholder={t("advertisements_page.filter_sec.rooms_filter.label4")}
        variant="outlined"
        type="number"
        className="custom-textfield"
      />
    </Box>
  );
};

export default RoomsNumber;
