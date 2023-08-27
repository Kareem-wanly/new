import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Modal,
  Link,
  InputAdornment,
} from "@mui/material";
import { Logo } from "../../assets";
import { useTranslation } from "react-i18next";
import { myAxios } from "../../api/myAxios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { KSA } from "../../assets";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCounterActive, setIsCounterActive] = useState(true);
  const [timer, setTimer] = useState(180);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    try {
      const res = await myAxios.post("/api/login", {
        phone: phoneNumber,
      });
    } catch (err) {}
  };

  const [otp, setOTP] = useState(["", "", "", ""]);

  const verifyOTP = async (e) => {
    // e.target.disabled = true;
    try {
      const res = await myAxios.post("/api/CheckCode", {
        phone: phoneNumber,
        code: otp,
      });
      if (res.data.status === 0) {
        toast.error(res?.data?.message);
        // navigate("/userDashbored");
      } else {
        toast.success(res?.data?.message);
        localStorage.setItem("user_token", res?.data?.access_token);
        setTimeout(() => {
          navigate("/userdashbored");
        }, 1500);
      }
    } catch (err) {}
  };
  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          try {
            const res = myAxios.post("/api/changeCode", {
              phone: phoneNumber,
            });
          } catch (err) {}
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
  }, [isModalOpen, isCounterActive]);

  const handleResend = async () => {
    setIsCounterActive(true);
    try {
      const res = await myAxios.post("/api/login", {
        phone: phoneNumber,
      });
    } catch (err) {}
  };

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  // Create refs for each input field

  return (
    <>
      <Container>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} md={5} sx={{ marginTop: "5rem" }}>
            <Box
              sx={{
                position: "relative",
                paddingX: "2.5rem",
                paddingY: "3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                wordWrap: "break-word",
                backgroundColor: "#fff",
                backgroundClip: "border-box",
                border: "0 solid #f7f7f7",
                borderRadius: ".25rem",
              }}
            >
              <Box
                sx={{
                  width: "auto",
                  height: "80px",
                  position: "relative",
                  margin: "auto",
                  marginTop: "2rem",
                }}
              >
                <img
                  src={Logo}
                  alt="logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <form onSubmit={handleSubmit}>
                <Typography sx={{ marginY: "2rem", textAlign: "center" }}>
                  {t("login.title")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="phoneNumberInput"
                    style={{ color: "gray", marginBottom: "1rem" }}
                  >
                    {t("login.label")}
                  </label>
                  <Box
                    sx={{
                      border: "1px solid #999",
                      borderRadius: ".5rem",
                      position: "relative",
                      zIndex: "1",
                      textAlign: "right",
                    }}
                  >
                    <img
                      src={KSA}
                      alt="ksa"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <TextField
                      id="phoneNumber"
                      type="text"
                      placeholder="051 2345 678"
                      value={phoneNumber}
                      onChange={handleChange}
                      sx={{
                        direction: "ltr",
                        border: "none",
                        width: "100%",
                        paddingLeft: "1.8rem",
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
                <Button
                  type="submit"
                  disabled={!isValidPhoneNumber}
                  sx={{
                    backgroundColor: "var(--green-color)",
                    color: "white",
                    padding: "0.5rem 3rem",
                    margin: "auto",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    display: "block",
                    width: "100%",
                    borderRadius: "2rem",
                    "&:hover": {
                      backgroundColor: "var(--green-color)",
                      color: "white",
                    },
                    "&:disabled": {
                      backgroundColor: "gray",
                      color: "#ddd",
                    },
                  }}
                >
                  {t("login.btn")}
                </Button>
              </form>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Typography sx={{ color: "rgba(255,255,255,.5)" }}>
                {t("login.back_btn")}{" "}
              </Typography>
              <Link href="/" sx={{ color: "white", marginRight: "0.2rem" }}>
                {t("login.back_btn2")}
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="otp-modal"
          aria-describedby="enter-otp"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "350px",
              bgcolor: "background.paper",
              boxShadow: 24,
              padding: "1rem 1.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <Typography
              sx={{
                color: "var(--green-color)",
                fontWeight: "bold",
                fontSize: "18px",
                borderBottom: "1px solid #dee2e6",
                paddingBottom: "1rem",
              }}
            >
              {t("login.modal_title")}
            </Typography>
            <Box
              sx={{
                color: " #6c757d",
                fontWeight: "600",
                display: "flex",
                marginY: "1rem",
                justifyContent: "center",
              }}
            >
              <Typography>
                {t("login.hint")}
                <span>{enteredPhoneNumber}</span>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginY: "1rem",
                justifyContent: "center",
                direction: "ltr",
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
            <Button
              sx={{
                backgroundColor: "var(--green-color)",
                color: "white",
                width: "100%",
                borderRadius: "2rem",
                marginBottom: "1em",
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                },

                "&:disabled": {
                  backgroundColor: "#ccc", // Change to your desired disabled background color
                  color: "#888",
                },
              }}
              onClick={(e) => verifyOTP(e)}
            >
              {t("login.modal_btn")}
            </Button>
            <Box
              sx={{
                color: "#6c757d",
                fontSize: "14px",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {t("login.modal_msg")}

              {isCounterActive && (
                <Typography sx={{ textAlign: "center", color: "red" }}>
                  {formattedTime}
                </Typography>
              )}
              {!isCounterActive && (
                <Button
                  sx={{
                    color: "var(--green-color)",
                    border: "1px solid var(--green-color)",
                    borderRadius: "2rem",
                    width: "100%",
                  }}
                  onClick={handleResend}
                >
                  {t("login.re_btn")}
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Login;
