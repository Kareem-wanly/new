import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  Link,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";
import { toast } from "react-hot-toast";
import Loader from "../Loading/Loader";

const PersonalInfo = ({ userData }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, error, get, post } = useDataFetcher();
  const {
    data: membershipsData,
    isLoading: isGettingMemberships,
    get: getMembershipsData,
  } = useDataFetcher();

  const [formData, setFormData] = useState({});
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [memberships, setMemberShips] = useState([]);
  // const [userData, setUserdata] = useState([]);
  const [username, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [compayName, setCompanyName] = useState();
  const [officeName, setOfficeName] = useState();
  const [email, setEmail] = useState();
  const [about, setAbout] = useState();
  const [nationalID, setNationalID] = useState();

  const [membershipId, setMembershipId] = useState("");

  const [license, setLicense] = useState("");
  const [link, setLink] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState();
  const [linkError, setLinkError] = useState("");

  // useEffect(() => {
  //   get(`api/user/get_user_data`);
  // }, []);
  // useEffect(() => {
  //   if (data) {
  //     setUserdata(data.user);
  //   }
  // }, [data]);

  useEffect(() => {
    setUserName(userData?.username);
    setPhoneNumber(userData?.phone);
    setOfficeName(userData?.office_name);
    setCompanyName(userData?.company_name);
    setEmail(userData?.email);
    setNationalID(userData?.IdNumber);
    setAbout(userData?.about);
    setMembershipId(userData?.type_id);
    setLink(userData?.licenseLink);
    if (userData?.licenseLink) {
      setLicense("yes");
    }
  }, [userData]);

  useEffect(() => {
    getMembershipsData(`/api/user/get_user_types`);
  }, []);

  useEffect(() => {
    if (membershipsData) {
      setMemberShips(membershipsData?.types);
    }
  }, [membershipsData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Validate name input
    if (id === "fullname") {
      if (/^[A-Za-z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]:
            lang === "ar"
              ? "يجب إدخال أحرف صحيحة فقط"
              : "Only  characters must be entered ",
        }));
      }
      // setUserName(event.target.value);
    }

    // Validate email input
    if (id === "email") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]:
            lang === "ar"
              ? "يجب إدخال عنوان بريد إلكتروني صالح"
              : " must enter a valid email address",
        }));
      }
    }

    // Validate number input
    if (id === "nationalId") {
      if (/^\d*$/.test(value) || value === "") {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]:
            lang === "ar"
              ? "يجب إدخال أرقام فقط"
              : "Only numbers must be entered",
        }));
      }
    }

    // Validate phone number input
    if (id === "phoneNumber") {
      if (/^966\d{9}$/.test(value) || value === "") {
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]:
            lang === "ar"
              ? "يجب إدخال رقم جوال سعودي "
              : " must enter a Saudi mobile number",
        }));
      }
    }

    switch (id) {
      case "fullname":
        setUserName(value);
        break;
      case "companyname":
        setCompanyName(value);
        break;
      case "deskname":
        setOfficeName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "nationalId":
        setNationalID(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "description":
        setAbout(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (username) {
      setFormData((prev) => ({
        ...prev,
        username: username,
      }));
    }
    if (compayName) {
      setFormData((prev) => ({
        ...prev,
        company_name: compayName,
      }));
    }
    if (officeName) {
      setFormData((prev) => ({
        ...prev,
        office_name: officeName,
      }));
    }
    if (imageFile) {
      setFormData((prev) => ({
        ...prev,
        logo: imageFile,
      }));
    }
    if (email) {
      setFormData((prev) => ({
        ...prev,
        email: email,
      }));
    }
    if (nationalID) {
      setFormData((prev) => ({
        ...prev,
        IdNumber: nationalID,
      }));
    }
    if (membershipId) {
      setFormData((prev) => ({
        ...prev,
        type_id: membershipId,
      }));
    }
    if (link) {
      setFormData((prev) => ({
        ...prev,
        licenseLink: link,
      }));
    }
    if (about) {
      setFormData((prev) => ({
        ...prev,
        about: about,
      }));
    }
    if (phoneNumber) {
      setFormData((prev) => ({
        ...prev,
        phone: phoneNumber,
      }));
    }
  }, [
    username,
    compayName,
    officeName,
    about,
    email,
    imageFile,
    nationalID,
    membershipId,
    link,
    phoneNumber,
  ]);

  const handleLicenseChange = (e) => {
    setLicense(e.target.value);
    if (e.target.value === "no") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleMembershipTypeChange = (e) => {
    setMembershipId(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file && file.size <= 2 * 1024 * 1024) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };
  const handleLinkChange = (e) => {
    const { value } = e.target;
    setLink(value);

    if (value.trim() === "") {
      lang === "ar"
        ? setLinkError("هذا الحقل مطلوب")
        : setLinkError("this field is required");
    } else if (!value.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)) {
      lang === "ar"
        ? setLinkError("الرجاء إدخال رابط صحيح")
        : setLinkError("Please enter a valid link");
    } else {
      setLinkError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    const formDataSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataSend.append(key, formData[key]);
      }
    }
    try {
      const response = await fetch(
        `https://www.dashboard.aqartik.com/api/user/save_user_data`,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
          method: "POST",
          body: formDataSend,
        }
      );
      const data = await response.json();
      if (data) {
        setIsFormSubmitting(false);
        toast.success(
          lang === "ar" ? "تمت العملية بنجاح" : "The operation was successful"
        );
      }
    } catch (error) {
      console.error("Error sending FormData:", error);
      toast.error(
        lang === "ar"
          ? "فشل في اتمام العملية"
          : "Failed to complete the operation"
      );
      setIsFormSubmitting(false);
    }
  };

  return isLoading || isFormSubmitting ? (
    <Loader />
  ) : (
    <Box sx={{ marginTop: "10rem", width: "90%", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <Button
            component="label"
            sx={{
              width: "12rem",
              height: "12rem",
              border: selectedImage ? "none" : "1px dashed gray",
              display: "block",
              margin: "auto",
              marginBottom: "auto",
              marginBottom: "1rem",
              borderRadius: "50%",
              color: "gray",
              backgroundImage: selectedImage
                ? `url(${selectedImage})`
                : `url(https://www.dashboard.aqartik.com/assets/images/users/logo/${userData?.image?.name})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <input
              id={userData?.image_id}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
            {selectedImage ? null : t("user_dashboard.personal_info.img_btn")}
          </Button>
          <Typography sx={{ color: "gray" }}>
            {t("user_dashboard.personal_info.title1")}
          </Typography>
          <Typography sx={{ color: "red" }}>
            {t("user_dashboard.personal_info.hint1")}
          </Typography>
        </Box>
        <Grid
          item
          container
          spacing={2}
          sx={{
            justifyContent: {
              xs: "center",
              md: "right",
            },
          }}
        >
          <Grid item xs={10} md={6}>
            <label htmlFor="fullname">
              {" "}
              {t("user_dashboard.personal_info.label2")}
            </label>
            <TextField
              id="fullname"
              value={username}
              type="text"
              fullWidth
              sx={{ marginTop: "1rem", textTransform: "lowercase" }}
              onChange={handleChange}
              error={Boolean(errors.fullname)}
              helperText={errors.fullname}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="companyname">
              {" "}
              {t("user_dashboard.personal_info.label3")}
            </label>
            <TextField
              id="companyname"
              value={compayName}
              type="text"
              fullWidth
              sx={{ marginTop: "1rem" }}
              onChange={handleChange}
              error={Boolean(errors.companyname)}
              helperText={errors.companyname}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="deskname">
              {" "}
              {t("user_dashboard.personal_info.label4")}
            </label>
            <TextField
              id="deskname"
              value={officeName}
              type="text"
              fullWidth
              sx={{ marginTop: "1rem" }}
              onChange={handleChange}
              error={Boolean(errors.deskname)}
              helperText={errors.deskname}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="email">
              {" "}
              {t("user_dashboard.personal_info.label5")}
            </label>
            <TextField
              id="email"
              value={email}
              type="email"
              fullWidth
              sx={{ marginTop: "1rem" }}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="nationalId">
              {" "}
              {t("user_dashboard.personal_info.label6")}
            </label>
            <TextField
              id="nationalId"
              value={nationalID}
              type="text"
              fullWidth
              sx={{
                marginTop: "1rem",
                "& input[type=number]": {
                  WebkitAppearance: "textfield",
                },
              }}
              onChange={handleChange}
              error={Boolean(errors.nationalId)}
              helperText={errors.nationalId}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="phoneNumber">
              {" "}
              {t("user_dashboard.personal_info.label7")}
            </label>
            <TextField
              id="phoneNumber"
              value={phoneNumber}
              type="tel"
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{
                marginTop: "1rem",
                "& input[type=tel]": {
                  WebkitAppearance: "textfield",
                },
              }}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="description">
              {" "}
              {t("user_dashboard.personal_info.label8")}
            </label>
            <TextField
              id="description"
              value={about}
              type="text"
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: "1rem" }}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <label htmlFor="membershipType">
              {" "}
              {t("user_dashboard.personal_info.label9")}
            </label>
            <RadioGroup
              // name={userData.type_id}
              value={membershipId}
              onChange={handleMembershipTypeChange}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
              }}
            >
              {memberships?.map((membership, index) => (
                <FormControlLabel
                  key={membership.id}
                  value={membership.id}
                  control={<Radio sx={{ opacity: "0" }} />}
                  label={
                    lang === "ar" ? membership.ar_name : membership.en_name
                  }
                  sx={{
                    backgroundColor:
                      membershipId == membership.id
                        ? "var(--green-color)"
                        : "white",
                    color: membershipId == membership.id ? "white" : "black",
                    border: "1px solid #cdcdcd",
                    width: "8rem",
                    marginBottom: "0.5rem",
                    borderRadius: "0",
                    padding: "0.3rem",
                    position: "relative",
                    "& .MuiFormControlLabel-label": {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                  name={`custom-radio-${index}`}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={10} md={6}>
            {/* this section for License */}
            <Box sx={{ marginY: "2rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {t("user_dashboard.personal_info.license")}
              </Typography>
              <RadioGroup
                name="license"
                value={license}
                onChange={handleLicenseChange}
                sx={{ flexDirection: "row", marginTop: "1rem" }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio sx={{ opacity: "0" }} />}
                  label={t("user_dashboard.personal_info.license_btn1")}
                  sx={{
                    backgroundColor:
                      license === "yes" ? "var(--green-color)" : "white",
                    color: license === "yes" ? "white" : "black",
                    border: "1px solid #cdcdcd",

                    width: "8rem",
                    marginBottom: "0.5rem",
                    borderRadius: "2rem",
                    padding: "0.3rem",
                    position: "relative",
                    "& .MuiFormControlLabel-label": {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio sx={{ opacity: "0" }} />}
                  label={t("user_dashboard.personal_info.license_btn2")}
                  sx={{
                    backgroundColor:
                      license === "no" ? "var(--green-color)" : "white",
                    color: license === "no" ? "white" : "black",
                    border: "1px solid #cdcdcd",

                    width: "8rem",
                    marginBottom: "0.5rem",
                    borderRadius: "2rem",
                    padding: "0.3rem",
                    position: "relative",
                    "& .MuiFormControlLabel-label": {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    },
                  }}
                />
              </RadioGroup>
              {license === "yes" && (
                <Box sx={{ marginY: "1rem" }}>
                  <label htmlFor="licenseLink">
                    {t("user_dashboard.personal_info.license_modal_title")}*
                  </label>
                  <TextField
                    id="licenseLink"
                    type="text"
                    fullWidth
                    sx={{ marginTop: "1rem" }}
                    value={link}
                    onChange={handleLinkChange}
                    error={Boolean(linkError)}
                    helperText={linkError}
                    required
                  />
                </Box>
              )}
              <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "300px", md: "500px" },
                    bgcolor: "white",
                    border: "2px solid transparent",
                    borderRadius: "1rem",
                    boxShadow: 24,
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Typography>
                    {t("user_dashboard.personal_info.license_modal_desc")}
                  </Typography>
                  <Box sx={{ marginY: "1rem" }}>
                    <Button
                      sx={{
                        border: "1px solid var(--green-color)",
                        color: "var(--green-color)",
                        padding: "0.5rem 2rem",
                        marginX: "0.3rem",
                      }}
                    >
                      <Link
                        href="https://eservicesredp.rega.gov.sa/auth/register"
                        sx={{
                          textDecoration: "none",
                          color: "var(--green-color)",
                        }}
                      >
                        {t("user_dashboard.personal_info.license_modal_btn1")}
                      </Link>
                    </Button>
                    <Button
                      onClick={handleCloseModal}
                      sx={{
                        border: "1px solid var(--green-color)",
                        color: "var(--green-color)",
                        padding: "0.5rem 2rem",
                        marginX: "0.3rem",
                      }}
                    >
                      {t("user_dashboard.personal_info.license_modal_btn2")}
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </Grid>
        </Grid>

        <Button
          type="submit"
          sx={{
            backgroundColor: "var(--green-color)",
            color: "white",
            marginY: "2rem",
            fontSize: "18px",
            padding: "0.5rem 2rem",
            display: "block",
            marginX: "auto",
            "&:hover": {
              backgroundColor: "var(--green-color)",
              color: "white",
            },
          }}
        >
          {t("user_dashboard.personal_info.main_btn")}
        </Button>
      </form>
    </Box>
  );
};

export default PersonalInfo;
