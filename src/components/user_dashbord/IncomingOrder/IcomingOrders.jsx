import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  styled,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderTitles } from "../NewOrder";
import OrderCard from "../OrderConstant/OrderCard";

import { Map, Logo } from "../../../assets";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Star from "../Star";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

// import './Incoming.module.css'

const CircleIconButton = styled(IconButton)({
  borderRadius: "50%",
  backgroundColor: "#d4d4d4",
  color: "white",
  padding: "0px",
});
const CustomAccordion = styled(Accordion)({
  padding: "18px",
  borderRadius: "12px",
  boxShadow: "none",
  "&:not(:last-child)": {
    marginBottom: "24px",
  },

  "&::before": {
    display: "none",
  },
});

const CustomAccordionSummary = styled(AccordionSummary)({
  borderRadius: "12px",
});

const CustomAccordionDetails = styled(AccordionDetails)({
  borderRadius: "12px",
  padding: "2rem",
});
const IcomingOrders = ({ userData, title }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isExpanded, setIsExpanded] = useState(false);

  const [accordions, setAccordions] = useState([
    { id: 1, expanded: false },
    { id: 2, expanded: false },
  ]);
  const handleAccordionChange = (accordionId) => (event, isExpanded) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === accordionId
          ? { ...accordion, expanded: isExpanded }
          : accordion
      )
    );
  };
  return (
    <Box sx={{ padding: { xs: "16px 5px", sm: "16px 56px" } }}>
      <Typography
        sx={{
          fontSize: { xs: "1.5rem", md: "2.125rem" },
          lineHeight: "1.235",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          overflowY: "auto",
          marginBlockStart: "32px",
          borderRadius: "12px",
          display: "grid",
          gap: "24px",
          alignItems: "start",
          height: "calc(100% - 20px)",
          position: "relative",
          // boxShadow: "2",
        }}
      >
        {accordions.map((accordion) => (
          <CustomAccordion
            key={accordion.id}
            expanded={accordion.expanded}
            onChange={handleAccordionChange(accordion.id)}
          >
            <Box sx={{ paddingInline: "20px" }}>
              <CustomAccordionSummary
                expandIcon={
                  <CircleIconButton size="small">
                    <ExpandMoreIcon sx={{ fontSize: "2rem" }} />
                  </CircleIconButton>
                }
                aria-controls={`panel${accordion.id}-content`}
                id={`panel${accordion.id}-header`}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                    rama
                  </Typography>
                  <Typography
                    sx={{
                      color: accordion.expanded
                        ? "var(--green-color)"
                        : "rgb(244, 67, 54)",
                      marginX: "1rem",
                    }}
                  >
                    {accordion.expanded
                      ? t("user_dashboard.incoming_orders.ad_expanded.one")
                      : t("user_dashboard.incoming_orders.ad_expanded.two")}
                  </Typography>
                </Box>
              </CustomAccordionSummary>
            </Box>
            <CustomAccordionDetails>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(350px, 100%), 1fr))",
                  gap: "1rem 16px",
                  marginBlockStart: "0.5rem",
                }}
              >
                <Box>
                  <OrderCard
                    title={t("user_dashboard.incoming_orders.card1.title")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography>
                        {t("user_dashboard.incoming_orders.card1.label1")}
                      </Typography>
                      <Typography>rama</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography>
                        {t("user_dashboard.incoming_orders.card1.label2")}
                      </Typography>
                      <Typography>شقة</Typography>
                    </Box>
                  </OrderCard>
                  <OrderCard
                    title={t("user_dashboard.incoming_orders.card2.title")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",

                        marginBottom: "1rem",
                      }}
                    >
                      <Typography>
                        {t("user_dashboard.incoming_orders.card2.label1")}
                      </Typography>
                      <Typography>جدة</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography>
                        {t("user_dashboard.incoming_orders.card2.label2")}
                      </Typography>
                      <Typography>حي الزمرد</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography>
                        {t("user_dashboard.incoming_orders.card2.label3")}{" "}
                      </Typography>
                      <Typography>شمال</Typography>
                    </Box>
                  </OrderCard>
                  <OrderCard title="وصف العقار ">
                    <Typography>
                      تيبا سنيبت سيمنبمكثسي ثسنيبمنسيلاب سيبتمنسيىب ينبستمنسيىب
                      نيسبمنسيلاب سنيبىمنسيلاب
                    </Typography>
                  </OrderCard>
                </Box>
                <Box>
                  <OrderCard
                    title={t("user_dashboard.incoming_orders.card3.title")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>
                        {" "}
                        {t("user_dashboard.incoming_orders.card3.label1")}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgb(244, 67, 54)",
                          fontWeight: "600",
                          marginBottom: "1rem",
                        }}
                      >
                        غير معروض
                      </Typography>
                    </Box>
                  </OrderCard>

                  <OrderCard
                    title={t("user_dashboard.incoming_orders.card4.title")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgb(132, 132, 132)",
                          width: { xs: "100%", md: "35%" },
                        }}
                      >
                        8070 العويقلة، 2709، صلاح الدين، الرياض 12434، السعودية
                      </Typography>
                      <Box
                        sx={{
                          width: { xs: "100%", md: "60%" },
                          height: "197px",
                          borderRadius: "12px",
                          overflow: "hidden",
                          marginInlineStart: "auto",
                          position: "relative",
                        }}
                      >
                        <img
                          src={Map}
                          alt="My Image"
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </Box>
                  </OrderCard>
                </Box>
              </Box>
              <OrderCard title="وحدات هذا العقار ">
                <Link
                  to="/EditAds"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(56, 31, 118, 0.04)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingY: "2rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: { xs: "block", md: "flex" },
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={Logo}
                        alt=""
                        style={{ width: "80px", objectFit: "cover" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          marginInlineStart: "1rem",
                          alignItems: "start",
                        }}
                      >
                        <Typography>fkfjg</Typography>
                        <Typography sx={{ color: "red" }}>
                          {" "}
                          غير معروض (أوف لابن)
                        </Typography>
                      </Box>
                    </Box>
                    <ChevronLeftIcon sx={{ color: "gray" }} />
                  </Box>
                </Link>
              </OrderCard>
              <Box sx={{ display: "flex", justifyContent: "left" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>تحديث</Typography>
                  <RefreshIcon
                    sx={{
                      cursor: "pointer",
                      marginX: "10px",
                      fontSize: "2rem",
                    }}
                  />
                </Box>

                <Star />
              </Box>
            </CustomAccordionDetails>
          </CustomAccordion>
        ))}
      </Box>
    </Box>
  );
};

export default IcomingOrders;
