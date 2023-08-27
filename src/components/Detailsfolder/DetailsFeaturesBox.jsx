import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import HomeRooms from "./HomeRooms";

import Icons from "../Filter/Icons";
import CheckIcon from "@mui/icons-material/Check";

//   {
//     name: "Kitchen",
//     icon: <KitchenIcon />,
//   },
//   {
//     name: "Car Entrance",
//     icon: <LocalParkingIcon />,
//   },
//   {
//     name: "Elevator",
//     icon: <ElevatorIcon />,
//   },
//   {
//     name: "Appendix",
//     icon: <ParkIcon />,
//   },
//   {
//     name: "Cellar",
//     icon: <ParkIcon />,
//   },
//   {
//     name: "Yard",
//     icon: <NaturePeopleIcon />,
//   },
//   {
//     name: "Driver room",
//     icon: <CarRepairIcon />,
//   },
//   {
//     name: "Maid room",
//     icon: <CleaningServicesIcon />,
//   },
//   {
//     name: "Swimming pool",
//     icon: <PoolIcon />,
//   },
//   {
//     name: "Verse",
//     icon: <HomeWorkIcon />,
//   },
//   {
//     name: "Duplex",
//     icon: <HighlightIcon />,
//   },
//   {
//     name: "Hall staircase",
//     icon: <StairsIcon />,
//   },
//   {
//     name: "Football stadium",
//     icon: <SportsSoccerIcon />,
//   },
//   {
//     name: "Volleyball stadium",
//     icon: <SportsFootballIcon />,
//   },
//   {
//     name: "Window air conditioner",
//     icon: <AcUnitIcon />,
//   },
//   {
//     name: "Split air conditioner ",
//     icon: <AcUnitIcon />,
//   },
//   {
//     name: "Central  air conditioner ",
//     icon: <AcUnitIcon />,
//   },
//   {
//     name: "Floor",
//     icon: <BusinessIcon />,
//   },
//   {
//     name: "Street Width",
//     icon: <EditRoadIcon />,
//   },
//   {
//     name: "Wells",
//     icon: <SpaIcon />,
//   },
//   {
//     name: "Stores",
//     icon: <StoreIcon />,
//   },
//   {
//     name: "Trees",
//     icon: <ForestIcon />,
//   },
//   {
//     name: "Rooms",
//     icon: <ChairIcon />,
//   },
//   {
//     name: "Lounges",
//     icon: <ChairIcon />,
//   },
//   {
//     name: "Toilets",
//     icon: <BathtubIcon />,
//   },
//   {
//     name: "Car Parking",
//     icon: <LocalParkingIcon />,
//   },
//   {
//     name: "Number of units",
//     icon: <LocalParkingIcon />,
//   },
// ];

const DetailsFeaturesBox = ({ adInfo }) => {
  // console.log(adInfo);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const filteredFeatures =
    adInfo?.BoolFeaturea?.filter((feature) =>
      Icons.some((icon) => icon.en_name === feature.bool_featurea.en_name)
    ) || [];

  const filteredQuantity =
    adInfo?.QuantityAds?.filter((feature) =>
      Icons.some((icon) => icon.en_name === feature.quantity_feature.en_name)
    ) || [];

  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    // Calculate the time difference between adInfo.lastUpdate and the current time
    const lastUpdate = new Date(adInfo.lastUpdate).getTime();
    const currentTime = new Date().getTime();
    const timeDiffInSeconds = Math.floor((currentTime - lastUpdate) / 1000);

    setTimeDifference(timeDiffInSeconds);
  }, [adInfo.lastUpdate]);

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return t("details_page.time.seconds_ago", { count: seconds });
    } else if (seconds < 3600) {
      return t("details_page.time.minutes_ago", {
        count: Math.floor(seconds / 60),
      });
    } else if (seconds < 86400) {
      return t("details_page.time.hours_ago", {
        count: Math.floor(seconds / 3600),
      });
    } else {
      return t("details_page.time.days_ago", {
        count: Math.floor(seconds / 86400),
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: lang === "ar" ? "right" : "left",
        borderRadius: "8px",
        border: "1px solid #eee",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      {filteredFeatures.map((feature) => {
        const matchingIcon = Icons.find(
          (icon) => icon.en_name === feature.bool_featurea.en_name
        );
        if (matchingIcon) {
          return (
            <>
              <HomeRooms
                key={feature.id}
                iconRoom={matchingIcon.icon}
                titleRoom={
                  lang === "ar"
                    ? feature.bool_featurea.ar_name
                    : feature.bool_featurea.en_name
                }
                numRoom=""
                checkIcon={
                  <CheckIcon
                    sx={{ color: "var(--green-color)", marginRight: "-10px" }}
                  />
                }
              />
            </>
          );
        }
      })}
      {filteredQuantity.map((feature) => {
        const matchingIcon = Icons.find(
          (icon) => icon.en_name === feature.quantity_feature.en_name
        );
        if (matchingIcon) {
          return (
            <HomeRooms
              key={feature.id}
              iconRoom={matchingIcon.icon}
              titleRoom={
                lang === "ar"
                  ? feature.quantity_feature.ar_name
                  : feature.quantity_feature.en_name
              }
              numRoom={feature.quantity}
              checkIcon=" "
            />
          );
        }
      })}
      {/* <HomeRooms
        iconRoom={<BedIcon />}
        titleRoom={t(
          "details_page.details_tabs.specifications_and_features_tab.bedrooms"
        )}
        numRoom="3"
      ></HomeRooms>
      <HomeRooms
        iconRoom={<ChairIcon />}
        titleRoom={t(
          "details_page.details_tabs.specifications_and_features_tab.living_rooms"
        )}
        numRoom="3"
      ></HomeRooms>
      <HomeRooms
        iconRoom={<BathtubIcon />}
        titleRoom={t(
          "details_page.details_tabs.specifications_and_features_tab.bathrooms_nums"
        )}
        numRoom="4"
      ></HomeRooms>
      <HomeRooms
        iconRoom={<AddRoadIcon />}
        titleRoom={t(
          "details_page.details_tabs.specifications_and_features_tab.area"
        )}
        numRoom="300 م"
      ></HomeRooms>
      <HomeRooms
        iconRoom={<BusinessIcon />}
        titleRoom={t(
          "details_page.details_tabs.specifications_and_features_tab.floor"
        )}
        numRoom="2"
      ></HomeRooms> */}

      {/* if there is update show it */}
      <Box sx={{ display: "flex", padding: "5px", alignItems: "center" }}>
        <Typography sx={{ marginX: "5px", minWidth: { md: "7rem" } }}>
          {t(
            "details_page.details_tabs.specifications_and_features_tab.last_update"
          )}
          :
        </Typography>
        <Typography sx={{ color: "gray", marginX: "5px" }}>
          {formatTime(timeDifference)}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailsFeaturesBox;
