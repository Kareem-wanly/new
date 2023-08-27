import React, { useState, useRef, useEffect, useContext } from "react";
import { Typography, Box, Container, Button, Grid, Link } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import GroupIcon from "@mui/icons-material/Group";
import IosShareIcon from "@mui/icons-material/IosShare";
import { FavoriteIcons } from "../components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import ImagesTest from "../components/Detailsfolder/detailspagexs/ImagesTest";
import { useLocation, useParams } from "react-router";

import {
  DetailsCard,
  DetailsImages,
  DetailsTabs,
  DetailsXsScreens,
} from "../components/Detailsfolder";
import { SpecialAds, PaginationAds } from "../components";

import { List, ListItem, ListItemText, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../api/useDataFetcher ";
import ChatContext from "../context/chatContext";
import { myAxios } from "../api/myAxios";
import Loader from "../components/Loading/Loader";
import LoaderHome from "../components/Loading/LoaderHome";

const Details = () => {
  // const adInfo = useLocation().state.ad;
  const id = useParams().id;
  const { t, i18n } = useTranslation();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [adInfo, setAdInfo] = useState();
  const lang = i18n.language;
  useEffect(() => {
    setIsDataLoading(true);
    async function getData() {
      try {
        const response = await myAxios.get(`/api/deal/details/${id}`);
        const data = response.data;
        if (data) {
          setAdInfo(data?.ads);
          setIsDataLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsDataLoading(false);
      }
    }
    getData();
  }, [id]);

  const [per_page, set_per_page] = useState();
  const [current_page, set_current_page] = useState();
  const [last_page, set_last_page] = useState();
  // const [FavAdsArray, setFavAdsArray] = useState([]);
  // const [isInFavorites, setIsInFavorites] = useState(false);
  const [ads, setAds] = useState([]);
  const { data, isLoading, get } = useDataFetcher();
  // const {
  //   data: favData,
  //   isLoading: FavIsLoading,
  //   get: getFav,
  // } = useDataFetcher();

  const createdDate = new Date(adInfo?.created_at);
  // check if there is no token dont shown somthing
  const userToken = localStorage.getItem("user_token");

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate =
    createdDate && createdDate.toLocaleString("en-US", options);

  useEffect(() => {
    adInfo &&
      get(
        `/api/deal/get_all_deal?page=${current_page}&category_id=${adInfo?.category_aqar.id}`
      );
  }, [adInfo, current_page]);

  useEffect(() => {
    if (data) {
      set_current_page(data.ads.current_page);
      set_per_page(data.ads.per_page);
      setAds(data.ads.data);
      set_last_page(data.ads.last_page);
    }
  }, [data]);

  const handlePageChange = (event, new_page) => {
    set_current_page(new_page);
  };

  // // this for check if user click fav or not
  // useEffect(() => {
  //   getFav(`/api/user/get_user_fav_ads`);
  // }, []);

  // useEffect(() => {
  //   if (favData) {
  //     console.log(fav)
  //     setFavAdsArray(favData?.ads?.data);
  //   }
  // }, []);

  // console.log(FavAdsArray);
  // useEffect(() => {
  //   setIsInFavorites(FavAdsArray?.some((favAd) => favAd?.id === adInfo?.id));
  // }, [FavAdsArray]);

  // useEffect(() => {

  // }, [FavAdsArray, adInfo]);

  const TimechangeTheNewAds = 48;
  const [isNewHome, setIsNewHome] = useState(false);
  const TimeNew = new Date();
  TimeNew.setHours(TimeNew.getHours() - TimechangeTheNewAds);

  useEffect(() => {
    if (adInfo) {
      const adCreatedAt = new Date(adInfo?.created_at).getTime();
      setIsNewHome(adCreatedAt > TimeNew.getTime());
    }
  }, [adInfo]);
  // console.log(isNewHome);

  // const isNewHome = localStorage.getItem("isNewHome") === "true";
  const [isListOpen, setListOpen] = useState(false);
  const listRef = useRef(null);
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [copied, setCopied] = useState(false);

  const icons = [
    {
      icon: <FavoriteIcons />,
      number: 1,
    },
    {
      icon: <TwitterIcon />,
      number: 2,
    },
    {
      icon: <LinkIcon />,
      number: 3,
    },
  ];

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".list-container") &&
      !event.target.classList.contains("share-button")
    ) {
      setListOpen(false);
    }
  };
  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  // console.log(userToken);
  return isDataLoading ? (
    <LoaderHome />
  ) : (
    <>
      {/* this section for md and above screens  */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Container maxWidth="lg">
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", md: "2.25rem" },
              }}
            >
              {adInfo?.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", marginY: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                border: "1px solid #cdddd8",
                borderRadius: "25px",
                padding: "0.2rem 0.5rem",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                {t("details_page.ad_num")}:
              </Typography>{" "}
              <Typography sx={{ marginX: "0.5rem", fontSize: "12px" }}>
                {adInfo?.ref_number}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                border: "1px solid #cdddd8",
                borderRadius: "25px",
                padding: "0.2rem 0.5rem",
                marginX: "0.3rem",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                {t("details_page.ad_date")}:
              </Typography>
              <Typography sx={{ marginX: "0.5rem", fontSize: "12px" }}>
                {formattedDate}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <StarIcon
                  sx={{
                    color: "var(--green-color)",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />

                {adInfo?.user_rate?.toFixed(2)}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: "var(--green-color)",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />
                {adInfo?.city} {adInfo?.neighborhood} {adInfo?.road}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <CropOriginalIcon
                  sx={{
                    color: "var(--green-color)",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />
                {t("details_page.unit_area")} {adInfo?.space}
              </Typography>
              {/* <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <GroupIcon
                  sx={{
                    color: "var(--green-color)",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />
                مخصص ل عوائل و عزاب
              </Typography> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <FavoriteIcons
                  adInfo={adInfo}
                  // isInFavorites={isInFavorites}
                ></FavoriteIcons>
                {t("details_page.fav_button")}
              </Box>
              <Button
                sx={{
                  color: "inherit",
                  marginX: "0.3rem",
                  position: "relative",
                  padding: "0",
                }}
                onClick={() => setListOpen(!isListOpen)}
              >
                <IosShareIcon sx={{ marginLeft: "3px" }} />
                {t("details_page.share_button")}
                {isListOpen && (
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
              </Button>
            </Box>
          </Box>
          {/* <ImagesTest /> */}
          <DetailsImages adInfo={adInfo} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2.25rem" },
                }}
              >
                {t("details_page.details_title")}
              </Typography>
              <Typography sx={{ fontSize: { xs: "15px", md: "18px" } }}>
                {adInfo?.description}
              </Typography>
              {isNewHome && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "23px 40px",
                    backgroundColor: "#eee",
                    borderRadius: "20px",
                    marginY: "2rem",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "red",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      جديد
                    </Typography>
                    <Typography sx={{ fontSize: "18px" }}>
                      عقار مضاف حديثاً
                    </Typography>
                  </Box>
                  <Box sx={{ alignItems: "center", display: "flex" }}>
                    <StarIcon
                      sx={{ color: "#009fff", width: "3rem", height: "3rem" }}
                    />
                  </Box>
                </Box>
              )}
              <DetailsTabs adInfo={adInfo} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailsCard adInfo={adInfo} />
            </Grid>
          </Grid>

          {/* similar ads */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginTop: "2rem",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              {t("details_page.similer_sec_title")}
            </Typography>
            <Box>
              {ads.map((ad, i) => (
                <SpecialAds key={ad.id} ad={ad} />
              ))}
            </Box>
            {isLoading ? (
              ""
            ) : (
              <PaginationAds
                handlePageChange={handlePageChange}
                current_page={current_page}
                per_page={per_page}
                last_page={last_page}
              />
            )}
            {/* {adInfo.video && (
              <video
                id="videoElement"
                src={` https://www.dashboard.aqartik.com/assets/images/ads/video/${adInfo.video.name}`}
                controls
                style={{ width: "500px", height: "300px" }}
              ></video>
            )} */}
          </Box>
        </Container>
      </Box>
      {/* {adInfo.video && (
        <video
          src={` https://www.dashboard.aqartik.com/assets/images/ads/video/${adInfo.video.name}`}
          controls
          style={{ width: "500px", height: "300px" }}
        ></video>
      )} */}

      {/* this section page for xs screens */}
      <DetailsXsScreens adInfo={adInfo} />
      {/* this for price */}
    </>
  );
};
// lang === "ar" ? "ar_name" : "en_name"
export default Details;
