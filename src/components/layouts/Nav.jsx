import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import AddIcon from "@mui/icons-material/Add";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logo, SearchFrameMoblie } from "../../assets";
import Searchframe from "../../assets/searchframe.png";
import { createTheme } from "@mui/material/styles";
import SmallNavLoginMenu from "./SmallNavLoginMenu";
import SideNavXsScreens from "./SideNavXsScreens";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./layout.module.css";
import useDataFetcher from "../../api/useDataFetcher ";
import GeneralContext from "../../context/generalContext";

// import Link from "next/link";
// import { Link } from "@mui/material";

import {
  SelectCity,
  SelectStreet,
  SelectRealEstate,
  Price,
  Notification,
  LanguageButton,
  LoginButton,
} from "../../components";

import SearchIcon from "@mui/icons-material/Search";
import { ChatsHeader } from "../chat/ChatsHeader";
import { Header } from "../../styledComponents/MainPageStyles";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const theme = createTheme();

export default function Nav({
  showMessages,
  setShowMessages,
  isUserSelected,
  setIsUserSelected,
  notificationData,
}) {
  const nav = useNavigate();

  const { generalData, website_status } = useContext(GeneralContext);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading, get } = useDataFetcher();
  // this section tp get filter api
  const {
    data: filterData,
    isLoading: filterIsLoading,
    get: getFilterData,
  } = useDataFetcher();

  const [cities, setCities] = useState([]);
  const [streets, setstreets] = useState([]);
  const [realEstates, setRealEstate] = useState([]);

  useEffect(() => {
    getFilterData(`api/settings/search_data`);
  }, []);

  useEffect(() => {
    if (filterData) {
      const allOption = { id: "all", ar_name: "الكل", en_name: "All" };
      const citiesArray = [
        lang === "ar" ? allOption.ar_name : allOption.en_name,
        ...filterData?.cities,
      ];
      const neighArray = [
        lang === "ar" ? allOption.ar_name : allOption.en_name,

        ...filterData?.neighborhoods,
      ];
      setCities(citiesArray);
      setSelectedCity(citiesArray[0]);
      setstreets(neighArray);
      setSelectedStreet(neighArray[0]);

      const categoriesArray = [
        allOption,
        ...Object.values(filterData?.categories),
      ];

      setRealEstate(categoriesArray);
      categoriesArray[0] && setSelectedRealEstate(categoriesArray[0]);
    }
  }, [filterData, lang]);

  const [navLinkss, setNavLinks] = useState([]);
  useEffect(() => {
    get(`api/settings/menu`);
  }, []);

  useEffect(() => {
    if (data) {
      setNavLinks(data.menu);
    }
  }, [data]);
  const navItems = navLinkss.map((item) => ({
    label: lang === "ar" ? item.title_ar : item.title_en,
    url: item.link,
  }));

  // const navItems = [
  //   { label: `${t("nav.navlinks.home_page")}`, url: "/" },
  //   { label: t("nav.navlinks.advertisements"), url: "/ads" },
  //   { label: t("nav.navlinks.special_advertisements"), url: "/userdashbored" },
  //   { label: t("nav.navlinks.about_us"), url: "/about" },
  //   { label: t("nav.navlinks.contact_us"), url: "/" },
  // ];

  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);

  const isLoggedIn = localStorage.getItem("user_token") ? true : false;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
    setIsDrawerOpen((prevState) => !prevState);
    setIsSideNavOpen((prevState) => !prevState);
  };

  const isDetailsPage = location.pathname.includes("/details");
  const isAboutPage = location.pathname === "/about";

  const isOfficesPage = location.pathname === "/offices";
  const { id } = useParams();
  const isOfficePage =
    location.pathname.startsWith("/offices/") && id ? true : false;

  // to detect language
  const language = i18n.language;

  // this for selectCities
  const [cityIsOpen, setCityIsOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);
  const [streetIsOpen, setStreetIsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const streetRef = useRef(null);
  const realEstateRef = useRef(null);
  const cityRef = useRef(null);
  const priceRef = useRef(null);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [isSelectRealEstateOpen, setIsSelectRealEstateOpen] = useState(false);
  // const [selectedRealEstateIndex, setSelectedRealEstateIndex] = useState(0);
  const [selectedRealEstate, setSelectedRealEstate] = useState(realEstates[0]);
  const [selectedPrice, setSelectedPrice] = useState([null, null]);

  const handleBoxClick = () => {
    setCityIsOpen(true);
  };
  const handleBoxStreetClick = () => {
    setStreetIsOpen(true);
  };
  const handleRealEstateSelect = () => {
    setIsSelectRealEstateOpen((prevState) => !prevState);
  };
  const handlePriceToggle = () => {
    setIsPriceOpen((prevValue) => !prevValue);
  };
  const handleOutsideClick = (event) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      isDrawerOpen
    ) {
      setMobileOpen(false);
      setIsDrawerOpen(false);
    }
    if (cityRef.current && !cityRef.current.contains(event.target)) {
      setCityIsOpen(false);
    }
    if (priceRef.current && !priceRef.current.contains(event.target)) {
      setIsPriceOpen(false);
    }
    if (streetRef.current && !streetRef.current.contains(event.target)) {
      setStreetIsOpen(false);
    }
    if (
      realEstateRef.current &&
      !realEstateRef.current.contains(event.target)
    ) {
      setIsSelectRealEstateOpen(false);
    }
    // event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleCitySelection = (city) => {
    setSelectedCity(city);
    setCityIsOpen(false);
  };
  const handleStreetSelection = (street) => {
    setSelectedStreet(street);
    setStreetIsOpen(false);
  };
  const handleCatgoreySelection = (realEstate) => {
    setSelectedRealEstate(realEstate);
    // setSelectedRealEstateIndex(index);
    setIsSelectRealEstateOpen(false);
  };
  // const handlePriceSelection = (price) => {
  //   setSelectedPrice(price);
  //   onPriceSelect(price); // Call the onPriceSelect callback with the selected price
  //   onClose(); // Close the Price component when a price is selected
  // };
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(selectedPrice);
  const handlePriceSelection = ([min, max]) => {
    setSelectedOptionPrice([min, max]);
    setSelectedPrice([min, max]);
    // onClose();
    // onPriceSelect([min, max]);
    // onClose(); // Close the Price component when a price is selected
  };
  let queryString = `/deals?`;

  // Check if the selectedCity is not "الكل" or "All"
  if (selectedCity && selectedCity !== "الكل" && selectedCity !== "All") {
    queryString += `city=${selectedCity}&`;
  }

  // Check if the selectedStreet is not "الكل" or "All"
  if (selectedStreet && selectedStreet !== "الكل" && selectedStreet !== "All") {
    queryString += `neighborhood=${selectedStreet}&`;
  }

  // Check if selectedRealEstate is not "all"
  if (selectedRealEstate && selectedRealEstate.id !== "all") {
    queryString += `category_id=${selectedRealEstate.id}&`;
  }

  // Check if selectedPrice is not the default [100, 1000]
  if (
    selectedPrice &&
    (selectedPrice[0] !== null || selectedPrice[1] !== null)
  ) {
    queryString += `min_price=${selectedPrice[0]}&max_price=${selectedPrice[1]}&`;
  }

  // Remove the trailing '&' if present
  if (queryString.endsWith("&")) {
    queryString = queryString.slice(0, -1);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",
          color: "black",
          boxShadow: isHome ? "none" : "0px 2px 4px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          zIndex: "65",
          left: "0",
          maxWidth: "1600px",
          margin: "auto",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: "space-between", ms: "space-around" },
            height: { xs: "80px", md: "108px" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            {isDrawerOpen ? (
              <CloseIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
            ) : (
              <MenuIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
            )}
          </IconButton>
          <Link to="/">
            <Box sx={{ width: "100px" }}>
              <img
                src={
                  lang === "ar" && generalData
                    ? `https://www.dashboard.aqartik.com/uploads/settings/${generalData?.style_logo_ar}`
                    : `https://www.dashboard.aqartik.com/uploads/settings/${generalData?.style_logo_ar}`
                }
                alt="logo"
                style={{ width: "100%" }}
              />
            </Box>
          </Link>
          <Box
            sx={{
              display: { xs: "none", md: "flex", marginLeft: { lg: "10%" } },
              marginRight: { md: "0px", lg: "-170px" },
            }}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.url}
                state={{
                  is_special: index === 2 ? 2 : 1,
                }}
                underline="none"
              >
                <Button
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    marginX: "0.5rem",
                    [theme.breakpoints.down("lg")]: {
                      fontSize: "1rem",
                      marginX: "0.5rem",
                    },
                    "&:hover": {
                      color: "var( --green-color)",
                      backgroundColor: "white",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
          {/* hide this Notifiation now */}
          <Box
            sx={{
              width: { md: "30%", lg: "37%" },
              justifyContent: lang === "ar" ? "left" : "right",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {isLoggedIn ? (
              <>
                <Button
                  sx={{ minWidth: "0", display: { xs: "none", md: "block" } }}
                >
                  <Notification notificationData={notificationData} />
                </Button>
                <Header $dir={lang}>
                  <div className="messages-container">
                    <ChatRoundedIcon
                      onClick={() => setShowMessages((prev) => !prev)}
                      className="message-icon"
                      sx={{ display: "flex", justifyContent: "center" }}
                    />
                    {showMessages && (
                      <ChatsHeader
                        showMessages={showMessages}
                        setShowMessages={setShowMessages}
                        setIsUserSelected={setIsUserSelected}
                      />
                    )}
                  </div>
                </Header>
                <Link
                  to="/addDeal"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Button
                    sx={{
                      border: "1px solid var(--green-color)",
                      color: "var(--green-color)",
                      borderRadius: "25px",
                      // marginX: {}"0.8rem",
                      minWidth: { xs: "0", md: "48px", lg: "8rem" },
                      height: { md: "3rem" },
                      padding: { xs: "5px", md: "6px 8px" },
                    }}
                  >
                    <AddIcon
                      sx={{
                        display: { xs: "block" },
                        marginX: { xs: "0px", md: "auto", lg: "5px" },
                        width: "20px",
                        height: "20px",
                        position: { lg: "absolute" },
                        right: { md: "2px" },
                      }}
                    />
                    <Typography
                      sx={{
                        width: "100%",
                        fontSize: "15px",
                        display: { xs: "none", lg: "block" },
                        position: "absolute",
                        right: "6px",
                      }}
                    >
                      {t("nav.buttons.add_advertisement")}
                    </Typography>
                  </Button>
                </Link>
                <LoginButton isLoggedIn={isLoggedIn} />
              </>
            ) : (
              <LoginButton isLoggedIn={isLoggedIn} />
            )}

            <LanguageButton />
          </Box>
        </Toolbar>
        {mobileOpen && <SideNavXsScreens ref={sideNavRef} />}
        {/* <SmallNavLoginMenu /> */}

        {/* this next section in nav for search in houses */}
        {!isDetailsPage && !isAboutPage && !isOfficesPage && !isOfficePage && (
          <Box
            className={styles.changeBackroundColor}
            sx={{
              // height: "100px",
              // backgroundColor: "transparent",
              paddingX: "1.3rem",
              marginBottom: "0.5rem",
              backgroundImage: {
                xs: `url(${SearchFrameMoblie})`,
                md: `url(${Searchframe})`,
              },
              backgroundSize: { xs: "100% 8rem", md: "100% 5.5rem" },
              // height: "14rem",
              backgroundRepeat: "no-repeat",
              backgroundPosition: { md: "center" },
              marginTop: { xs: "-1rem", md: "-2rem" },
              backgroundColor: {
                xs: "transparent",
                sm: "white",
                md: "transparent",
              },
              height: isHome ? { xs: "8rem", md: "14rem" } : "9rem",
              borderBottom: {
                xs: "none",
                md: "1px solid transparent",
              },
              borderBottomLeftRadius: { xs: "none", md: "0" },
              borderBottomRightRadius: { xs: "none", md: "0" },
            }}
          >
            <Box
              sx={{
                height: { xs: "74px", md: "90px" },
                border: "5px solid #f1f2f8",
                borderRadius: "100px",
                width: "90%",
                margin: "auto",
                marginTop: { xs: "2rem", md: "3rem" },
                position: "relative",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "5rem",
                  borderRadius: "100px",
                  border: "1px solid #babdd2",
                }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    width: "13rem",
                    maxWidth: "13rem",
                  }}
                  onClick={handleBoxClick}
                  ref={cityRef}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "1.2rem" }}
                  >
                    {t("subnav.city_filter")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var( --green-color)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedCity}
                  </Typography>
                  {cityIsOpen && (
                    <SelectCity
                      isOpen={cityIsOpen}
                      onClose={() => setCityIsOpen(false)}
                      onCitySelect={handleCitySelection}
                      selectedCity={selectedCity}
                      cities={cities}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    width: "13rem",
                    maxWidth: "13rem",
                  }}
                  onClick={handleBoxStreetClick}
                  ref={streetRef}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "1.2rem" }}
                  >
                    {t("subnav.neighborhood_filter")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var( --green-color)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedStreet}
                  </Typography>
                  {streetIsOpen && (
                    <SelectStreet
                      isOpen={streetIsOpen}
                      onClose={() => setStreetIsOpen(false)}
                      onStreetSelect={handleStreetSelection}
                      selectedStreet={selectedStreet} // Pass the selectedStreet prop here
                      streets={streets}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    width: "13rem",
                    maxWidth: "13rem",
                  }}
                  onClick={handleRealEstateSelect}
                  ref={realEstateRef}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "1.2rem" }}
                  >
                    {t("subnav.property_filter")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var( --green-color)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedRealEstate
                      ? lang === "ar"
                        ? selectedRealEstate.ar_name
                        : selectedRealEstate.en_name
                      : ""}
                  </Typography>
                  {isSelectRealEstateOpen && (
                    <SelectRealEstate
                      isOpen={isSelectRealEstateOpen}
                      onClose={() => setIsSelectRealEstateOpen(false)}
                      selectedRealEstate={selectedRealEstate}
                      onRealEstateSelect={(realEstate) =>
                        handleCatgoreySelection(realEstate)
                      }
                      realEstates={realEstates}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    width: "13rem",
                    maxWidth: "13rem",
                  }}
                  onClick={handlePriceToggle}
                  ref={priceRef}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "1.2rem" }}
                  >
                    {t("subnav.price")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var( --green-color)",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      direction: lang === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    {selectedPrice[0] !== null || selectedPrice[1] !== null
                      ? `${selectedPrice[0]} - ${selectedPrice[1]}`
                      : t("subnav.price_choose_option")}
                  </Typography>
                  {isPriceOpen && (
                    <Price
                      isOpen={isPriceOpen}
                      onClose={() => setIsPriceOpen(false)}
                      onPriceSelect={([min, max]) => {
                        setSelectedPrice([min, max]);
                        setIsPriceOpen(false);
                      }}
                      handlePriceSelection={handlePriceSelection}
                      selectedPrice={selectedPrice}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    background: "var( --green-color)",
                    color: "#fff",
                    height: "68px",
                    width: "68px",
                    borderRadius: "50%",
                    alignItems: "center",
                    display: "flex",
                    position: "absolute",
                    left: language === "ar" ? "6px" : "",
                    right: language === "ar" ? "" : "6px",
                  }}
                >
                  <Link
                    to={queryString}
                    style={{ display: "block", margin: "auto" }}
                  >
                    <SearchIcon
                      sx={{
                        fontSize: "2.5rem",
                        color: "#fff",
                      }}
                    />
                  </Link>
                </Box>
              </Box>
              {/* this box only on small screen */}
              <Box sx={{ display: { xs: "bock", lg: "none" }, height: "100%" }}>
                <Link
                  to="/deals"
                  state={{
                    is_special: 1,
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50px",
                      transition: "background-color 0.3s",
                      ":hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    }}
                  >
                    <Box
                      sx={{
                        margin: "0.5rem",
                        marginTop: { xs: "12px", md: "0.5rem" },
                      }}
                    >
                      <SearchIcon
                        sx={{
                          color: "var( --green-color)",
                          width: "2rem",
                          height: "2rem",
                        }}
                      />
                    </Box>
                    <Typography sx={{ color: "black", fontWeight: "bold" }}>
                      {lang === "ar" ? "ابحث عن بيوت العطلات" : "search houses"}
                    </Typography>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        )}
      </AppBar>
      {/* this for LoginNav in small screesns */}
    </Box>
  );
}
