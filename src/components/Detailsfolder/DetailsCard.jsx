import React, { useContext, useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import ChatIcon from "@mui/icons-material/Chat";
import ReportModal from "../layouts/ReportModal";
import WarningIcon from "@mui/icons-material/Warning";
import ChatContext from "../../context/chatContext";
import { useTranslation } from "react-i18next";

const customLinkStyles = {
  textDecoration: "none",
  color: "inherit",
};

const DetailsCard = ({ adInfo }) => {
  const userToken = localStorage.getItem("user_token");
  const [modalReportOpen, setModalReportOpen] = useState(false);
  const { isUserSelected, setIsUserSelected } = useContext(ChatContext);
  const { userKlickedData, setUserKlickedData, setRecipientId } =
    useContext(ChatContext);
  const isMyAd =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).id === adInfo.user.id;

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleReportOpenModal = () => {
    setModalReportOpen(true);
  };

  const handleReportCloseModal = () => {
    setModalReportOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          borderRadius: "20px",
          border: "1px solid rgba(111, 125, 149, 0.38)",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 20px 64px",
          maxWidth: "433px",
          position: " relative",
        }}
      >
        <Box
          sx={{ display: "flex", padding: " 1rem", justifyContent: "center" }}
        >
          <Typography
            sx={{
              color: "var(--green-color)",
              fontSize: "35px",
              fontWeight: "bold",
              marginLeft: "0.5rem",
            }}
          >
            {adInfo.price}
          </Typography>
          <Typography sx={{ color: "orange", fontSize: "35px" }}>
            {t("details_page.details_card.currency")}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgb(234, 237, 242)",
            display: "flex",
          }}
        ></Box>
        <Box sx={{ display: "flex", padding: "1rem" }}>
          <Typography sx={{ fontWeight: "bold", marginLeft: "0.5rem" }}>
            {t("details_page.details_card.advertiser_name")}:
          </Typography>
          <Typography> {adInfo.user?.username}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "1rem",
            border: "1px solid rgb(234, 237, 242)",
            padding: "0.5rem 0rem",
            margin: "1rem",
            borderRadius: "15px",
            justifyContent: "center",
            width: "12rem",
          }}
        >
          {t("details_page.details_card.advertiser_broker") +
            ": " +
            t(
              `user_dashboard.order_details.${adInfo?.advertiser_relationship}`
            )}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgb(234, 237, 242)",
            display: "flex",
          }}
        ></Box>
        <Box sx={{ display: "flex", padding: "1rem" }}>
          <Typography sx={{ fontWeight: "bold", marginLeft: "0.5rem" }}>
            {t("details_page.details_card.ad_reference_number")}:
          </Typography>
          <Typography> {adInfo.ref_number}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            paddingY: "1rem",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box>
            <Link
              href={`https://api.whatsapp.com/send?phone=${adInfo.phone}`}
              passHref
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                style={customLinkStyles}
                sx={{
                  padding: "0.7rem 0rem",
                  width: "70%",
                  backgroundColor: "var(--green-color) ",
                  color: "white !important",
                  border: "1px solid var(--green-color)",
                  borderRadius: "25px",
                  boxShadow: "none",
                  fontSize: "17px",

                  "&:hover": {
                    color: "white",
                    backgroundColor: "var(--green-color)",
                    boxShadow: "none",
                  },
                }}
              >
                <WhatsAppIcon
                  sx={{
                    marginLeft: lang === "ar" && "15px",
                    marginRight: lang === "en" && "15px",
                    fontSize: "25px",
                  }}
                />
                {t("details_page.details_card.whatsapp_button")}
              </Button>
            </Link>
          </Box>
          <Box>
            <Link
              href={`tel:${adInfo.phone}`}
              passHref
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                style={customLinkStyles}
                sx={{
                  padding: "0.7rem 0rem",
                  width: "70%",
                  backgroundColor: "var(--green-color) ",
                  color: "white !important",
                  border: "1px solid var(--green-color)",
                  borderRadius: "25px",
                  boxShadow: "none",
                  marginTop: "1rem",
                  fontSize: "17px",

                  "&:hover": {
                    color: "white",
                    backgroundColor: "var(--green-color)",
                    boxShadow: "none",
                  },
                }}
              >
                <CallIcon
                  sx={{
                    marginLeft: lang === "ar" && "15px",
                    marginRight: lang === "en" && "15px",
                    fontSize: "25px",
                  }}
                />
                {t("details_page.details_card.phone_button")}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "433px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "white",
            color: "var(--green-color)",
            borderRadius: "15px",
            paddingX: "2.5rem",
            fontSize: "15px",
            minWidth: "64px",
            width: "45%",
            padding: "0.8rem",

            border: "1px solid var(--green-color)",
            "&:hover": {
              backgroundColor: "white",
              color: "var(--green-color)",
              boxShadow: "none",
            },
          }}
          onClick={handleReportOpenModal}
          disabled={!userToken}
        >
          <WarningIcon
            sx={{
              color: "var(--green-color)",
              marginLeft: lang === "ar" && "15px",
              marginRight: lang === "en" && "15px",
            }}
          />
          {t("details_page.details_card.report_button")}
        </Button>

        <Button
          sx={{
            backgroundColor: "white",
            color: "var(--green-color)",
            borderRadius: "15px",
            paddingX: "2.5rem",
            fontSize: "15px",
            minWidth: "64px",
            width: "45%",
            padding: "0.8rem",

            border: "1px solid var(--green-color)",
            "&:hover": {
              backgroundColor: "white",
              color: "var(--green-color)",
              boxShadow: "none",
            },
          }}
          onClick={() => {
            setIsUserSelected(true);
            setUserKlickedData(adInfo?.user);
            setRecipientId(adInfo?.user.id);
          }}
          disabled={!userToken}
        >
          {/* {t("details_page.details_card.chat_button")} */}

          <ChatIcon
            sx={{
              color: "var(--green-color)",
              marginLeft: lang === "ar" && "15px",
              marginRight: lang === "en" && "15px",
            }}
          />
          {t("details_page.details_card.chat_button")}
        </Button>

        {/* <ReportModal open={modalReportOpen} onClose={handleReportCloseModal} /> */}
        <ReportModal
          open={modalReportOpen}
          onClose={handleReportCloseModal}
          adID={adInfo.id}
        />
      </Box>
    </>
  );
};

export default DetailsCard;
