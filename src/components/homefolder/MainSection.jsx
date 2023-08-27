import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper";
import { boat, exciting_experience, house } from "../../assets";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";
import styled from "styled-components";
import SwiperCore from "swiper";
import { AnimatePresence, motion } from "framer-motion";

SwiperCore.use([Pagination]);

const MainSection = ({ setDataLoading }) => {
  const { data, isLoading, error, get, post } = useDataFetcher();
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    setDataLoading(true);
    const storedData = localStorage.getItem("bannersData");
    // console.log(storedData);
    if (storedData) {
      setBannersData(JSON.parse(storedData));
    } else {
      get("/api/settings/banners/all");
    }
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (data && data.banners) {
      localStorage.setItem("bannersData", JSON.stringify(data.banners));
    }
  }, [data]);

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const csstransitionRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("bannersData");
    if (storedData) {
      setBannersData(JSON.parse(storedData));
    } else {
    }
  }, []);

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // const [prevLanguage, setPrevLanguage] = useState(i18n.language);
  // const [swiperKey, setSwiperKey] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const swiperRef = useRef(null);

  useEffect(() => {
    // setSwiperKey((prev) => prev + 1);
    setActiveSlideIndex(0);
    swiperRef.current.swiper.slideTo(0);
    // setPrevLanguage(i18n.language); // Update the previous language
  }, [i18n]);

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex);
    // console.log(swiper.realIndex);
  };
  const handlePaginationDotClick = (index) => {
    swiperRef.current.swiper.slideTo(index);
    setActiveSlideIndex(index);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        key={i18n.language}
        className="mySwiper"
        ref={swiperRef}
        effect={"Cube"}
        autoplay={{
          delay: 8000,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        sx={{ position: "relative", marginTop: "11rem" }}
      >
        {bannersData &&
          bannersData.map((banner, index) => {
            return (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    "& img": {
                      width: "100%",
                      height: "500px !important",
                      objectFit: "cover",
                      position: "relative",
                    },
                  }}
                >
                  <img
                    src={`https://www.dashboard.aqartik.com/assets/images/banners/${banner.image.name}`}
                    alt={banner.ar_title}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
                <AnimatePresence>
                  {activeSlideIndex === index && (
                    <motion.div key={index} classNames="slide">
                      <Box
                        sx={{
                          position: "absolute",
                          // top: "5rem",
                          top: { xs: "8rem", md: "8rem" },
                          textAlign: {
                            xs: " center",
                            md: lang === "ar" ? "right" : "left",
                          },
                          width: { xs: "100%", md: "50%" },

                          right: { md: lang === "ar" ? "5rem" : "" },
                          left: { md: lang === "ar" ? "" : "3rem" },

                          zIndex: "1000",
                          color: "white",
                        }}
                      >
                        <Box>
                          <motion.h3
                            style={{
                              marginBottom: "1rem",
                              fontSize: "30px",
                              fontWeight: "bold",
                            }}
                            initial={
                              !isXsScreen && { x: lang === "ar" ? 100 : -100 }
                            }
                            animate={
                              !isXsScreen && {
                                x: 0,
                                transition: {
                                  delay: 0.3,
                                  duration: 0.3,
                                  type: "spring",
                                },
                              }
                            }
                            exit={
                              !isXsScreen && { x: lang === "ar" ? -100 : 100 }
                            }
                          >
                            {lang === "ar" ? banner.ar_title : banner.en_title}
                          </motion.h3>
                        </Box>
                        <motion.p
                          style={{
                            width: { xs: "50%", md: "28rem" },
                            fontSize: { xs: "1rem", md: "16px" },
                            marginX: { xs: "auto", md: "0rem" },
                          }}
                          initial={
                            !isXsScreen && { x: lang === "ar" ? 150 : -150 }
                          }
                          animate={
                            !isXsScreen && {
                              x: 0,
                              transition: {
                                delay: 0.3,
                                duration: 0.5,
                                type: "spring",
                              },
                            }
                          }
                          exit={
                            !isXsScreen && { x: lang === "ar" ? -150 : 150 }
                          }
                        >
                          {lang === "ar"
                            ? banner.ar_description
                            : banner.en_description}
                        </motion.p>
                        <motion.div
                          initial={
                            !isXsScreen && { x: lang === "ar" ? 200 : -200 }
                          }
                          animate={
                            !isXsScreen && {
                              x: 0,
                              transition: {
                                delay: 0.3,
                                duration: 0.7,
                                type: "spring",
                              },
                            }
                          }
                          exit={
                            !isXsScreen && { x: lang === "ar" ? -200 : 200 }
                          }
                        >
                          <Button
                            variant="contained"
                            href={banner.button_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            component="a"
                            sx={{
                              color: "rgb(255, 255, 255)",
                              border: "2px solid white",
                              minWidth: "250px",
                              fontSize: "18px",
                              marginTop: "48px",
                              borderRadius: "24px",

                              padding: "0.3rem 0.5rem",
                              backgroundColor: "transparent",
                              "&:hover": {
                                backgroundColor: "white",
                                color: "var( --green-color)",
                              },
                            }}
                          >
                            {lang === "ar"
                              ? banner.button_text_ar
                              : banner.button_text_en}
                          </Button>
                        </motion.div>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Box
        className="swiper-pagination"
        sx={{
          textAlign: "center",
          marginTop: "1rem",
          position: "absolute",
          zIndex: 2,
          // right: lang === "en" ? { xs: "50%", md: "87%" } : undefined,
          left:
            lang === "ar" ? { xs: "50%", md: "91%" } : { xs: "50%", md: "7%" },
          bottom: { xs: "4rem", md: "4rem" },
          transform: { xs: "translate(-50%)" },
        }}
      >
        {/* Render pagination dots */}
        {bannersData &&
          bannersData.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-block",
                width: activeSlideIndex === index ? "24px" : "9px",
                height: "9px",
                marginLeft: "4px",
                borderRadius: activeSlideIndex === index ? "5px" : "50%",
                backgroundColor:
                  activeSlideIndex === index ? "rgb(253, 205, 5)" : "white",
                mx: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => handlePaginationDotClick(index)}
            />
          ))}
      </Box>
    </Box>
  );
};

export default MainSection;
