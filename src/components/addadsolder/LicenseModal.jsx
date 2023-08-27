import React, { useState } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  Link,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const LicenseModal = ({ isOpen, onClose }) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("رقم الهوية");
  const [initialSelectedOption, setInitialSelectedOption] =
    useState("رقم الهوية");
  const [idValue, setIdValue] = useState("");
  const [licenseValue, setLicenseValue] = useState("");
  const [establishmentValue, setEstablishmentValue] = useState("");
  const [canCloseModal, setCanCloseModal] = useState(false);
  const [idError, setIdError] = useState(false);
  const [establishmentError, setEstablishmentError] = useState(false);
  const [licenseError, setLicenseError] = useState(false);

  const handleOpenSection = () => {
    setIsSectionVisible(true);
  };

  const handleCloseSection = () => {
    setIsSectionVisible(false);
    setCanCloseModal(!idValue && !licenseValue && !establishmentValue);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleIdChange = (event) => {
    const newValue = event.target.value;
    const integerRegex = /^\d*$/; // Regular expression for integer numbers
    if (integerRegex.test(newValue)) {
      setIdValue(newValue);
      setIdError(false);
    } else {
      setIdError(true);
    }
  };

  const handleLicenseChange = (event) => {
    const newValue = event.target.value;
    const integerRegex = /^\d*$/; // Regular expression for integer numbers
    if (integerRegex.test(newValue)) {
      setLicenseValue(newValue);
      setLicenseError(false);
    } else {
      setLicenseError(true);
    }
  };

  const handleEstablishmentChange = (event) => {
    const newValue = event.target.value;
    const integerRegex = /^\d*$/; // Regular expression for integer numbers
    if (integerRegex.test(newValue)) {
      setEstablishmentValue(newValue);
      setEstablishmentError(false);
    } else {
      setEstablishmentError(true);
    }
  };

  const handleSubmit = () => {
    if (
      (selectedOption === "رقم الهوية" &&
        (idValue === "" || licenseValue === "")) ||
      (selectedOption === "منشأة" &&
        (establishmentValue === "" || licenseValue === ""))
    ) {
      // Required fields are empty, do not submit or close the modal
      return;
    }

    // Perform any necessary actions with the input values
    // console.log("ID:", idValue);
    // console.log("License:", licenseValue);
    // console.log("Establishment:", establishmentValue);
    onClose();
  };

  const handleGoBack = () => {
    setSelectedOption(initialSelectedOption);
    setIdValue("");
    setLicenseValue("");
    setEstablishmentValue("");
    setIsSectionVisible(false);
    setCanCloseModal(true);
  };

  return (
    <Modal
      open={isOpen}
      onClose={canCloseModal ? onClose : undefined}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem 1rem",
          borderRadius: "16px",
          width: 500,
          maxWidth: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontWeight: "700", marginBottom: "1rem" }}>
          بناء على نظام الوساطة العقارية لا يمكن الاعلان في المنصات العقارية الا
          بوجود رخصة اعلان.
        </Typography>
        <Link
          href="/"
          sx={{ textDecoration: "none", color: "var(--green-color)" }}
        >
          ماهي رخصةالاعلان وكيفية الحصول عليها؟
        </Link>
        {!isSectionVisible && (
          <>
            <Typography sx={{ marginY: "1rem" }}>
              هل لديك رخصة إعلان؟
            </Typography>
            <Box>
              <Button
                onClick={handleOpenSection}
                sx={{
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  paddingX: "2rem",
                  marginX: "0.5rem",
                  "&:hover": {
                    backgroundColor: "var(--green-color)",
                    color: "white",
                    transform: "scale(1.05)",
                    transition: "ease-in .1s",
                  },
                }}
              >
                نعم
              </Button>
              <Button
                // onClick={onClose}
                sx={{
                  backgroundColor: "white",
                  color: "var(--green-color)",
                  border: "1px solid var(--green-color)",
                  paddingX: "2rem",
                  marginX: "0.5rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "var(--green-color)",
                    border: "1px solid var(--green-color)",
                    transform: "scale(1.05)",
                    transition: "ease-in .1s",
                  },
                }}
              >
                لا
              </Button>
            </Box>
          </>
        )}
        {isSectionVisible && (
          <>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedOption}
                onChange={handleOptionChange}
                row
                sx={{
                  "& .MuiRadio-root": {
                    color: "var(--green-color)", // Set the color for unchecked radio inputs
                  },
                  "& .Mui-checked": {
                    color: "var(--green-color) !important", // Set the color for checked radio inputs
                  },
                }}
              >
                <FormControlLabel
                  value="رقم الهوية"
                  control={<Radio />}
                  label="رقم الهوية"
                />
                <FormControlLabel
                  value="منشأة"
                  control={<Radio />}
                  label="منشأة"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ width: "80%", margin: "auto", textAlign: "right" }}>
              {selectedOption === "رقم الهوية" && (
                <>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <Typography>رقم هوية المعلن</Typography>
                    <TextField
                      placeholder="ادخل رقم هوية المعلن"
                      value={idValue}
                      onChange={handleIdChange}
                      margin="normal"
                      sx={{ width: "100%" }}
                      error={idError}
                      helperText={idError ? "يرجى إدخال قيمة رقمية صحيحة" : ""}
                    />
                  </Box>
                </>
              )}

              {selectedOption === "منشأة" && (
                <>
                  <Box sx={{ marginBottom: "1rem", textAlign: "right" }}>
                    <Typography>رقم المنشاة</Typography>
                    <TextField
                      placeholder="ادخل رقم المنشاة"
                      value={establishmentValue}
                      onChange={handleEstablishmentChange}
                      margin="normal"
                      sx={{ width: "100%" }}
                      error={establishmentError}
                      helperText={
                        establishmentError ? "يرجى إدخال قيمة رقمية صحيحة" : ""
                      }
                    />
                  </Box>
                </>
              )}
              <Box sx={{ marginBottom: "1rem", textAlign: "right" }}>
                <Typography>رقم الترخيص</Typography>
                <TextField
                  placeholder="ادخل رقم الترخيص"
                  value={licenseValue}
                  onChange={handleLicenseChange}
                  margin="normal"
                  sx={{ width: "100%" }}
                  error={licenseError}
                  helperText={licenseError ? "يرجى إدخال قيمة رقمية صحيحة" : ""}
                />
              </Box>
            </Box>
            <Button
              onClick={handleSubmit}
              sx={{
                backgroundColor: "var(--green-color)",
                color: "white",
                marginX: "0.5rem",
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  transform: "scale(1.05)",
                  transition: "ease-in 0.1s",
                },
              }}
            >
              متابعة
            </Button>
            <Button
              onClick={handleGoBack}
              sx={{
                color: "var(--green-color)",
                backgroundColor: "white",
                border: "1px solid var(--green-color)",
                marginX: "0.5rem",
                "&:hover": {
                  color: "var(--green-color)",
                  backgroundColor: "white",
                  border: "1px solid var(--green-color)",
                  transform: "scale(1.05)",
                  transition: "ease-in 0.1s",
                },
              }}
            >
              العودة
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default LicenseModal;
