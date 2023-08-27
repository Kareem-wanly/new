import React, { useState, useEffect, useRef, useContext } from "react";
import { Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { isBefore, subDays } from "date-fns";
import ChatContext from "../../context/chatContext";

const Notification = ({ notificationData }) => {
  const notificationRef = useRef(null);
  const notificationIconRef = useRef(null);
  const [openNotifivations, setOpenNotification] = useState(false);

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const handleOpenNotification = () => {
    setOpenNotification(!openNotifivations);
  };

  const handleOutsideClick = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      !notificationIconRef.current.contains(event.target)
    ) {
      setOpenNotification(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { isUserSelected, setIsUserSelected, setRecipientId } =
    useContext(ChatContext);

  const openChat = (e, not) => {
    e.preventDefault();
    const notType = JSON.parse(not.url).type;
    const notId = JSON.parse(not.url).user_id;
    if (notType === "message") {
      setIsUserSelected(true);
      setRecipientId(notId);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <NotificationsIcon
        ref={notificationIconRef}
        sx={{ fontSize: "28px", color: "var(--green-color)", marginTop: "5px" }}
        onClick={handleOpenNotification}
      />
      {openNotifivations && (
        <Box
          ref={notificationRef}
          sx={{
            backgroundColor: "white",
            boxShadow: "5",
            minWidth: "20rem",
            textAlign: lang === "ar" ? "right" : "left",

            borderRadius: "1rem",
            zIndex: "10",
            position: "absolute",
            left: "-120px",
            top: " 3rem",
            overflow: "scroll",
            height: "320px",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                padding: " 10px",
                fontWeight: "600",
              }}
            >
              {t("notifications.title")}
            </Typography>
            <Link to="/userdashbored" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "var(--green-color)", marginX: "5px" }}>
                عرض الكل
              </Typography>
            </Link>
          </Box>

          {notificationData.notifications.data?.map((notification, i) => {
            const createdAt = new Date(notification.created_at);
            const now = new Date();
            const isMoreThanADayAgo = isBefore(createdAt, subDays(now, 1));

            return (
              notification.seen === 0 && (
                <Box
                  key={notification.id}
                  sx={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}
                >
                  <a
                    onClick={(e) => openChat(e, notification)}
                    href={notification.url}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <Typography sx={{ color: "var(--green-color)" }}>
                      {lang === "ar"
                        ? notification.ar_title
                        : notification.en_title}
                    </Typography>
                    <Typography>
                      {lang === "ar"
                        ? notification.ar_body
                        : notification.en_body}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "left",
                        color: "gray",
                        fontSize: "11px",
                      }}
                    >
                      {isMoreThanADayAgo
                        ? new Date(notification.created_at).toLocaleDateString()
                        : new Date(
                            notification.created_at
                          ).toLocaleTimeString()}
                    </Typography>
                  </a>
                </Box>
              )
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Notification;
