import React, { useEffect, useState } from "react";
import HomeSliderMap from "../MapFolder/HomeSliderMap";
import NorthIcon from "@mui/icons-material/North";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcons from "../Filter/FavoriteIcons";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Icons from "../Filter/Icons";
import { useTranslation } from "react-i18next";
const icons = [
  {
    icon: <TwitterIcon />,
    number: 2,
  },
  {
    icon: <LinkIcon />,
    number: 3,
  },
];

const AdsList = ({ mapData, isBoxVisible, setBoxVisible, selectedAd }) => {
  const navigate = useNavigate();
  const [selectedAdData, setSelectedAdData] = useState([]);
  const [selectedImages, setSelectedImages] = useState();

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleAdClick = (ad) => {
    navigate(`/details/${ad.id}`, { state: { ad } });
  };

  const handleBoxClose = ({ mapData }) => {
    setBoxVisible(false);
  };
  useEffect(() => {
    if (selectedAd != "null") {
      setSelectedAdData(mapData.filter((item) => item.id === selectedAd));
    }
  }, [selectedAd]);

  // useEffect(() => {
  //   if (!selectedAdData) {
  //     // setSelectedImages(selectedAdData[0]);
  //   } else {
  //     setSelectedImages(selectedAdData[0]);
  //   }
  // }, [selectedAdData]);

  return (
    <>
      {/* if click in some ads */}
      {isBoxVisible && (
        <Box
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            borderStyle: "solid",
            borderWidth: "1px 1px 1px 5px",
            borderImage: "none 100% / 1 / 0 stretch",
            borderColor:
              "rgba(14, 175, 130, 1) rgba(14, 175, 130, 1) rgba(14, 175, 130, 1) rgba(14, 175, 130, 1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: " 16px 23px 8px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "22px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  fontWeight: "700",
                }}
              >
                {selectedAdData[0]?.title}
              </Typography>
            </Box>
            <Box>
              <CloseIcon
                sx={{
                  color: "var(--green-color)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
                onClick={handleBoxClose}
              />
            </Box>
          </Box>
          <Box sx={{ paddingX: "23px" }}>
            {/* this is my ads  */}
            <Box
              sx={{
                position: "relative",
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              }}
            >
              <Link
                // href="#"
                sx={{
                  textDecoration: "none",
                  height: "196.5px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 6px",
                  overflow: "hidden",
                  position: "relative",
                  display: "block",
                  backgroundColor: "white",
                  padding: "8px 8px 8px 0px",
                  borderRadius: "16px",
                }}
                onClick={() => handleAdClick(selectedAdData[0])}
              >
                <Box
                  sx={{ position: "absolute", left: "10px", bottom: "18px" }}
                >
                  <FavoriteIcons />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: "13rem",
                        height: "11.5rem",
                      }}
                    >
                      {selectedAdData.length > 0 && (
                        <HomeSliderMap ad={selectedAdData[0]} />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ padding: "9px 12px" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                        marginBottom: "10px",
                        color: "rgb(5, 5, 54)",
                      }}
                    >
                      {selectedAdData[0]?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "rgb(141, 141, 163)",
                        marginBottom: "10px",
                      }}
                    >
                      {selectedAdData[0]?.city}
                      {""}
                      {selectedAdData[0]?.neighborhood}
                      {""}
                      {selectedAdData[0]?.road}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        marginX: "0.5rem",
                        color: "rgb(132, 132, 132)",
                        marginBottom: "10px",
                        marginRight: "-5px",
                      }}
                    >
                      {selectedAdData[0]?.QuantityAds &&
                        selectedAdData[0]?.QuantityAds.filter((feature) =>
                          Icons.some(
                            (icon) =>
                              icon.en_name === feature.quantity_feature.en_name
                          )
                        ).map((feature) => {
                          const matchingIcon = Icons.find(
                            (icon) =>
                              icon.en_name === feature.quantity_feature.en_name
                          );

                          if (matchingIcon) {
                            return (
                              <Box
                                key={feature.id}
                                sx={{ display: "flex", marginLeft: "px" }}
                              >
                                <Box>{matchingIcon.icon}</Box>
                                <Typography
                                  sx={{
                                    marginRight: "2px",
                                    fontSize: "14px",
                                    alignItems: "center",
                                  }}
                                >
                                  {feature.quantity}
                                </Typography>
                              </Box>
                            );
                          }

                          return null;
                        })}
                    </Box>
                    <Typography
                      sx={{
                        color: "var(--green-color)",
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      {selectedAdData[0]?.price} ر.س
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <StarIcon
                        sx={{
                          color: "var(--green-color)",
                          marginLeft: "5px",
                          fontSize: "18px",
                        }}
                      />
                      <Box
                        sx={{
                          color: "gray",
                          display: "flex",
                        }}
                      >
                        <Typography>
                          (
                          {selectedAdData[0]?.user_rate === null
                            ? `(${0})`
                            : `(${selectedAdData[0]?.user_rate?.toFixed(2)})`}
                          ){/* ({selectedAdData[0]?.user_rate?.toFixed(2)}) */}
                        </Typography>
                        <Typography>تقييم</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
      {/* start page ads */}
      <Box
        sx={{
          paddingRight: "23px",
          paddingLeft: "23px",
          marginTop: "16px",
          fontWeight: "700",
          fontSize: "17px",
        }}
      >
        {lang === "ar" ? "قائمة الإعلانات على الخريطة" : "ads list on the map"}
      </Box>
      {mapData.map((ad, index) => (
        <Box sx={{ paddingX: "23px", paddingBottom: "2rem" }} key={index}>
          {/* this is my ads  */}
          <Box
            sx={{
              position: "relative",
              paddingTop: "12.5px",
              paddingBottom: "12.5px",
            }}
          >
            <Link
              key={ad.id}
              style={{
                textDecoration: "none",
                height: "196.5px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 6px",
                overflow: "hidden",
                position: "relative",
                display: "block",
                backgroundColor: "white",
                padding: "8px 8px 8px 0px",
                borderRadius: "16px",
              }}
              onClick={() => handleAdClick(ad)}
            >
              <Box sx={{ position: "absolute", left: "10px", bottom: "18px" }}>
                <FavoriteIcons />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: "13rem",
                      height: "11.5rem",
                    }}
                  >
                    <HomeSliderMap ad={ad} />
                  </Box>
                </Box>
                <Box sx={{ padding: "9px 12px" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginBottom: "10px",
                      color: "rgb(5, 5, 54)",
                    }}
                  >
                    {ad.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "rgb(141, 141, 163)",
                      marginBottom: "10px",
                    }}
                  >
                    {" "}
                    {ad.city} , {ad.neighborhood} , {ad.road}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      marginX: "0.5rem",
                      color: "rgb(132, 132, 132)",
                      marginBottom: "10px",
                      marginRight: "-5px",
                    }}
                  >
                    {ad.QuantityAds &&
                      ad.QuantityAds.filter((feature) =>
                        Icons.some(
                          (icon) =>
                            icon.en_name === feature.quantity_feature.en_name
                        )
                      ).map((feature) => {
                        const matchingIcon = Icons.find(
                          (icon) =>
                            icon.en_name === feature.quantity_feature.en_name
                        );

                        if (matchingIcon) {
                          return (
                            <Box
                              key={feature.id}
                              sx={{ display: "flex", marginLeft: "px" }}
                            >
                              <Box>{matchingIcon.icon}</Box>
                              <Typography
                                sx={{
                                  marginRight: "2px",
                                  fontSize: "14px",
                                  alignItems: "center",
                                }}
                              >
                                {feature.quantity}
                              </Typography>
                            </Box>
                          );
                        }

                        return null;
                      })}
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--green-color)",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    {ad.price} {t("currency")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <StarIcon
                      sx={{
                        color: "var(--green-color)",
                        marginLeft: "5px",
                        fontSize: "18px",
                      }}
                    />
                    <Box
                      sx={{
                        color: "gray",
                        display: "flex",
                      }}
                    >
                      <Typography>
                        {ad?.user_rate === null
                          ? `(${0})`
                          : `(${ad.user_rate?.toFixed(2)})`}
                        {/* ) ({ad.user_rate?.toFixed(2)}) */}
                      </Typography>
                      {/* <Typography>تقييم</Typography> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default AdsList;
