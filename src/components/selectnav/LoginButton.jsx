import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";
import LogInModal from "./LogInModal";
import SmallNavLoginMenu from "../layouts/SmallNavLoginMenu";
import Collapse from "@mui/material/Collapse";
import { useTranslation } from "react-i18next";
import { myAxios } from "../../api/myAxios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoginButton = ({ isLoggedIn }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState();
  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      const res = await myAxios.get("/api/user/get_user_data");
      if (res) {
        setUser(res?.data?.user);
      }
    }
    getData();
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [ShowLogout, setShowLogout] = useState(false);

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setShowLogout((prev) => !prev);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handlShowLogMenu = () => {
    if (isSmallScreen) {
      setIsOpenProfile(true);
      setOpenModal(false);
    }
  };
  const handleCLoseLogMenu = () => {
    setIsOpenProfile(false);
    setOpenModal(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user_token");
    nav("/login");
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          sx={{
            backgroundColor: { xs: "transparent", lg: "var( --green-color)" },
            color: { xs: "var(--green-color)", lg: "white" },
            border: { xs: "none", lg: "1px solid var( --green-color)" },
            minWidth: "0",
            // marginRight: "auto",
            // marginLeft: { lang: "ar" ? "auto" : "" },
            borderRadius: "25px",
            height: "3rem",
            "&:hover": {
              backgroundColor: "white",
              color: "var( --green-color)",
            },
            // position: "relative",
          }}
          onClick={isOpenProfile ? handleCLoseLogMenu : handleOpenModal}
        >
          {isOpenProfile && isLoggedIn ? (
            <CloseIcon sx={{ zIndex: "1000", display: { md: "none" } }} />
          ) : (
            <AccountCircleIcon
              sx={{
                width: { xs: "30px", md: "55px", lg: "30px" },
                height: { xs: "30px", md: "55px", lg: "30px" },
              }}
              onClick={handlShowLogMenu}
            />
          )}

          <Typography
            sx={{
              fontSize: { lg: "15px", xl: "1rem" },
              fontWeight: "500",
              marginX: { lg: "0.3rem", xl: "0.8rem" },
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            {!isLoggedIn ? t("nav.buttons.login_btn") : user?.username}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          />
        </Button>

        {isLoggedIn && ShowLogout && (
          <Paper
            // ref={loginListRef}
            sx={{
              position: "absolute",
              top: "60px",
              left: i18n.language === "ar" && "0",
              right: i18n.language === "en" && "0",
              display: { xs: "none", md: "block" },
              zIndex: 10000000,
              borderRadius: "12px",
              filter: "drop-shadow(rgba(0, 0, 0, 0.32) 0px 2px 8px)",
              "&:before": {
                content: "''",
                display: "block",
                position: "absolute",
                top: "0px",
                left: i18n.language === "ar" && "14px",
                right: i18n.language === "en" && "14px",
                width: "10px",
                height: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
              "& li": {
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                padding: "0rem 1rem 0.3rem 0rem",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              },
              transition: "opacity 0.5s ease-in-out",
              opacity: 1,
            }}
          >
            <ul
              style={{
                listStyle: "none",
                minWidth: "200px",
                margin: "0",
                padding: "1rem .5rem",
                cursor: "pointer",
              }}
            >
              <Link
                to="/userdashbored"
                style={{ color: "black", textDecoration: "none" }}
              >
                <li
                  style={{
                    borderBottom: "none",
                    padding: "0.3rem 1rem 0rem 0rem",
                  }}
                >
                  {t("profile_menu.profile_btn")}
                </li>
              </Link>
              <li
                onClick={handleSignOut}
                style={{
                  borderBottom: "none",
                  padding: "0.3rem 1rem 0rem 0rem",
                }}
              >
                {t("user_dashboard.top_nav.title2")}
              </li>
            </ul>
          </Paper>
        )}
      </Box>
      {isLoggedIn && (
        <Collapse in={isOpenProfile} orientation="vertical">
          <SmallNavLoginMenu user={user} />
        </Collapse>
      )}

      {!isLoggedIn && (
        <LogInModal open={openModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default LoginButton;
