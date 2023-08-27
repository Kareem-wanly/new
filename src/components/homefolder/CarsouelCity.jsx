import React, { useRef, useEffect, useState } from "react";
import styles from "../../styles/CarsouelCity.module.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Link } from "@mui/material";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { cities } from "./cities";
import { Link } from "react-router-dom";
import useDataFetcher from "../../api/useDataFetcher ";

const CustomPrevButton = ({ onClick }) => {
  // Custom previous button component
  return (
    <button className={styles.custom_prev_button} onClick={() => onClick()}>
      <ChevronLeftIcon />
    </button>
  );
};

const CustomNextButton = ({ onClick }) => {
  // Custom next button component
  return (
    <button className={styles.custom_next_button} onClick={() => onClick()}>
      <ChevronRightIcon />
    </button>
  );
};

const CarsouelCity = () => {
  const { t, i18n } = useTranslation();
  const owlCarouselRef = useRef(null);
  const [carouselKey, setCarouselKey] = useState(0);
  const [itemsArray, setItemsArray] = useState(cities);

  const handlePrevClick = () => {
    if (owlCarouselRef.current) {
      owlCarouselRef.current.prev();
    }
    setItemsArray((prevItems) => {
      return prevItems;
    });
  };

  const handleNextClick = () => {
    if (owlCarouselRef.current) {
      owlCarouselRef.current.next();
    }
    setItemsArray((prevItems) => {
      return prevItems;
    });
  };
  const Responsive = {
    0: {
      items: 1,
      margin: 5,
      rtl: i18n.language === "ar",
    },
    768: {
      items: 2,
      margin: 10,
      rtl: i18n.language === "ar",
    },
    1024: {
      items: 3,
      margin: 20,
      rtl: i18n.language === "ar",
    },
  };
  const customNavText = [
    <CustomPrevButton onClick={handlePrevClick} />,
    <CustomNextButton onClick={handleNextClick} />,
  ];

  useEffect(() => {
    setCarouselKey((prevKey) => prevKey + 1);
  }, [itemsArray]);

  return (
    <div style={{ position: "relative" }}>
      <OwlCarousel
        ref={owlCarouselRef}
        key={carouselKey}
        // loop={true}
        rtl={true}
        responsive={Responsive}
        // autoplay={true}
        // autoplayTimeout={7000}
        autoplayHoverPause={true}
        dots={false}
        nav={false}
        navText={customNavText}
        className={styles.city_carsouel}
      >
        {itemsArray.map((city, index) => (
          <div className={styles.item} key={index}>
            {/* Render your item content here */}
            <Link
              to="/mappage"
              state={{
                lat: city.city_lang,
                lng: city.city_long,
                zoom: city.zoom,
              }}
            >
              <div className={styles.cityDiv}>
                <div className={styles.cityImg}>
                  <div className={styles.Imgbackgrounddiv}>
                    <img
                      src={`./cities/${city.img_url}`}
                      // alt={item.alt}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
                <div className={styles.cityImgTitleDiv}>
                  <Typography
                    variant="h5"
                    className={styles.ImgHeading}
                    sx={{ fontWeight: "600 !important" }}
                  >
                    {i18n.language === "ar" ? city.name_ar : city.name_en}
                  </Typography>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
      <CustomPrevButton onClick={handlePrevClick} />
      <CustomNextButton onClick={handleNextClick} />
    </div>
  );
};

export default CarsouelCity;
