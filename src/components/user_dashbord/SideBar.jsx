import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import styles from "./custom_sidebar.module.css";
import { Link } from "react-router-dom";
import { Logo } from "../../assets";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const drawerWidth = 290;

const StyledDrawer = styled("div")(({ theme, isSidebarOpen, lang }) => ({
  transition: "width 0.2s ease-in-out",
  width: isSidebarOpen ? drawerWidth : 0,
  overflowX: "hidden",
  position: "fixed",
  fontWeight: "700",
  top: 0,
  bottom: 0,
  left: lang === "en" ? "0px" : "",
  right: lang === "ar" ? "0px" : "",
  backgroundColor: "#fff",
  // boxShadow: theme.shadows[3],
  zIndex: theme.zIndex.drawer,
}));

const SideBar = ({
  onItemClick,
  onSubitemClick,
  selectedItem,
  selectedSubitem,
}) => {
  //   const [selectedItem, setSelectedItem] = React.useState(0);
  const [isSublistOpen, setSublistOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSubitemIndex, setSelectedSubitemIndex] = useState(0);

  const handleItemClick = (index) => {
    onItemClick(index);
    onSubitemClick(0);
    setSelectedSubitemIndex(0); // Reset the selected subitem index

    if (index === 2) {
      setSublistOpen(!isSublistOpen);
    }
  };
  const handleSubitemClick = (index) => {
    onSubitemClick(index);
    setSelectedSubitemIndex(index); // Update the selected subitem index
  };
  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuClick}
        sx={{
          position: "absolute",
          top: "20px",
          marginRight: "2rem",
          zIndex: "1",
          color: "var(--green-color)",
        }}
      >
        <MenuIcon />
      </IconButton>

      <StyledDrawer lang={lang} isSidebarOpen={!isSmallScreen || isSidebarOpen}>
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleMenuClick}
            sx={{
              position: "absolute",
              top: "16px",
              right: lang === "ar" ? "16px" : "",
              left: lang === "en" ? "16px" : "",
              zIndex: "100",
              color: "var(--green-color)",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <List className={styles.listContainer}>
          <ListItem sx={{ height: "64px" }}>
            <Link to="/" style={{ display: "block", margin: "auto" }}>
              <img
                src={Logo}
                alt="Image Description"
                style={{ width: "9rem" }}
              />
            </Link>
          </ListItem>
          <ListItem sx={{ height: "65px", marginY: "1rem" }}>
            <Link to="/addDeal" style={{ height: "100%", width: "100%" }}>
              <Button
                sx={{
                  color: "var(--green-color)",
                  borderRadius: "30px",
                  width: "100%",
                  height: "100%",
                  border: "1px solid",
                }}
              >
                <AddIcon sx={{ marginLeft: "5px" }} />
                <Typography>
                  {t("user_dashboard.sidebar.add_new_button")}
                </Typography>
              </Button>
            </Link>
          </ListItem>
          {[
            t("user_dashboard.sidebar.ul_button1"),
            t("user_dashboard.sidebar.ul_button2"),
            t("user_dashboard.sidebar.ul_button3"),
            t("user_dashboard.sidebar.ul_button4"),
            // t("user_dashboard.sidebar.ul_button5"),
            // t("user_dashboard.sidebar.ul_button6"),
          ].map((text, index) => (
            <React.Fragment key={text}>
              <ListItem
                onClick={() => handleItemClick(index)}
                sx={{
                  height: 65,
                  padding: "8px 36px",
                  color: "var(--green-color)",
                  cursor: "pointer",

                  textAlign: lang === "ar" ? "right" : "left",

                  fontWeight: "700",
                  backgroundColor:
                    selectedItem === index ? "#cffecf" : "inherit",
                  "&.no-hover:hover": {
                    backgroundColor: "inherit",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                {selectedItem === index && (
                  <div
                    style={{
                      position: "absolute",
                      insetInlineStart: 0,
                      width: "4px",
                      height: "100%",
                      borderRadius: "12px",
                      backgroundColor: "var(--green-color)",
                      zIndex: 2,
                    }}
                  />
                )}
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight={700}>
                      {text}
                    </Typography>
                  }
                />
                {index === 2 &&
                  (isSublistOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItem>

              {index === 2 && (
                <>
                  {isSublistOpen && (
                    <Collapse in={isSublistOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {[
                          t("user_dashboard.sidebar.button3_btn1"),
                          t("user_dashboard.sidebar.button3_btn2"),
                          t("user_dashboard.sidebar.button3_btn3"),
                        ].map((subtext, subindex) => (
                          <ListItem
                            key={subindex}
                            onClick={() => handleSubitemClick(subindex)}
                            sx={{
                              height: 65,
                              padding: "8px 36px",
                              color: "var(--green-color)",
                              cursor: "pointer",
                              textAlign: lang === "ar" ? "right" : "left",
                              backgroundColor:
                                selectedSubitemIndex === subindex
                                  ? "#cffecf"
                                  : "inherit",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                              },
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <ListItemText primary={subtext} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default SideBar;
