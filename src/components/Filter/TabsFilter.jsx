import React, { useEffect, useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
} from "@mui/material";

import FavoriteIcons from "./FavoriteIcons";

import SpecialAds from "./SpecialAds";
import CheckIcon from "@mui/icons-material/Check";
import NorthIcon from "@mui/icons-material/North";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import PaginationAds from "./PaginationAds";
import SkeleltonSpeacialAds from "../Loading/SkeleltonSpeacialAds";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "react-i18next";
import { Order, Order2 } from "../../assets";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/map.module.css";

import "./tabs.module.css";

import useDataFetcher from "../../api/useDataFetcher ";
import AccordinFilters from "./AccordinFilters";

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
const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const TabsFilter = ({
  data,
  userLocation,
  setFilterProps,
  FilterProps,
  isLoading,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isListOrderOpen, setListOrderOpen] = React.useState(false);
  const [isBoxShown, setBoxShown] = React.useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);
  const {
    data: dataFilter,
    isLoading: isLoadinFilter,
    error: errorData,
    get: getDataFilter,
  } = useDataFetcher();

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // const { data, isLoading, get } = useDataFetcher();
  // const [current_page, set_current_page] = useState();
  // const [pre_page, set_per_page] = useState();

  // useEffect(() => {
  //   get("/api/ads/get_all_ads");
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     set_current_page(data?.ads?.current_page);
  //     set_per_page(data?.ads?.per_page);
  //   }
  // }, [data]);

  // console.log(current_page, pre_page);

  const tabData = [
    { label: t("filtersTab.default_btn"), content: "Content 1" },
    { label: t("filtersTab.Closest_btn"), content: "Content 2" },
    { label: t("filtersTab.top_rated"), content: "Content 3" },
    { label: t("filtersTab.top_viewings"), content: "Content 4" },
    { label: t("filtersTab.lowest_price"), content: "Content 5" },
    { label: t("filtersTab.highest_price"), content: "Content 6" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleOrderList = () => {
    setListOrderOpen(!isListOrderOpen);
  };
  const toggleBox = () => {
    setBoxShown(!isBoxShown);
  };
  const handleOpenFilter = () => {
    setShowFilter(true);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const deleteFilterinXsDataInXs = () => {
    setShowFilter(false);
  };
  // const getFilterDataInXs = () => {
  //     const queryParams = [];

  //     if (FilterProps?.category_id) {
  //       queryParams.push(`category_id=${FilterProps.category_id}`);
  //     }

  //     if (FilterProps?.max_price) {
  //       queryParams.push(`max_price=${FilterProps.max_price}`);
  //     }

  //     if (FilterProps?.title) {
  //       queryParams.push(`title=${FilterProps.title}`);
  //     }

  //     if (FilterProps?.neighborhood) {
  //       queryParams.push(`neighborhood=${FilterProps.neighborhood}`);
  //     }

  //     if (FilterProps?.city) {
  //       queryParams.push(`city=${FilterProps.city}`);
  //     }

  //     if (FilterProps?.space) {
  //       queryParams.push(`space=${FilterProps.space}`);
  //     }

  //     if (FilterProps?.interface_id) {
  //       queryParams.push(`interface_id=${FilterProps.interface_id}`);
  //     }

  //     if (FilterProps?.min_price) {
  //       queryParams.push(`min_price=${FilterProps.min_price}`);
  //     }

  //     const queryString = queryParams.join("&");

  //     // Add the queryString to the URL
  //     getDataFilter(`api/ads/get_all_ads?${queryString}`);
  //     setShowFilter(false);
  //   };
  const commonButtonStyles = {
    borderRadius: "26px",
    padding: "13px 22px",
    fontSize: "14px",
    position: "relative",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    "&:before": {
      content: '""',
      display: "block",
      width: "4px",
      height: "4px",
      backgroundColor: "rgba(0, 0, 0, 0.16)",
      borderRadius: "50%",
      position: "absolute",
      right: "2px",
      top: "50%",
      transform: "translateX(50%)",
    },
  };
  const firstButtonStyles = {
    "&:before": {
      content: "none",
    },
  };
  return (
    <>
      <div
        style={{ position: "relative" }}
        onClick={() => {
          if (isBoxShown) {
            toggleBox();
          }
        }}
      >
        {isBoxShown && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
            }}
          />
        )}

        {!isMdScreen && (
          <Box
            sx={{
              padding: "4px",
              border: "1px solid rgba(121, 141, 174, 0.16)",
              // justifyContent: "center",
              display: "flex",
              borderRadius: "30px",
              // width: "80%",
              width: "100%",
              justifyContent: "center",
              // maxWidth: "47rem",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              className="custom-tabs"
              sx={{
                width: "100%",
                display: "flex",

                // backgroundColor: "red",
                justifyContent: "space-around ",
                "& .MuiTabs-flexContainer": {
                  width: "100%",
                  justifyContent: "space-around !important",
                  // backgroundColor:"red"
                },
                "& .custom-tabs .css-heg063-MuiTabs-flexContainer ": {
                  width: "100%",
                  justifyContent: "space-around !important",
                },
                "& .css-heg063-MuiTabs-flexContainer": {
                  width: "100%",
                  justifyContent: "space-around ",

                  // backgroundColor: "blue",
                },
                "& .css-k008qs": {
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                },

                justifyContent: "space-around !important",
                "& .css-heg063-MuiTabs-flexContainer": {
                  justifyContent: "space-around !important",
                },

                "& .MuiTabs-indicator": {
                  display: "none",
                },
                padding: "4px",

                borderRadius: "30px",
              }}
            >
              <Button
                sx={{
                  ...commonButtonStyles,
                  ...firstButtonStyles,
                  backgroundColor:
                    !FilterProps.lat &
                    !FilterProps.lng &
                    !FilterProps.topPrice &
                    !FilterProps.minPrice &
                    !FilterProps.topRate &
                    !FilterProps.topView
                      ? "var(--green-color)"
                      : "white",
                  color:
                    !FilterProps.lat &
                    !FilterProps.lng &
                    !FilterProps.topPrice &
                    !FilterProps.minPrice &
                    !FilterProps.topRate &
                    !FilterProps.topView
                      ? "white"
                      : "black",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.default_btn")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.lat
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.lat ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.lat
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.lat ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    lat: userLocation?.latitude,
                    lng: userLocation?.longitude,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.Closest_btn")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.topView
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.topView ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.topView
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.topView ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: true,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.top_viewings")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.topRate
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.topRate ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.topRate
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.topRate ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topRate: true,
                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                  }))
                }
              >
                {t("filtersTab.top_rated")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.topPrice
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.topPrice ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.topPrice
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.topPrice ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topPrice: true,
                    topView: null,
                    lat: null,
                    lng: null,

                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {" "}
                {t("filtersTab.highest_price")}
              </Button>
              <Button
                sx={{
                  ...commonButtonStyles,
                  backgroundColor: FilterProps.minPrice
                    ? "var(--green-color)"
                    : "white",
                  color: FilterProps.minPrice ? "white" : "black",
                  "&:hover": {
                    backgroundColor: FilterProps.minPrice
                      ? "var(--green-color)"
                      : "white",
                    color: FilterProps.minPrice ? "white" : "black",
                  },
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    minPrice: true,
                    topPrice: null,
                    topView: null,
                    lat: null,
                    lng: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.lowest_price")}
              </Button>
            </Tabs>
          </Box>
        )}
        {isMdScreen && isBoxShown && (
          <Box
            sx={{
              position: "fixed",
              top: "10rem",
              left: "20px",
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 3px",
              width: "18rem",
              maxWidth: "317px",
              borderRadius: "24px",
              zIndex: "220000000",
              border: "1px solid rgb(90, 64, 155)",
              padding: "1rem",
            }}
          >
            <Typography variant="h6">
              {lang === "ar" ? "رتب أماكن الاقامة حسب" : "order places"}
            </Typography>

            <ul
              style={{
                listStyle: "none",
                padding: "1rem",
                fontFamily: "Tajawal,Arial,sans-serif",
              }}
            >
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.default_btn")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: true,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.top_viewings")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                    topPrice: null,
                    minPrice: null,
                    topRate: null,
                    topView: null,
                  }))
                }
              >
                {t("filtersTab.Closest_btn")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: true,
                    minPrice: null,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.highest_price")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: true,
                    topRate: null,
                  }))
                }
              >
                {t("filtersTab.lowest_price")}
              </li>
              <li
                style={{
                  padding: "0.5rem 0.3rem",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() =>
                  setFilterProps((prev) => ({
                    ...prev,

                    topRate: true,
                    topView: null,
                    lat: null,
                    lng: null,
                    topPrice: null,
                    minPrice: null,
                  }))
                }
              >
                {t("filtersTab.top_rated")}
              </li>
            </ul>
          </Box>
        )}
        {isMdScreen && (
          <>
            <Box
              sx={{
                height: "40px",
                width: "90px",
                backgroundColor: "var(--green-color)",
                borderRadius: "20px",
                display: "flex",
                margin: "auto",

                justifyContent: "space-between",

                alignItems: "center",
              }}
            >
              {/* <Button
                sx={{
                  height: "40px",
                  color: "rgb(255, 255, 255)",
                  paddinRight: "15px",
                  paddingLeft: "15px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "var(--green-color)",
                  },
                }}
                onClick={handleOpenFilter}
              >
                {" "}
                <img
                  src={Order}
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                />
                تصفية
              </Button>
              <Box
                sx={{
                  width: "1px",
                  height: "31px",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              ></Box> */}
              <Button
                onClick={() => {
                  toggleBox();
                  // toggleOrderList();
                }}
                sx={{
                  height: "40px",
                  color: "rgb(255, 255, 255)",
                  paddinRight: "15px",
                  paddingLeft: "15px",
                  borderRadius: "20px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "var(--green-color)",
                  },
                }}
              >
                <img
                  src={Order2}
                  style={{ marginRight: "5px", marginLeft: "5px" }}
                />
                {/* <NorthIcon />
              <NorthIcon
                sx={{ transform: "rotate(180deg)", marginRight: "1px" }}
              /> */}
                {lang === "ar" ? "ترتيب" : "order"}
              </Button>
            </Box>
            {/* // this Filter Box */}

            {/* {showFilter && (
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
                      <Typography sx={{ marginLeft: "5px" }}>فلتر</Typography>
                    </Box>
                    <Button
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "var(--green-color)",
                      }}
                      onClick={deleteFilterinXsDataInXs}
                    >
                      مسح الكل
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
                    أضف فلتراً أو قم بإزالته ليتناسب مع ما تبحث عنه من أماكن
                    للإقامة ضمن احتياجاتك.
                  </Typography>
                  <Box>
                    <AccordinFilters
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
                    // to="/mappage"
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
                    <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                      +100 بيوت العطلات •
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        marginRight: "3px",
                        fontSize: "18px",
                      }}
                    >
                      أظهر النتائج
                    </Typography>
                  </Button>
                </Box>
              </Box>
            )} */}
          </>
        )}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SkeleltonSpeacialAds key={index} />
          ))
        ) : data.length > 0 ? (
          data.map((ad, i) => <SpecialAds key={ad.id} ad={ad} />)
        ) : (
          <Box
            sx={{
              width: "90%",
              backgroundColor: "rgb(253, 236, 234)",
              display: "flex",
              padding: "6px 16px",
              margin: "auto",
              borderRadius: "4px",
              marginTop: "2rem",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "red", marginLeft: "10px" }} />
            <Box>
              <Typography sx={{ color: "red", marginBottom: "10px" }}>
                {lang === "ar"
                  ? " عذرا لايوجد نتائج"
                  : " sorry there is no result"}
              </Typography>
              <Typography sx={{ marginBottom: "1rem" }}>
                {lang === "ar"
                  ? " لا يوجد نتائج متاحة في الوقت الحالي، من فضلك حاول مرة أخري"
                  : "sorry , there is no result now ... please try again"}
              </Typography>
            </Box>
          </Box>
        )}
      </div>
    </>
  );
};

export default TabsFilter;
