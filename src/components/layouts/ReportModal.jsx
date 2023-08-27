import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  styled,
  TextField,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const StyledSelect = styled(Select)((props) => ({
  "& .MuiSvgIcon-root": {
    marginRight: "auto",
    marginLeft: "0",
    left: props.lang === "ar" ? "5px" : "",
  },
}));

const SelectPlaceholder = styled(MenuItem)`
  && {
    color: #999; /* Customize the color here */
  }
`;

const ReportModal = ({ open, onClose, adID }) => {
  // check if there is no token dont shown somthing

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [selectedOption, setSelectedOption] = React.useState("");
  const [report, setReport] = useState("");

  const handleReportChange = (event) => {
    setReport(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormData = async () => {
    const formData = new FormData();
    formData.append("reason", selectedOption);
    formData.append("content", report);

    try {
      const response = await fetch(
        `https://dashboard.aqartik.com/api/ads/report_ads/${adID}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Report submitted successfully!"); // Show success toaster
        onClose(); // Close the modal
      } else {
        toast.error("Failed to submit report. Please try again."); // Show error toaster
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later."); // Show error toaster
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          {t("report.title")}
        </Typography>
        <FormControl sx={{ width: "80%", margin: "auto", display: "block" }}>
          <StyledSelect
            lang={lang}
            sx={{ width: "100%" }}
            value={selectedOption}
            onChange={handleSelectChange}
            displayEmpty
          >
            <SelectPlaceholder value="" disabled>
              {t("report.label")}
            </SelectPlaceholder>
            <MenuItem value={lang === "ar" ? "سعر خطأ" : "incorrect price"}>
              {lang === "ar" ? "سعر خطأ" : "incorrect price"}
            </MenuItem>
            <MenuItem value={lang === "ar" ? "موقع خطأ" : "incorrect location"}>
              {lang === "ar" ? "موقع خطأ" : "incorrect location"}
            </MenuItem>
            <MenuItem
              value={
                lang === "ar"
                  ? " مخالف للشروط الهيئة العامة للعقار"
                  : "Contrary to the conditions of the General Authority of real estate "
              }
            >
              {lang === "ar"
                ? " مخالف للشروط الهيئة العامة للعقار"
                : "Contrary to the conditions of the General Authority of real estate "}
            </MenuItem>
            <MenuItem value={lang === "ar" ? " إعلان قديم" : "old Ads "}>
              {lang === "ar" ? " إعلان قديم" : "old Ads "}
            </MenuItem>
            <MenuItem
              value={lang === "ar" ? "    سبب آخر" : "another reason  "}
            >
              {lang === "ar" ? "    سبب آخر" : "another reason  "}
            </MenuItem>
          </StyledSelect>
          <TextField
            placeholder={t("report.placeholder")}
            multiline
            rows={4}
            value={report}
            onChange={handleReportChange}
            variant="outlined"
            fullWidth
            sx={{ marginY: "1rem" }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              onClick={handleFormData}
              sx={{
                backgroundColor: "var(--green-color)",
                color: "white",
                marginX: "0.5rem",
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              {t("report.btn")}
            </Button>

            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                display: "block",
                marginX: "0.5rem",
                backgroundColor: "white",
                color: "var(--green-color)",
                border: "var(--green-color)",
                "&:hover": {
                  backgroundColor: "white",
                  color: "var(--green-color)",
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              {t("report.bt2")}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ReportModal;
