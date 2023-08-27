import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
// import HomeSlider from "../components/Filter/HomeSlider";
import MapMark from "../components/MapFolder/MapMark";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import MapFilter from "../components/MapFolder/MapFilter";
import { useTheme } from "@mui/material/styles";
import { AccordinFilters } from "../components";
import styles from "../styles/map.module.css";
import { Order, List } from "../assets";
import SpecialAds from "../components/Filter/SpecialAds";
import AdsList from "../components/MapFolder/AdsList";
import AdsListSmall from "../components/MapFolder/AdsListSmall";
import useDataFetcher from "../api/useDataFetcher ";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const Mappage = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data, isLoading, error, get, post } = useDataFetcher();
  const [mapData, setMapData] = useState([]);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState();
  const [FilterProps, setFilterProps] = useState();

  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [prices, setPrices] = useState();

  const state = useLocation().state;
  useEffect(() => {
    // Define the base API endpoint
    let apiUrl = `api/deal/get_all_deal?&PerPage=${50}&`;

    // Check if state values exist and add them to the API URL if they do
    if (state?.lat) {
      apiUrl += `lat=${state.lat}&`;
    }
    if (state?.lng) {
      apiUrl += `lng=${state.lng}&`;
    }
    if (state?.zoom) {
      apiUrl += `zoom=${state.zoom}&`;
    }
    if (state?.category_id) {
      apiUrl += `category_id=${state.category_id}&`;
    }
    if (state?.min_price) {
      apiUrl += `min_price=${state.min_price}&`;
    }
    if (state?.max_price) {
      apiUrl += `max_price=${state.max_price}&`;
    }

    // Remove the trailing '&' if it exists
    if (apiUrl.endsWith("&")) {
      apiUrl = apiUrl.slice(0, -1);
    }

    // Make the API call with the constructed URL
    get(apiUrl);
  }, [state]);
  useEffect(() => {
    if (data) {
      setMapData(data.ads.data);
      setPrices(data.price_range);
    }
  }, [data]);
  const getFilterDataInXs = () => {
    const queryParams = [];

    if (FilterProps?.category_id) {
      queryParams.push(`category_id=${FilterProps.category_id}`);
    }

    if (FilterProps?.max_price) {
      queryParams.push(`max_price=${FilterProps.max_price}`);
    }

    if (FilterProps?.title) {
      queryParams.push(`title=${FilterProps.title}`);
    }

    if (FilterProps?.neighborhood) {
      queryParams.push(`neighborhood=${FilterProps.neighborhood}`);
    }

    if (FilterProps?.city) {
      queryParams.push(`city=${FilterProps.city}`);
    }

    if (FilterProps?.space) {
      queryParams.push(`space=${FilterProps.space}`);
    }

    if (FilterProps?.interface_id) {
      queryParams.push(`interface_id=${FilterProps.interface_id}`);
    }

    if (FilterProps?.min_price) {
      queryParams.push(`min_price=${FilterProps.min_price}`);
    }
    if (FilterProps?.BoolFeaturea) {
      queryParams.push(`BoolFeaturea=${FilterProps.BoolFeaturea}`);
    }

    const queryString = queryParams.join("&");

    // Add the queryString to the URL
    get(`api/deal/get_all_deal?${queryString}&PerPage=${50}`);
    setShowFilter(false);
  };
  const deleteFilterinXsDataInXs = () => {
    get(`api/deal/get_all_deal?&PerPage=${50}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenFilter = () => {
    setShowFilter(true);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const handleOpenMenu = () => {
    setShowMenu(true);
  };
  const handleCloseMenu = () => {
    setShowMenu(false);
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: "200px 0px 0px",
          zIndex: "9",
          height: { xs: "100vh", md: "calc(-200px + 100vh)" },
          width: "100%",
          marginTop: { xs: "0rem", md: "2rem" },

          [theme.breakpoints.only("xs")]: {
            top: "0",
          },
          [theme.breakpoints.only("sm")]: {
            top: "0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
            width: "100%",
            flex: "1 1 0%",
          }}
        >
          <Box
            sx={{
              height: "100%",
              overflow: "hidden auto",
              width: " 517px",
              backgroundColor: " rgb(250, 250, 250)",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                height: "107px",
                width: "100%",
                backgroundColor: "white",
                paddingLeft: "22px",
                paddingRight: "22px",
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 6px",
              }}
            >
              <Button
                sx={{
                  color: "rgb(255, 255, 255)",
                  paddingRight: "24px",
                  paddingLeft: "24px",
                  paddingY: "9px",
                  fontWeight: "700",
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: "26px",
                  backgroundColor: "var(--green-color)",
                  "&:hover": {
                    backgroundColor: "var(--green-color)",
                    color: "white",
                  },
                }}
                onClick={handleOpenModal}
              >
                <Divider />
                <img
                  src={Order}
                  alt="order"
                  style={{ marginLeft: "8px", width: "17px" }}
                />
                {lang === "ar" ? "تصفية" : "filter"}
              </Button>
              <Typography sx={{ fontWeight: "700", fontSize: "17px" }}>
                {mapData.length} {lang === "ar" ? "إعلان" : "ads"}{" "}
              </Typography>
            </Box>
            <AdsList
              mapData={mapData}
              isBoxVisible={isBoxVisible}
              setBoxVisible={setBoxVisible}
              selectedAd={selectedAd}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "azure",
              position: "relative",
              width: { xs: "100%", md: "70%" },
              height: {
                xs: "100vh !important",
                md: "calc(-200px + 100vh) !important",
              },
            }}
          >
            <Link
              to="/"
              sx={{
                position: "absolute",
                left: "1rem",
                top: "10px",
                zIndex: "10000",
                boxShadow: {
                  xs: "none",
                  md: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
                },
              }}
            >
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{
                  color: "rgba(0, 0, 0, 0.54)",
                  backgroundColor: "white",
                  width: "35px",
                  height: "35px",
                  top: "4px",
                  zIndex: "45",
                  "&:hover": {
                    color: "rgba(0, 0, 0, 0.54)",
                    backgroundColor: "white",
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Link>

            <Box
              sx={{
                width: "100%",
                height: "100%",
                left: "0px",
                top: "0px",
                margin: "0px",
                padding: "0px",
                position: "absolute",
                overflow: " hidden",
                zIndex: "33",
              }}
            >
              <MapMark
                mapData={mapData}
                state={state}
                isBoxVisible={isBoxVisible}
                setBoxVisible={setBoxVisible}
                setSelectedAd={setSelectedAd}
              />
            </Box>
            <Button
              sx={{
                width: "160px",
                top: { xs: "90px", md: "50px" },
                height: "35px",
                lineHeight: "35px",
                minWidth: "160px",
                backgroundColor: "rgb(255, 255, 255)",
                position: "absolute",
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                right: "50%",
                transform: "translateX(50%)",
                fontSize: "13px",
                color: "rgb(90, 64, 155)",
                paddingRight: "5px",
                paddingLeft: "5px",
                paddingY: { xs: "5px", md: "24px" },
                textTransform: "none",
                color: "var(--green-color)",
                fontWeight: "bold",
                borderRadius: "24px",
                cursor: "pointer",
                zIndex: "1000",
                display: { xs: "flex", md: "flex" },
              }}
            >
              {lang === "ar" ? "اظهر المزيد من الوحدات" : "show more results"}
            </Button>
          </Box>
        </Box>
        {/* this Box only in xs */}
        <Box
          sx={{
            height: "40px",
            width: "190px",
            backgroundColor: "var(--green-color)",
            position: "fixed",
            top: "30px",
            right: "50%",
            transform: "translateX(50%)",
            borderRadius: "20px",
            zIndex: "998",
            overflow: "hidden",
            display: { xs: "flex", md: "none" },

            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              height: "40px",
              color: "rgb(255, 255, 255)",
              paddingRight: "20px",
              paddingLeft: "20px",
              gap: "10px",
              fontWeight: "700",
              fontSize: "15px",
            }}
            onClick={handleOpenFilter}
          >
            <img
              src={Order}
              alt="order"
              style={{ marginLeft: "8px", width: "17px", marginLeft: "8px" }}
            />
            {lang === "ar" ? "تصفية" : "filter"}
          </Button>
          <Box
            sx={{
              width: "1px",
              height: "31px",
              backgroundColor: "rgb(255, 255, 255)",
              margin: "auto",
            }}
          ></Box>
          <Button
            sx={{
              height: "40px",
              color: "rgb(255, 255, 255)",
              paddingRight: "20px",
              paddingLeft: "20px",
              fontWeight: "700",
              gap: "10px",
              fontSize: "15px",
            }}
            onClick={handleOpenMenu}
          >
            <img src={List} alt="list" style={{ marginLeft: "8px" }} />
            {lang === "ar" ? "قائمة" : "menu"}
          </Button>
        </Box>

        {/* this ads list swiper in xs  */}
        {/* <AdsListSmall /> */}
      </Box>
      {/* this box filter just in xs screens  */}
      {showFilter && (
        <Box
          className={`${styles.filter_box} ${
            showFilter ? styles.filter_box__visible : ""
          }`}
          sx={
            {
              // position: "fixed",
              // right: "0px",
              // left: "0px",
              // height: "100%",
              // width: "100%",
              // display: "flex",
              // zIndex: "999",
              // opacity: "1",
            }
          }
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
              position: "absolute",
              zIndex: "1",
              bottom: "0px",
            }}
          >
            <Box
              sx={{
                padding: "20px",
                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",
              }}
            >
              <CloseIcon
                sx={{
                  flex: "0 0 auto",
                  color: "rgba(0, 0, 0, 0.54)",
                  cursor: "pointer",
                }}
                onClick={handleCloseFilter}
              />
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography sx={{ marginLeft: "5px" }}>
                  {lang === "ar" ? "فلتر" : "filter"}
                </Typography>
                {/* <Typography
                  sx={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    backgroundColor: "rgb(5, 5, 54)",
                    fontWeight: "500",
                    fontSize: "15px",
                    color: "rgb(255, 255, 255)",
                    marginRight: "5px",
                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  0
                </Typography> */}
              </Box>
              <Button
                // to="/mappage"
                // state={{
                //   lat: "",
                //   lng: "",
                //   zoom: "",
                //   category_id: "",
                //   min_price: "",
                //   max_price: "",
                // }}
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "var(--green-color)",
                }}
                onClick={deleteFilterinXsDataInXs}
              >
                {lang === "ar" ? "مسح الكل" : "delete all"}
              </Button>
            </Box>
            <Typography
              sx={{
                fontSize: "15px",

                color: "rgb(120, 120, 131)",
                padding: "0px 20px 10px",
                marginTop: "20px",
              }}
            >
              {lang === "ar"
                ? "أضف فلتراً أو قم بإزالته ليتناسب مع ما تبحث عنه من أماكن للإقامة ضمن احتياجاتك."
                : "add filters or remove it as you need"}
            </Typography>
            <Box>
              <AccordinFilters
                prices={prices}
                FilterProps={FilterProps}
                setFilterProps={setFilterProps}
              />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "0px",
              height: "100px",
              display: "flex",
              zIndex: "1",
              justifyContent: "center",

              alignItems: "center",
              boxShadow: "rgb(206, 206, 215) 0px -1px 0px",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
              // padding: " 0px 20px",
            }}
          >
            <Button
              to="/mappage"
              // state={{
              //   lat: "",
              //   lng: "",
              //   zoom: "",
              //   title: FilterProps?.title,
              //   category_id: "",
              //   min_price: "",
              //   max_price: "",
              // }}
              sx={{
                backgroundColor: "var(--green-color)",
                height: "60px",
                width: "100%",
                borderRadius: "30px",
                fontSize: "14px",
                color: "white",
                margin: "0px 20px",
              }}
              onClick={getFilterDataInXs}
            >
              {/* <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                +100 {lang === "ar" ? "بيوت العطلات" : "vication houses"} •
              </Typography> */}
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginRight: "3px",
                  fontSize: "18px",
                }}
              >
                {lang === "ar" ? "أظهر النتائج" : "show results"}
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
      {/* this box show menu in xs  */}
      {showMenu && (
        <Box
          className={`${styles.filter_box} ${
            showMenu ? styles.filter_box__visible : ""
          }`}
          sx={
            {
              // position: "fixed",
              // right: "0px",
              // left: "0px",
              // height: "100%",
              // width: "100%",
              // display: "flex",
              // zIndex: "999",
              // opacity: "1",
            }
          }
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
              position: "absolute",
              zIndex: "1",
              bottom: "0px",
            }}
          >
            <Box
              sx={{
                height: "60px",
                backgroundColor: "white",
                borderBottom: "1px solid rgb(229, 229, 229)",
                display: "flex",

                justifyContent: "center",

                alignItems: "center",
              }}
            >
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "7px",
                  color: "var(--green-color)",
                  marginLeft: "12px",
                  cursor: "pointer",
                }}
                onClick={handleCloseMenu}
              />
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "var(--green-color)",
                }}
              >
                {lang === "ar"
                  ? "قائمة الوحدات على الخريطة"
                  : "ads menu on map"}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "calc(-60px + 100vh)",
                overflow: "auto",
                paddingTop: "16px",
                paddingX: "6px",
              }}
            >
              {mapData.map((ad, index) => (
                <>
                  <Box key={ad.id}>
                    <SpecialAds ad={ad}></SpecialAds>
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      <MapFilter
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        FilterProps={FilterProps}
        prices={prices}
        setFilterProps={setFilterProps}
      />
    </>
  );
};

export default Mappage;
