import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

import { KSA } from "../../assets";
import { useTranslation } from "react-i18next";
import { myAxios } from "../../api/myAxios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const LogInModal = ({ open, onClose }) => {
  const nav = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Phone number input, Step 2: OTP verification
  const [otp, setOTP] = useState("");
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [codeReceived, setCodeReceived] = useState(false);

  const [timer, setTimer] = useState(180);
  const [isCounterActive, setIsCounterActive] = useState(true);

  useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  const validatePhoneNumber = () => {
    const saudiNumberRegex = /^(05[0-9]{8}|5[0-9]{8})$/;
    const isValid = saudiNumberRegex.test(phoneNumber);
    setIsValidPhoneNumber(isValid);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    //  setTimeout(validatePhoneNumber, 300); // Call the debounceValidation after a delay when adding characters
  };

  const verifyOTP = async (e) => {
    // e.target.disabled = true;
    try {
      const res = await myAxios.post("/api/CheckCode", {
        phone: phoneNumber,
        code: otp,
      });
      if (res.data.status === 0) {
        toast.error(res.data.message);
        // navigate("/userDashbored");
      } else {
        toast.success(res?.data?.message);
        localStorage.setItem("user_token", res?.data?.access_token);
        setTimeout(() => {
          nav("/userdashbored");
        }, 1500);
        // localStorage.setItem("user_token", res.data.access_token);
        // nav("/userDashbored");
        // toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // Handle logic for step 1 (phone number input)
      setStep(2); // Move to step 2 (OTP verification)
      setOTP(["", "", "", ""]); // Reset OTP input
      setIsValidOTP(false); // Reset OTP validation
      setResendDisabled(true); // Disable "Resend" button
      setResendCountdown(5); // Start the countdown
      setCodeReceived(false); // Reset the code received state
      try {
        const res = await myAxios.post("/api/login", {
          phone: phoneNumber,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else if (step === 2) {
      // Handle logic for step 2 (OTP verification)
      verifyOTP();
    }
  };

  const handleBack = () => {
    setStep(1);
    setOTP("");
  };

  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          //console.log("finished");
          // try {
          //   const res = myAxios.post("/api/changeCode", {
          //     phone: phoneNumber,
          //   });
          //   console.log(res);
          // } catch (err) {
          //   console.log(err);
          // }
          setIsCounterActive(false);
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
      setTimer(180);
    };
  }, [step, isCounterActive]);

  const handleResend = async () => {
    setIsCounterActive(true);
    //console.log(resend a gain)
    try {
      const res = await myAxios.post("/api/login", {
        phone: phoneNumber,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxWidth: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "16px",
          p: 4,
        }}
      >
        {step === 2 && (
          <Button
            onClick={handleBack}
            sx={{
              color: "black",
              display: "block",
              padding: "8px 0",
              textAlign: lang === "ar" ? "right" : "left",
            }}
          >
            {t("loginmodal.back_btn")}
          </Button>
        )}
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {step === 1 ? t("loginmodal.title") : t("loginmodal.title_two")}
        </Typography>
        <Typography sx={{ marginY: "1rem" }}>
          {step === 1 ? t("loginmodal.desc") : ""}
        </Typography>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          {step === 1 && (
            <Box
              sx={{
                height: "96px",
                width: "100%",
                borderRadius: "20px",
                border: "1px solid rgb(186, 189, 210)",
                position: "relative",
                "&:before": {
                  content: "''",
                  position: "absolute",
                  left: "0",
                  borderRadius: "20px",
                  border: "5px solid rgba(221, 223, 238, 0.16)",
                  height: "100%",
                  width: "100%",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: "1",
                  padding: "24px",
                  textAlign: "right",
                }}
              >
                <label
                  htmlFor="phoneNumber"
                  style={{ color: "rgba(0, 0, 0, 0.54)", display: "block" }}
                >
                  {t("loginmodal.input_label")}
                </label>
                <img
                  src={KSA}
                  alt="ksa"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "1rem",
                    marginTop: "0.2rem",
                  }}
                />
                <TextField
                  id="phoneNumber"
                  type="text"
                  placeholder="051 2345 678"
                  value={phoneNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <PhoneIcon /> */}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    direction: "ltr",
                    border: "none",
                    width: "100%",
                    marginTop: "-1rem",
                    "& fieldset": { border: "none" },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                    "& ::placeholder": {
                      fontSize: "20px",
                      fontWeight: "700",
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box
              sx={{
                // display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Typography>
                {t("loginmodal.sended_message") + ` ` + phoneNumber}
              </Typography>
              {isOTPInvalid && (
                <Typography color="error">
                  {t("loginmodal.error_message")}
                </Typography>
              )}
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {step === 2 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  direction: "ltr", // Set the direction to RTL
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => {
                  const inputIndex = index;
                  return (
                    <TextField
                      key={index}
                      type="text"
                      value={otp[inputIndex] || ""}
                      onChange={(e) => {
                        const updatedOTP = [...otp];
                        updatedOTP[inputIndex] = e.target.value;
                        setOTP(updatedOTP.join(""));
                        setIsValidOTP(updatedOTP.join("").length === 4);

                        if (e.target.value && index < 3) {
                          const nextInput = document.getElementById(
                            `otp-input-${index + 1}`
                          );
                          nextInput && nextInput.focus();
                        }
                      }}
                      inputProps={{
                        maxLength: 1,
                      }}
                      autoFocus={index === 0}
                      id={`otp-input-${index}`}
                      sx={{
                        width: "60px",
                        marginLeft: "0.5rem", // Adjust the margin to create the desired spacing
                        "& input": {
                          textAlign: "center",
                          fontSize: "20px",
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#14b183",
                            paddingLeft: "30px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#14b183",
                            color: "#171718",
                          },
                        },
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              disabled={step === 1 ? !isValidPhoneNumber : !isValidOTP}
              sx={{
                boxShadow: "none",
                backgroundColor:
                  step === 1
                    ? isValidPhoneNumber
                      ? "var(--green-color)"
                      : "rgba(0, 0, 0, 0.12)"
                    : isValidOTP
                    ? "var(--green-color)"
                    : "rgba(0, 0, 0, 0.12)",
                color:
                  step === 1
                    ? isValidPhoneNumber
                      ? "white"
                      : "rgba(0, 0, 0, 0.26)"
                    : isValidOTP
                    ? "white"
                    : "rgba(0, 0, 0, 0.26)",

                marginY: "1rem",
                marginX: "auto",
                width: "10rem",
                display: "block",
                "&:hover": {
                  color:
                    step === 1
                      ? isValidPhoneNumber
                        ? "white"
                        : "rgba(0, 0, 0, 0.26)"
                      : isValidOTP
                      ? "white"
                      : "rgba(0, 0, 0, 0.26)",
                  backgroundColor:
                    step === 1
                      ? isValidPhoneNumber
                        ? "var(--green-color)"
                        : "rgba(0, 0, 0, 0.12)"
                      : isValidOTP
                      ? "var(--green-color)"
                      : "rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              {step === 1
                ? t("loginmodal.submit_btn")
                : t("loginmodal.submit_btn_2")}
            </Button>
          </Box>

          {step === 1 && (
            <Typography>
              {t("loginmodal.hint")}
              <b> {t("loginmodal.bold_hint")}</b>
            </Typography>
          )}

          {step === 2 && (
            <Box>
              {isCounterActive && (
                <Typography>
                  ({formattedTime} {t("loginmodal.seconds")})
                </Typography>
              )}
              {!isCounterActive && (
                <Button onClick={handleResend} sx={{ color: "black" }}>
                  {t("loginmodal.message")}
                </Button>
              )}
            </Box>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default LogInModal;
