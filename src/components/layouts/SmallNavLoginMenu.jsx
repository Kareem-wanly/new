import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  // Link,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Profile, Favorite, Aqar, Call, Logout } from "../../assets";

import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";
const SmallNavLoginMenu = ({ user }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("user_token");
    nav("/login");
  };

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <Box
        sx={{
          top: "0px",
          left: "0px",
          height: "100%",
          width: "100%",
          display: "flex",
          zIndex: "999",
          transition: "top 0.45s ease-in-out 0s",
          opacity: "1",
          position: "absolute",
        }}
      >
        {/* <Box
          sx={{
            backgroundColor: "rgb(13, 13, 16)",
            opacity: "0.24",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            bottom: "0px",
            display: "block",
            zIndex: "0",
          }}
        ></Box> */}
        <Box
          sx={{
            height: "1px",
            width: "100%",
            position: "absolute",
            top: "80px",
            zIndex: "2",
            display: "block",
            backgroundColor: "rgb(242, 242, 242)",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "rgb(255, 255, 255)",
            position: "absolute",
            zIndex: "1",
            maxHeight: "90vh",
            top: "80px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "25px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                justifyContent: lang === "ar" ? "right" : "left",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Avatar sx={{ width: "40px", height: "40px", marginLeft: "5px" }}>
                {user?.username?.charAt(0)}
              </Avatar>
              <Box sx={{ marginRight: "16px" }}>
                <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                  {user?.username}
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>{user?.email}</Typography>
              </Box>
            </Box>
            <List sx={{ width: "100%", paddingY: "8px" }}>
              <Link
                to="/userdashbored"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  sx={{
                    width: "auto",

                    minHeight: "48px",

                    paddingTop: "6px",
                    whiteSpace: "nowrap",
                    paddingBottom: "6px",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgba(0, 0, 0, 0.54)",
                      display: "inline-flex",
                      minWidth: "56px",
                      flexShrink: "0",
                    }}
                  >
                    <img src={Profile} alt="profile" />
                  </Box>
                  <Typography>{t("profile_menu.profile_btn")}</Typography>
                </ListItem>
              </Link>
              <Link
                to="/userdashbored"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  sx={{
                    width: "auto",

                    minHeight: "48px",

                    paddingTop: "6px",
                    whiteSpace: "nowrap",
                    paddingBottom: "6px",
                  }}
                >
                  <Box
                    sx={{
                      color: "rgba(0, 0, 0, 0.54)",
                      display: "inline-flex",
                      minWidth: "56px",
                      flexShrink: "0",
                    }}
                  >
                    <img src={Favorite} alt="profile" />
                  </Box>
                  <Typography> {t("profile_menu.favourite_btn")}</Typography>
                </ListItem>
              </Link>

              <ListItem
                sx={{
                  width: "auto",

                  minHeight: "48px",

                  paddingTop: "6px",
                  whiteSpace: "nowrap",
                  paddingBottom: "6px",
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    display: "inline-flex",
                    minWidth: "56px",
                    flexShrink: "0",
                  }}
                >
                  <img src={Logout} alt="logout" />
                </Box>
                <Typography onClick={handleSignOut} sx={{ cursor: "pointer" }}>
                  {" "}
                  {t("profile_menu.logout_btn")}{" "}
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SmallNavLoginMenu;
