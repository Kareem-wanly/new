import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";
import { useNavigate } from "react-router";

const TopNav = ({ setShowNotification, showNotification }) => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const [username, setUserName] = useState();
  const { data, isLoading, error, get, post } = useDataFetcher();

  const nav = useNavigate();

  useEffect(() => {
    get(`api/user/get_user_data`);
  }, []);
  useEffect(() => {
    if (data) {
      setUserName(data?.user?.username);
    }
  }, [data]);

  const [showLoginList, setShowLoginList] = useState(false);

  const loginListRef = useRef(null);

  const toggleShowLoginList = (event) => {
    event.stopPropagation();
    setShowLoginList(!showLoginList);
  };

  const handleClickOutside = (event) => {
    if (loginListRef.current && !loginListRef.current.contains(event.target)) {
      setShowLoginList(false);
    }
  };
  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user_token");
    nav("/login");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "1",
        width: "100%",
        height: "80px",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0px",
        display: "flex",
        justifyContent: lang === "ar" ? "left" : "right",
        alignItems: "center",
      }}
    >
      <NotificationsIcon
        sx={{
          fontSize: "28px",
          color: "var(--green-color)",
          marginLeft: "10px",
          cursor: "pointer",
        }}
        onClick={handleNotificationClick}
      />
      <Button
        sx={{ color: "var(--green-color)" }}
        onClick={toggleShowLoginList}
      >
        <Avatar
          sx={{
            width: "20px",
            height: "20px",
            marginLeft: "10px",
            backgroundColor: "var(--green-color)",
          }}
        />
        <Typography sx={{ fontWeight: "700" }}>{username}</Typography>
        <KeyboardArrowDownIcon sx={{ marginRight: "10px" }} />
      </Button>

      {showLoginList && (
        <Paper
          ref={loginListRef}
          sx={{
            position: "absolute",
            top: "73px",
            borderRadius: "12px",
            filter: "drop-shadow(rgba(0, 0, 0, 0.32) 0px 2px 8px)",
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: "0px",
              left: lang === "ar" && "14px",
              right: lang === "en" && "14px",
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
  );
};

export default TopNav;
