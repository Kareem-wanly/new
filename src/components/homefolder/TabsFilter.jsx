import React from "react";
import {
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Box,
  Link,
  Image,
  Typography,
  Button,
} from "@mui/material";
import HomeFilter from "./HomeFilter";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import FavoriteIcons from "./FavoriteIcons";
import { Padding } from "@mui/icons-material";
import HomeSlider from "./HomeSlider";
import SpecialAds from "./SpecialAds";
import CheckIcon from "@mui/icons-material/Check";
import NorthIcon from "@mui/icons-material/North";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTranslation } from "react-i18next";

const tabDataXs = [
  { label: "الجميع", content: "Content 1" },
  { label: "الأقرب لموقعي", content: "Content 2" },
  { label: "الأعلى تقييما", content: "Content 3" },
  { label: "الأعلى مشاهدة", content: "Content 4" },
  { label: "الأقل سعرا", content: "Content 5" },
  { label: "الأعلى سعرا", content: "Content 6" },
];

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

const TabsFilter = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isListOrderOpen, setListOrderOpen] = React.useState(false);
  const [isBoxShown, setBoxShown] = React.useState(false);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);

  const { t } = useTranslation();

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
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                padding: "4px",

                borderRadius: "30px",
              }}
            >
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  sx={{
                    // Customize the tab button styles
                    color: "black",
                    fontSize: { md: "0.88rem", lg: "1rem" },

                    "&.Mui-selected": {
                      backgroundColor: "var( --green-color)",
                      color: "white",
                      borderRadius: "25px",

                      paddingX: { md: "1rem", lg: "2rem" },
                    },

                    "&::before": {
                      content: '""',
                      display: index !== 0 ? "block" : "none",
                      width: "4px",
                      height: "4px",
                      backgroundColor: "rgba(0, 0, 0, 0.16)",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "50%",
                      right: "2px",
                      transform: "translateX(50%)",
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {tabData.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Box sx={{ height: "31.5rem", overflowY: "scroll" }}>
              <SpecialAds
                title="شقة شقة شقة شقة"
                location="الرياض"
                icons={icons}
                description="بهندسة معمارية حديثه تراعي الخصوصية ومتطلبات العائلة السعودية سلسلة فلل البدر صممت لتوفر لك مساحة السكن المثالية لعائلتك بادر بالحجز"
                ratings={10}
                price={20000}
                isNew={1}
              ></SpecialAds>
            </Box>
          </TabPanel>
        ))}
        {isMdScreen && isListOrderOpen && isBoxShown && (
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
            <Typography variant="h6">رتب أماكن الاقامة حسب</Typography>

            <ul
              style={{
                listStyle: "none",
                padding: "1rem",
                fontFamily: "Tajawal,Arial,sans-serif",
              }}
            >
              {tabData.map((tab, index) => (
                <li
                  key={index}
                  style={{
                    padding: "0.5rem 0.3rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setSelectedTab(index);
                    setListOrderOpen(false);
                  }}
                  className={selectedTab === index ? "active" : ""}
                >
                  {tab.label}
                  {selectedTab === index && (
                    <CheckIcon
                      sx={{
                        marginLeft: "0.5rem",
                        color: "var( --green-color)",
                        position: "absoulte",
                        right: "1rem",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </Box>
        )}
        {isMdScreen && (
          <Button
            onClick={() => {
              toggleBox();
              toggleOrderList();
            }}
            sx={{
              display: "flex",
              margin: "1rem auto",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
              backgroundColor: "var(--green-color)",
              color: "white",
              left: "50%",
              transform: "translate(-50%,-50%)",
              position: "absolute !important",
              top: "1rem",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "var(--green-color)",
              },
            }}
          >
            <NorthIcon />
            <NorthIcon
              sx={{ transform: "rotate(180deg)", marginRight: "-0.8rem" }}
            />
            ترتيب
          </Button>
        )}
      </div>
    </>
  );
};

export default TabsFilter;
