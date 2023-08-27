import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  // Link,
  Typography,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteButton from "./FavoriteButton";
import { Share } from "../../../assets";
import DetailsImagesXs from "./DetailsImagesXs";
import DetailsXsTabs from "./DetailsXsTabs";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

const DetailsXsScreens = ({ adInfo }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  //  adInfo = useLocation().state.ad;
  const AdID = adInfo.id;

  const [ShareListOpen, setShareListOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".list-container") &&
      !event.target.classList.contains("share-button")
    ) {
      setShareListOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          marginTop: "-9rem",
          overflow: "hidden",
        }}
      >
        <Box sx={{ paddingBottom: "60px" }}>
          {/* this for swiper slider */}
          <Box>
            <DetailsImagesXs adInfo={adInfo} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "15px",

              width: "100%",
              zIndex: "2",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <IconButton>
                <Link
                  to="/deals"
                  state={{
                    is_special: 1,
                  }}
                >
                  <ChevronRightIcon
                    sx={{
                      fontSize: "2rem",
                      transform:
                        lang === "ar" ? "rotate(0)" : "rotate(-180deg)",
                      color: "white",
                    }}
                  />
                </Link>
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: "0px",
                }}
              >
                <FavoriteButton adInfo={adInfo} />
                <Box>
                  <Button onClick={() => setShareListOpen(!ShareListOpen)}>
                    {<img src={Share} alt="sharicon" />}
                  </Button>
                  {ShareListOpen && (
                    <List
                      sx={{
                        zIndex: "1",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        backgroundColor: "white",
                        width: "14rem",
                        boxShadow:
                          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                      }}
                      className="list-container"
                    >
                      <ListItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <a
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            width: "100%",
                            display: "flex",
                          }}
                          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FacebookIcon />
                          <ListItemText
                            primary={t("details_page.facebook_share")}
                          />
                        </a>
                      </ListItem>

                      <ListItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <a
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            width: "100%",
                            display: "flex",
                          }}
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            "Check out this link!"
                          )}&url=${window.location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TwitterIcon />
                          <ListItemText
                            primary={t("details_page.twitter_share")}
                          />
                        </a>
                      </ListItem>

                      <ListItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                        onClick={handleCopyLink}
                      >
                        <LinkIcon />
                        <ListItemText primary={t("details_page.copy_url")} />
                      </ListItem>
                    </List>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* this Box for Tabs  */}
          <DetailsXsTabs adInfo={adInfo} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          bottom: "0px",
          right: "0px",
          left: "0px",
          maxWidth: "100%",
          height: "81px",
          backgroundColor: "rgb(248, 248, 248)",
          padding: "0px 25px",
          zIndex: "999",
        }}
      >
        <Link
          href={`tel:${adInfo.phone}`}
          sx={{
            textDecoration: "none",
            backgroundColor: "var(--green-color)",
            color: "white",
            minWidth: "9rem",
            textAlign: "center",
            height: "3rem",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            borderRadius: "25px",
            fontSize: "18px",
          }}
        >
          {t("details_page.details_card.phone_button")}
        </Link>

        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              marginX: "10px",
              color: "var(--green-color)",
              fontSize: "35px",
            }}
          >
            {adInfo.price}
          </Typography>
          <Typography sx={{ color: "orange", fontSize: "35px" }}>
            {t("currency")}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DetailsXsScreens;
