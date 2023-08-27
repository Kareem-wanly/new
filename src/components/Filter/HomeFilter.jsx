import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Container, Button, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import TabsFilter from "./TabsFilter";
import AccordinFilters from "./AccordinFilters";
import PaginationAds from "./PaginationAds";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SpecialAds from "./SpecialAds";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SelectCity from "../selectnav/SelectCity";
import HomeType from "./HomeType";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Location } from "../../assets";
import useDataFetcher from "../../api/useDataFetcher ";
import { AdsClick } from "@mui/icons-material";
import SkeleltonSpeacialAds from "../Loading/SkeleltonSpeacialAds";
import { myAxios } from "../../api/myAxios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styles from "../../styles/map.module.css";
import { Order, Order2 } from "../../assets";

// Create a custom styled component
const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    maxWidth: "none !important",
    margin: 0,
    padding: theme.spacing(2),
  },
  maxWidth: "1280px !important",
  margin: "3rem auto",
}));

const HomeFilter = ({ userLocation }) => {
  const [per_page, set_per_page] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const linkParams = new URLSearchParams(location.search);
  // const [current_page, set_current_page] = useState();
  // const [ads, setAds] = useState([]);
  const [maplat, setLat] = useState();
  const [maplng, setLng] = useState();
  const [mapzoom, setZoom] = useState();
  const [last_page, set_last_page] = useState();
  // const { data, isLoading, get } = useDataFetcher();
  const [FilterProps, setFilterProps] = useState({ page: 1 });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [isListOrderOpen, setListOrderOpen] = React.useState(false);
  const [isBoxShown, setBoxShown] = React.useState(false);

  // this for filter or xs screens small screens
  const {
    data: filterData,
    isLoading: filterIsLoading,
    get: getFilterData,
  } = useDataFetcher();

  const [prices, setPrices] = useState();

  const [isSpecial, setIsSpecial] = useState(
    location.state?.is_special || false
  );

  useEffect(() => {
    setIsSpecial(location.state?.is_special || null);
    console.log(location.state?.is_special);
  }, [location.state]);

  console.log(isSpecial);

  const [cities, setCities] = useState([]);
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    getFilterData(`api/settings/search_data`);
  }, []);

  useEffect(() => {
    if (linkParams) {
      setFilterProps((prev) => ({
        ...prev,
        city: linkParams.get("city") || cities[0],
        neighborhood: linkParams.get("neighborhood"),
        category_id: linkParams.get("category_id"),
        min_price: linkParams.get("min_price"),
        max_price: linkParams.get("max_price"),
      }));
    }
  }, [location.search]);

  useEffect(() => {
    if (isSpecial === null) return;
    if (isSpecial !== 1) {
      setFilterProps((prev) => ({
        ...prev,
        is_special: true,
      }));
    } else {
      setFilterProps((prev) => ({
        ...prev,
        is_special: null,
      }));
    }
  }, [isSpecial]);

  useEffect(() => {
    if (filterData) {
      const allOption = { id: "all", ar_name: "الكل", en_name: "all" };
      const citiesArray = [
        lang === "ar" ? allOption.ar_name : allOption.en_name,
        ...filterData?.cities,
      ];
      setCities(citiesArray);
      filterData?.cities[0] && setSelectedCity(citiesArray[0]);
      const categoriesArray = [
        allOption,
        ...Object.values(filterData?.categories),
      ];
      // const categoriesArray = Object.values(filterData?.categories);
      setHomes(categoriesArray);
      categoriesArray[0].id && setSelectedHome(categoriesArray[0].id);
    }
  }, [filterData]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    myAxios
      .get(`/api/deal/get_all_deal`, { params: FilterProps })
      .then((res) => {
        // console.log(res)
        setData(res.data.ads.data);
        if (res.data) {
          setPrices(res.data.price_range);
          set_per_page(res.data.ads.per_page);
          // setAds(data.ads.data);
          set_last_page(res.data.ads.last_page);

          if (res.data.ads.data.length > 0) {
            const firstAd = data.ads.data[0];
            setLat(firstAd.lat);
            setLng(firstAd.lng);
            setZoom(firstAd.zoom);
          }
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      });
  }, [
    FilterProps.page,
    FilterProps?.topView,
    FilterProps?.topPrice,
    FilterProps?.minPrice,
    FilterProps?.topRate,
    FilterProps?.lat,
    FilterProps?.lng,
    FilterProps?.title,
    FilterProps?.space,
    FilterProps?.min_price,
    FilterProps?.max_price,
    FilterProps?.category_id,
    FilterProps?.city,
    FilterProps?.neighborhood,
    FilterProps?.interface_id,
    FilterProps?.BoolFeaturea,
    FilterProps?.is_special,
  ]);
  // useEffect(
  //   () => {
  //     console.log("dont play with me");
  //     const queryParams = new URLSearchParams({
  //       city: FilterProps?.city,
  //       neighborhood: FilterProps?.neighborhood,
  //       min_price: FilterProps?.min_price,
  //       max_price: FilterProps?.max_price,
  //       category_id: FilterProps?.category_id,
  //     });
  //     const newPath = `/ads?${queryParams.toString()}`;
  //     navigate(newPath);
  //   },
  //   [

  //     // FilterProps?.city,
  //     // FilterProps?.neighborhood,
  //     // FilterProps?.min_price,
  //     // FilterProps?.max_price,
  //     // FilterProps?.category_id,
  //   ]
  // );
  const renderFilterSection = (FilterProps) => {
    let counter = 0;
    if (FilterProps?.title) {
      counter++;
    }
    if (FilterProps?.space) {
      counter++;
    }
    if (FilterProps?.city) {
      counter++;
    }
    if (FilterProps?.min_price) {
      counter++;
    }
    if (FilterProps?.category_id) {
      counter++;
    }
    if (FilterProps?.neighborhood) {
      counter++;
    }
    if (FilterProps?.interface_id) {
      counter++;
    }
    if (FilterProps?.interface_id) {
      counter++;
    }
    if (FilterProps?.categoryBool) {
      counter++;
    }
    if (
      FilterProps?.topView ||
      FilterProps?.topPrice ||
      FilterProps?.minPrice ||
      FilterProps?.topRate ||
      FilterProps?.lat
    ) {
      counter++;
    }
    return counter;
  };
  const handleFiltertoDefault = () => {
    setFilterProps({ page: 1 });
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
    setFilterProps({ page: 1 });
    setShowFilter(false);
  };
  const getFilterDataInXs = () => {
    setShowFilter(false);
  };
  //dashboard.aqartik.com/api/ads/get_all_ads?lat=10000&lng=000&topView=true&topPrice=true&minPrice=true&topRate=true&title&space=10&city&neighborhood&interface_id&min_price&max_price&category_id
  // useEffect(() => {
  //   if (data) {
  //     // set_current_page(data.ads.current_page);
  //     setFilterProps((prev) => ({ ...prev, page: data.ads.current_page }));
  //     set_per_page(data.ads.per_page);
  //     setAds(data.ads.data);
  //     set_last_page(data.ads.last_page);

  //     if (data.ads.data.length > 0) {
  //       const firstAd = data.ads.data[0];
  //       setLat(firstAd.lat);
  //       setLng(firstAd.lng);
  //       setZoom(firstAd.zoom);
  //       console.log(firstAd.lng);
  //     }
  //   }
  // }, [data]);

  const handlePageChange = (event, new_page) => {
    // set_current_page(new_page);
    setFilterProps((prev) => ({ ...prev, page: new_page }));
  };

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showSearchBox, setShowSearchBox] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityIsOpen, setCityIsOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [homeIsOpen, setHomeIsOpen] = useState(false);
  const cityRef = useRef(null);
  const HomeRef = useRef(null);
  const handleCitySelection = (city) => {
    setSelectedCity(city);
    setCityIsOpen(false);
    if (city === "all" || city === "الكل") {
      setFilterProps((prev) => ({
        ...prev,

        city: null,
      }));
      return;
    }

    setFilterProps((prev) => ({
      ...prev,

      city: city,
    }));
  };
  const handleHomeSelection = (home) => {
    setSelectedHome(home);
    setHomeIsOpen(false);
    if (home === "all" || home === "الكل") {
      setFilterProps((prev) => ({
        ...prev,
        category_id: null,
      }));
      return;
    }
    setFilterProps((prev) => ({
      ...prev,
      category_id: home,
    }));
  };
  // useEffect(() => {
  //   setFilterProps((prev) => ({
  //     ...prev,
  //     city: selectedHome,
  //   }));
  // }, [selectedHome]);

  const handleBoxClick = () => {
    setCityIsOpen(true);
  };
  const handleBoxHomeClick = () => {
    setHomeIsOpen(true);
  };

  const handleToggleSearchBox = () => {
    setShowSearchBox((prevShow) => !prevShow);
  };
  const handleOutsideClick = (event) => {
    if (cityRef.current && !cityRef.current.contains(event.target)) {
      setCityIsOpen(false);
    }
    if (HomeRef.current && !HomeRef.current.contains(event.target)) {
      setHomeIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <StyledContainer
        sx={{ display: { xs: "none", md: "block" }, marginTop: "15rem" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <Box sx={{ margin: "3rem 0rem" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2.25rem" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {FilterProps?.city}
              </Typography>
              {/* <Typography>الكل من 19 يونيو - 20 يونيو (ليلة واحدة)</Typography> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "start", sm: "end" },
              marginTop: { xs: "-3rem", sm: "0" },
              marginBottom: { xs: "1rem", sm: "0rem" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                to="/mappage"
                state={{
                  lat: 24.7136,
                  lng: 46.6753,
                  zoom: 10,
                }}
                style={{
                  display: "flex",
                  color: "#fff",
                  backgroundColor: "var( --green-color)",
                  height: "48px",
                  borderRadius: "24px",
                  padding: "6px 12px",
                  fontWeight: "bold",
                  alignItems: "center",
                  fontFamily: " Tajawal,Arial,sans-serif",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#0d8d68",
                  },
                }}
              >
                <Box>
                  <LocationOnIcon />
                </Box>
                {t("advertisements_page.sec1.map_button")}
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex" }}>
                <FilterListIcon
                  sx={{
                    border: "1px solid black",
                    borderRadius: "50%",
                    padding: "0.2rem",
                    margin: "0 0.5rem",
                  }}
                />
                {t("advertisements_page.filter_sec.title")}
                <Typography> {renderFilterSection(FilterProps)}</Typography>
              </Box>
              <Typography sx={{ marginX: "0.5rem" }}>|</Typography>
              <Button
                sx={{
                  textDecoration: "none",
                  color: "var( --green-color)",
                  fontEeight: "normal",
                  fontSize: "inherit",
                }}
                onClick={handleFiltertoDefault}
              >
                {t("advertisements_page.filter_sec.delete_button")}
              </Button>
            </Box>
            <Box>
              <AccordinFilters
                prices={prices}
                setFilterProps={setFilterProps}
                FilterProps={FilterProps}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <TabsFilter
              data={data}
              setFilterProps={setFilterProps}
              userLocation={userLocation}
              FilterProps={FilterProps}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
        {/* <PaginationAds></PaginationAds> */}
      </StyledContainer>
      {/* // this Box for xs small screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box
          sx={{
            boxShadow: "none",
            height: showSearchBox ? "70px" : "270px",
            marginBottom: "20px",
            position: "sticky",
            top: "0px",
            zIndex: "99",
            backgroundColor: "rgb(255, 255, 255)",
            transition: "height 0.3s ease-in-out 0s",
            marginTop: "0rem",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              paddingRight: "13px",
              paddingLeft: "13px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
              height: "70px",
            }}
          >
            {showSearchBox ? (
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <ChevronRightIcon
                  onClick={handleToggleSearchBox}
                  sx={{
                    color: "var(--green-color)",
                    fontSize: "2.5rem",
                    cursor: "pointer",
                    transform: lang === "ar" ? "rotate(0)" : "rotate(-180deg)",
                  }}
                />
              </Link>
            ) : (
              <CloseIcon
                onClick={handleToggleSearchBox}
                sx={{
                  color: "gray",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              />
            )}

            {showSearchBox ? (
              <Box
                sx={{
                  flex: "1 1 0%",
                  borderRadius: "18px",
                  maxWidth: "calc(100% - 80px)",
                  marginLeft: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleToggleSearchBox}
              >
                <Box
                  sx={{
                    height: "35px",
                    border: "1px solid rgba(112, 112, 112, 0.4)",
                    backgroundColor: "rgb(247, 247, 247)",
                    borderRadius: "18px",
                    padding: "0px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: "1 1 0%",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: "var(--green-color)",
                        marginLeft: "5px",
                        fontSize: "20px",
                      }}
                    />
                    <Typography>{selectedCity}</Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography sx={{ fontWeight: "700" }}>
                {lang === "ar"
                  ? " عدل معلومات بحثك"
                  : "edit your search information"}
              </Typography>
            )}

            <Box
              sx={{
                backgroundColor: "var(--green-color)",
                height: "35px",
                width: "35px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to="/mappage"
                state={{
                  lat: 24.7136,
                  lng: 46.6753,
                  zoom: 10,
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <img src={Location} alt="location" /> */}
                <LocationOnIcon sx={{ color: "white", fontSize: "18px" }} />
              </Link>
            </Box>
          </Box>
          {!showSearchBox && (
            <Box sx={{ paddingX: "12px" }}>
              <Box
                sx={{
                  height: "148px",
                  border: "5px solid rgba(221, 223, 238, 0.4)",
                  borderRadius: "28px",
                  marginTop: "20px",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    border: "1px solid rgb(186, 189, 210)",
                    borderRadius: "23px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "rgb(255, 255, 255)",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    ref={cityRef}
                    sx={{
                      borderBottom: "1px solid rgb(186, 189, 210)",
                      width: "100%",
                      padding: "12px 16px",
                      cursor: "pointer",
                    }}
                    onClick={handleBoxClick}
                  >
                    <Typography
                      sx={{ color: "rgb(120, 120, 131)", fontSize: "13px" }}
                    >
                      {lang === "ar" ? "المدينة" : "city"}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {selectedCity}
                    </Typography>
                  </Box>

                  {cityIsOpen && (
                    <SelectCity
                      isOpen={cityIsOpen}
                      onClose={() => setCityIsOpen(false)}
                      onCitySelect={handleCitySelection}
                      selectedCity={selectedCity}
                      cities={cities}
                    />
                  )}

                  <Box
                    ref={HomeRef}
                    sx={{
                      width: "100%",
                      padding: "12px 16px",
                      cursor: "pointer",
                    }}
                    onClick={handleBoxHomeClick}
                  >
                    <Typography
                      sx={{ color: "rgb(120, 120, 131)", fontSize: "13px" }}
                    >
                      {lang === "ar" ? "نوع العقار" : "property type"}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      {lang === "ar"
                        ? homes?.find((item) => item.id === selectedHome)
                            .ar_name
                        : homes?.find((item) => item.id === selectedHome)
                            .en_name}
                    </Typography>
                    {homeIsOpen && (
                      <HomeType
                        isOpen={homeIsOpen}
                        onClose={() => setHomeIsOpen(false)}
                        onHomeSelect={handleHomeSelection}
                        selectedHome={selectedHome}
                        homes={homes}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "95%", margin: "auto" }}>
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
              }}
            >
              <ErrorOutlineIcon sx={{ color: "red", marginLeft: "10px" }} />
              <Box>
                <Typography sx={{ color: "red", marginBottom: "10px" }}>
                  {lang === "ar"
                    ? " عذرا لايوجد نتائج"
                    : " sorry there is no result"}
                </Typography>
                <Typography>
                  {lang === "ar"
                    ? " لا يوجد نتائج متاحة في الوقت الحالي، من فضلك حاول مرة أخري"
                    : "sorry , there is no result now ... please try again"}
                </Typography>
              </Box>
            </Box>
          )}

          {/* <PaginationAds /> */}
        </Box>
        <>
          <Box
            sx={{
              height: "40px",
              width: "172px",
              backgroundColor: "var(--green-color)",
              borderRadius: "20px",
              display: "flex",
              margin: "auto",
              justifyContent: "space-between",
              alignItems: "center",
              position: "fixed",
              bottom: "1rem",
              left: "50%",
              transform: "translate(-50% , -50%)",
            }}
          >
            <Button
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
              onClick={handleOpenFilter}
            >
              {" "}
              <img
                src={Order}
                style={{ marginLeft: "5px", marginRight: "5px" }}
              />
              {lang === "ar" ? "تصفية" : "filter"}
            </Button>
            <Box
              sx={{
                width: "1px",
                height: "31px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            ></Box>
            <Button
              onClick={() => {
                toggleBox();
                // toggleOrderList();
              }}
              sx={{
                height: "40px",
                color: "rgb(255, 255, 255)",
                paddinRight: "15px",
                borderRadius: "20px",
                paddingLeft: "15px",
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
                    FilterProps={FilterProps}
                    prices={prices}
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
              onClick={() => {
                toggleBox();
              }}
            >
              <Box>
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
              </Box>
            </div>
          )}
        </>
      </Box>

      {isLoading ? (
        ""
      ) : (
        <PaginationAds
          handlePageChange={handlePageChange}
          current_page={FilterProps.page}
          per_page={per_page}
          last_page={last_page}
        />
      )}
    </>
  );
};

export default HomeFilter;
