import React, { useState } from "react";

import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import DetailsTabContent from "./DetailsTabContent";

import WifiIcon from "@mui/icons-material/Wifi";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Map from "../../assets/map.jpg";
import HomeRooms from "./HomeRooms";
// import Map from "../addadsolder/Map";

import { DetailsFeaturesBox, FiveStars } from "../Detailsfolder";
import { useTranslation } from "react-i18next";
import MapLocation from "./detailspagexs/MapLocation";

const DetailsTabs = ({ adInfo }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [adId, setAdId] = useState(adInfo.id);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabStyles = {
    color: "black",
    fontSize: { xs: "12px", md: "15px" },
    width: "33%",
    padding: { xs: "0 0.5rem", md: "0 3rem" },
    "&.Mui-selected": {
      backgroundColor: "var(--green-color)",
      color: "white",
      borderRadius: "25px",
      padding: { xs: "0 0.5rem", md: "0 3rem" },
    },
    "&::before": {
      content: '""',
      width: "4px",
      height: "4px",
      backgroundColor: "rgba(0, 0, 0, 0.16)",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      right: "2px",
      transform: "translateX(50%)",
    },
  };
  const tabIndicatorStyles = {
    display: "none", // Hide the default tab indicator
  };
  const handleToggleCommentForm = () => {
    setShowCommentForm((prevShowCommentForm) => !prevShowCommentForm);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "4px",
          border: "1px solid rgba(121, 141, 174, 0.16)",
          borderRadius: "30px",
          // maxWidth: "37rem",
          width: "100%",
          justifyContent: "space-evenly",
          display: "flex",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: tabIndicatorStyles,
          }}
          sx={{ width: "100%" }}
        >
          <Tab
            label={t("details_page.details_tabs.specifications_and_features")}
            sx={tabStyles}
          />
          <Tab
            label={t("details_page.details_tabs.location_and_map")}
            sx={tabStyles}
          />
          <Tab
            label={t("details_page.details_tabs.guest_reviews")}
            sx={tabStyles}
          />
        </Tabs>
      </Box>
      <Box hidden={selectedTab !== 0}>
        <DetailsTabContent
          title={t("details_page.details_tabs.specifications_and_features")}
        />
        <DetailsFeaturesBox adInfo={adInfo} />
      </Box>
      <Box hidden={selectedTab !== 1}>
        <DetailsTabContent
          title={t("details_page.details_tabs.location_and_map")}
        />
        <Box sx={{ display: "flex", color: "gray" }}>
          <ErrorOutlineIcon sx={{ marginX: "0.3rem" }} />
          <Typography sx={{ marginBottom: "1rem" }}>
            {t("details_page.details_tabs.location_and_map_tab.desc")}.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            objectFit: "cover",
            border: "1px solid transparent",
            borderRadius: "2rem",
          }}
        >
          {/* <MapLocation lat={adInfo.lat} lng={adInfo.lng} /> */}
          {/* <Map /> */}
          <Link
            href={`https://www.google.com/maps/dir/My+Location/${adInfo.lat},${adInfo.lng}/@${adInfo.lat},${adInfo.lng},12z/data=!3m1!4b1?entry=ttu`}
            target="_blank"
          >
            <img
              src={Map}
              alt="mapImg"
              style={{ width: "100%", borderRadius: "2rem" }}
            />
          </Link>
        </Box>
      </Box>
      <Box hidden={selectedTab !== 2}>
        <DetailsTabContent
          title={t("details_page.details_tabs.guest_reviews")}
        />
        {showCommentForm && ( // Render the box conditionally based on the showCommentForm variable
          <Box
            sx={{
              border: "1px solid gray",
              borderRadius: "18px",
              padding: "1rem",
            }}
          >
            <Typography sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
              {t("details_page.details_tabs.guest_reviews_tab.comment_title")}
            </Typography>
            <Typography sx={{ color: "gray" }}>
              {t("details_page.details_tabs.guest_reviews_tab.comment_desc")}
            </Typography>
            <Box sx={{ display: "flex", marginY: "1rem" }}>
              <Box sx={{ width: "50%" }}>
                <TextField
                  fullWidth
                  placeholder={t(
                    "details_page.details_tabs.guest_reviews_tab.placeholder1"
                  )}
                  required
                  InputProps={{
                    sx: {
                      borderRadius: "2rem", // Apply the desired border radius
                    },
                  }}
                />
              </Box>
              <FiveStars adInfo={adId} />
            </Box>
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4} // Specify the number of rows for the multiline input
                placeholder={t(
                  "details_page.details_tabs.guest_reviews_tab.placeholder2"
                )}
                required
                InputProps={{
                  sx: {
                    borderRadius: "2rem", // Apply the desired border radius
                  },
                }}
              />
            </Box>
            <Button
              sx={{
                backgroundColor: "var(--green-color)",
                color: "white",
                borderRadius: "1rem",
                paddingX: "1rem",
                marginY: "1rem",
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  transform: "scale(1.05)", // Apply scale transform on hover
                  transition: "transform 0.3s ease",
                },
              }}
            >
              {t("details_page.details_tabs.guest_reviews_tab.comment_btn")}
            </Button>
          </Box>
        )}
        {!showCommentForm && (
          <Box
            sx={{
              border: "1px solid #d2cdcd",
              padding: "1rem",
              width: "15rem",
              borderRadius: "1rem",
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              {t("details_page.details_tabs.guest_reviews_tab.review_title")}..
            </Typography>
            <FiveStars adInfo={adId} />
          </Box>
        )}
        {/* Render the FiveStars component if showCommentForm is false */}
      </Box>
    </Box>
  );
};

export default DetailsTabs;
