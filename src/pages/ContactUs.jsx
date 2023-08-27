import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Menu,
  MenuItem,
  Button,
  TextField,
  styled,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslation } from "react-i18next";
const StyledSelect = styled(Select)((props) => ({
  "& .MuiSvgIcon-root": {
    marginRight: "auto",
    marginLeft: "0",
    left: props.lang === "ar" ? "5px" : "",

    // color:"red"
  },
  "& .MuiSelect-icon":{
    marginRight: "auto",
    marginLeft: "0",
    left: props.lang === "ar" ? "5px !important" : "",
    left:"5px",
    // color:"red"
  }
}));
const ContactUs = ({ generalData }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [message, setMessage] = useState("");

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  console.log(generalData);
 
  return (
    <Box sx={{ marginTop: "19rem" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            color: "var(--green-color)",
            marginBottom: "2rem",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          {lang === "ar" ? "  أرسل لنا رسالة لأي استفسار" : "send message..."}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { md: "space-around" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <LocationOnIcon
                sx={{
                  fontSize: { xs: "35px", md: "48px" },
                  color: "var(--green-color)",
                  marginLeft: "10px",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "20px", color: "gray" }}>
                  {lang === "ar" ? "  العنوان " : " address"}
                </Typography>
                <Typography>
                  {lang === "ar"
                    ? generalData?.contact_t1_ar
                    : generalData?.contact_t1_en}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginY: "2rem" }}>
              <EmailIcon
                sx={{
                  fontSize: { xs: "35px", md: "48px" },
                  color: "var(--green-color)",
                  marginLeft: "10px",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "20px", color: "gray" }}>
                  {lang === "ar" ? "  البريد الالكتروني" : " email"}
                </Typography>
                <Typography>
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    {generalData?.contact_t6}
                  </a>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <PhoneIcon
                sx={{
                  fontSize: { xs: "35px", md: "48px" },
                  color: "var(--green-color)",
                  marginLeft: "10px",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "20px", color: "gray" }}>
                  الجوال
                </Typography>
                <Typography>
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    {generalData?.contact_t3}
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Paper
            sx={{
              minWidth: { xs: "100%", md: "500px" },
              // margin: "auto",
              padding: "1rem",
              boxShadow: "2",
              marginTop: { md: "-5rem" },
              marginBottom: "4rem",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "var(--green-color)",
                  fontSize: "18px",
                  marginY: "10px",
                }}
              >
                نوع الرسالة
              </Typography>
              <StyledSelect
                id="select"
                value={selectedValue}
                onChange={handleChange}
                sx={{ width: "100%" }}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </StyledSelect>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: "var(--green-color)",
                  fontSize: "18px",
                  marginY: "10px",
                }}
              >
                المنصة
              </Typography>
              <StyledSelect
                id="select"
                value="option1"
                onChange={handleChange}
                sx={{ width: "100%" }}
                readOnly="read-only"
              >
                <MenuItem value="option1" selected>
                  {" "}
                  موقع
                </MenuItem>
              </StyledSelect>
            </FormControl>
            <Typography
              sx={{
                color: "var(--green-color)",
                fontSize: "18px",
                marginY: "10px",
              }}
            >
              نوع الرسالة
            </Typography>
            <TextField
              id="message"
              placeholder="وصف الرسالة ... "
              multiline
              rows={4}
              value={message}
              onChange={handleMessageChange}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
            <Button
              sx={{
                backgroundColor: "var(--green-color)",
                color: "white",
                margin: "auto",
                padding: "8px 40px",
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                },
              }}
            >
              إرسال
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
