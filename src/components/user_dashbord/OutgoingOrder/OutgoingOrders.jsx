import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  styled,
  Fade,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Star from "../Star";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderTitles } from "../NewOrder";
import OrderCard from "../OrderConstant/OrderCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Map, Logo } from "../../../assets";

import {
  EditInformation,
  EditLocation,
  ShowHomeSatusModal,
  EditMap,
  EditDescription,
} from "./index";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useDataFetcher from "../../../api/useDataFetcher ";
import { myAxios } from "../../../api/myAxios";
import Loader from "../../Loading/Loader";
import { toast } from "react-hot-toast";
import PaginationAds from "../../Filter/PaginationAds";
import axios from "axios";
import Swal from "sweetalert2";
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
  padding: { xs: "0rem", md: "2rem" },
});
const googleMapsApiKey = "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk";

const OutGoingOrders = ({ userData, type }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // const { data, isLoading, get } = useDataFetcher();
  const [stateLoading, setStateLoading] = useState();
  const [getDataState, setGetDataState] = useState(false);

  const {
    data: CategoryData,
    isLoading: isLoadingCategoryData,
    get: getCategoryData,
  } = useDataFetcher();

  const [myAds, setMyAds] = useState([]);

  const [per_page, set_per_page] = useState();
  const [current_page, set_current_page] = useState(1);
  const [last_page, set_last_page] = useState();
  const nav = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (type === 0) {
      const token = localStorage.getItem("user_token");
      setIsLoadingData(true);
      const getData = async () => {
        const res = await axios.get(
          `https://www.dashboard.aqartik.com/api/user/get_user_deal?page=${current_page}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 1) {
          setMyAds(res.data.ads.data);
          setIsLoadingData(false);
          setData(res.data);
        } else if (
          res.data.status === 0 &&
          res.data.message === "401 Unauthorized"
        ) {
          setIsLoadingData(false);
          toast.error(
            lang === "ar"
              ? "غير مصرح، يرجى تسجيل الدخول"
              : "unauthorized, please login again"
          );
          nav("../login");
          // console.log("dinied");
        } else {
        }
      };
      getData();
      // get(`/api/user/get_user_ads?page=${current_page}`);
    } else if (type === 1) {
      const token = localStorage.getItem("user_token");
      setIsLoadingData(true);

      const getData = async () => {
        const res = await axios.get(
          `https://www.dashboard.aqartik.com/api/real-estate-request/get_all_requests?page=${current_page}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 1) {
          setMyAds(res.data.requests.data);
          setData(res.data);
          setIsLoadingData(false);
        } else if (
          res.data.status === 0 &&
          res.data.message === "401 Unauthorized"
        ) {
          setIsLoadingData(false);
          toast.error(
            lang === "ar"
              ? "غير مصرح، يرجى تسجيل الدخول"
              : "unauthorized, please login again"
          );
          nav("../login");
          // console.log("dinied");
        } else {
        }
      };
      getData();
      // get(`/api/real-estate-request/get_all_requests?page=${current_page}`);
    } else if (type === 2) {
      const token = localStorage.getItem("user_token");
      setIsLoadingData(true);

      const getData = async () => {
        const res = await axios.get(
          `https://www.dashboard.aqartik.com/api/real-estate-request/get_all_requests?type=incoming&page=${current_page}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 1) {
          setMyAds(res.data.requests.data);
          setData(res.data);
          setIsLoadingData(false);
        } else if (
          res.data.status === 0 &&
          res.data.message === "401 Unauthorized"
        ) {
          setIsLoadingData(false);
          toast.error(
            lang === "ar"
              ? "غير مصرح، يرجى تسجيل الدخول"
              : "unauthorized, please login again"
          );
          nav("../login");
          // console.log("dinied");
        } else {
        }
      };
      getData();
      // get(
      //   `/api/real-estate-request/get_all_requests?type=incoming&page=${current_page}`
      // );
    }
  }, [type, getDataState, current_page]);

  // useEffect(() => {
  //   if (type === 0) {
  //     if (data) setMyAds(data.ads.data);
  //   } else if (type === 1) {
  //     if (data) setMyAds(data.requests.data);
  //   } else if (type === 2) {
  //     if (data) setMyAds(data.requests.data);
  //   }
  // }, [data]);

  const [edditInfo, setEditInfo] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [edditLoc, setEditLoc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [MapEdit, setMapEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (data) {
      if (type === 0) {
        if (data) setMyAds(data?.ads.data);
        set_current_page(data?.ads?.current_page);
        set_per_page(data?.ads?.per_page);
        set_last_page(data?.ads?.last_page);
      } else if (type === 1) {
        if (data) setMyAds(data?.requests.data);
        set_current_page(data?.requests?.current_page);
        set_per_page(data?.requests?.per_page);
        set_last_page(data?.requests?.last_page);
      } else if (type === 2) {
        if (data) setMyAds(data?.requests.data);
        set_current_page(data?.requests?.current_page);
        set_per_page(data?.requests?.per_page);
        set_last_page(data?.requests?.last_page);
      }
    }
  }, [data]);

  const handlePageChange = (event, new_page) => {
    set_current_page(new_page);
  };

  const handleChange = (panel, ad) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    await getCategoryData(
      `https://www.dashboard.aqartik.com/api/deal/info/${ad.category_aqar.id}`
    );
    const apiKey = googleMapsApiKey;
    const lat = ad.lat; // Example latitude
    const lng = ad.lng; // Example longitude
    const zoom = ad.zoom; // Example zoom level
    const size = "400x400"; // Example size of the image
    setImageUrl(
      `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${apiKey}`
    );
  };

  const handleEditInformation = () => {
    setEditInfo(true);
  };

  const handleEditLocation = () => {
    setEditLoc(true);
  };

  const onCancel = () => {
    setEditInfo(!edditInfo);
  };
  // const onCancelMapEdit = () => {
  //   setMapEdit(!MapEdit);
  // };

  const handleCloseEditLocation = () => {
    setEditLoc(!edditLoc);
  };

  const handleCloseEditMap = () => {
    setMapEdit(!MapEdit);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMapEdit = () => {
    setMapEdit(true);
  };

  const handleRefreshing = async (id) => {
    setStateLoading(true);
    try {
      const res = await myAxios.get(`/api/deal/refresh_deal/${id}`);
      if (res) {
        setStateLoading(false);
        setGetDataState((prev) => !prev);
      }
    } catch (err) {
      setStateLoading(false);
    }
  };

  const handleSpecialAd = async (id) => {
    setStateLoading(true);

    try {
      const res = await myAxios.get(`/api/deal/make_deal_special/${id}`);
      if (res) {
        setStateLoading(false);
        setGetDataState((prev) => !prev);
      }
    } catch (err) {
      setStateLoading(false);
    }
  };

  const handleDeleteAd = async (id) => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?",
      text:
        lang === "ar"
          ? "لايمكنك التراجع بعد التأكيد"
          : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: lang === "ar" ? "الغاء" : "cancel",
      confirmButtonColor: "#14b183",
      cancelButtonColor: "#d33",
      confirmButtonText: lang === "ar" ? "تأكيد الحذف!" : "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const runFunction = async () => {
          if (type === 0) {
            setStateLoading(true);
            try {
              const res = await myAxios.get(`/api/deal/delete/${id}`);
              if (res.data.status === 1) {
                toast.success(lang === "ar" ? "تم الحذف بنجاح" : "done");
                setStateLoading(false);
                setGetDataState((prev) => !prev);
              }
            } catch (err) {}
          } else if (type === 1) {
            setStateLoading(true);
            try {
              const res = await myAxios.get(
                `/api/real-estate-request/delete/${id}`
              );
              if (res.data.status === 1) {
                toast.success(lang === "ar" ? "تم الحذف بنجاح" : "done");
                setStateLoading(false);
                setGetDataState((prev) => !prev);
              }
            } catch (err) {}
          }
        };
        runFunction();
      }
    });
  };

  return isLoadingData || stateLoading ? (
    <Loader />
  ) : (
    <Box sx={{ padding: { xs: "16px 5px", sm: "16px 56px" } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "24px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {type === 0
          ? lang === "ar"
            ? "اعلاناتي"
            : "my ads"
          : type === 1
          ? lang === "ar"
            ? "الطلبات الصادرة"
            : "outgoing orders"
          : lang === "ar"
          ? "الطلبات الواردة"
          : "incoming orders"}
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
        {myAds.map((ad) => (
          <CustomAccordion
            key={ad.id}
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded === `panel${ad.id}`}
            onChange={handleChange(`panel${ad.id}`, ad)}
          >
            <Box sx={{ paddingInline: "20px" }}>
              <CustomAccordionSummary
                expandIcon={
                  <CircleIconButton size="small">
                    <ExpandMoreIcon sx={{ fontSize: "2rem" }} />
                  </CircleIconButton>
                }
                aria-controls={`panel${ad.id}-content`}
                id={`panel${ad.id}-header`}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                    {ad.title}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        expanded === `panel${ad.id}`
                          ? "var(--green-color)"
                          : "rgb(244, 67, 54)",
                      marginX: "1rem",
                    }}
                  >
                    {expanded === `panel${ad.id}`
                      ? t("user_dashboard.incoming_orders.ad_expanded.one")
                      : t("user_dashboard.incoming_orders.ad_expanded.two")}
                  </Typography>
                  {type !== 2 && (
                    <Link
                      to={
                        type === 0 ? "/EditAds" : type === 1 ? "/EditOrder" : ""
                      }
                      state={{ ad: ad }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {lang === "ar" ? "تعديل" : "edit"}
                    </Link>
                  )}
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
                  <OrderCard>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        {t("user_dashboard.incoming_orders.card1.label1")}
                      </Typography>

                      {type !== 2 && (
                        <Typography
                          sx={{
                            color: "var(--green-color)",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                          onClick={handleEditInformation}
                        >
                          {!edditInfo &&
                            t("user_dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      )}
                    </Box>
                    {edditInfo && (
                      <Fade in={edditInfo}>
                        <Box>
                          <EditInformation
                            type={type}
                            ad={ad}
                            onCancel={onCancel}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!edditInfo && (
                      <Fade in={!edditInfo}>
                        <Box>
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
                            <Typography>{ad.title}</Typography>
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
                            <Typography>
                              {lang === "ar"
                                ? ad.category_aqar.ar_name
                                : ad.category_aqar.en_name}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginY: "1rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          marginTop: "1rem",
                        }}
                      >
                        {t("user_dashboard.incoming_orders.card2.title")}
                      </Typography>

                      {type !== 2 && (
                        <Typography
                          sx={{
                            color: "var(--green-color)",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                          onClick={handleEditLocation}
                        >
                          {!edditLoc &&
                            t("user_dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      )}
                    </Box>
                    {edditLoc && (
                      <Fade in={edditLoc}>
                        <Box>
                          <EditLocation
                            type={type}
                            ad={ad}
                            onCancel={handleCloseEditLocation}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                            interfaces={CategoryData.interfaces}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!edditLoc && (
                      <Fade in={!edditLoc}>
                        <Box>
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
                            <Typography>{ad.city}</Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "1rem",
                            }}
                          >
                            <Typography>
                              {" "}
                              {t("user_dashboard.incoming_orders.card2.label2")}
                            </Typography>
                            <Typography>{ad?.neighborhood}</Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "1rem",
                            }}
                          >
                            <Typography>
                              {lang === "ar" ? "الشارع" : "road"}
                            </Typography>
                            <Typography>{ad?.road}</Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "1rem",
                            }}
                          >
                            <Typography>
                              {" "}
                              {t(
                                "user_dashboard.incoming_orders.card2.label3"
                              )}{" "}
                            </Typography>
                            <Typography>
                              {lang === "ar"
                                ? ad?.interface_aqar?.ar_name
                                : ad?.interface_aqar?.en_name}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    )}
                  </OrderCard>
                  <OrderCard>
                    {descriptionEdit && (
                      <Fade in={descriptionEdit}>
                        <Box>
                          <EditDescription
                            type={type}
                            ad={ad}
                            onCancel={() => {
                              setDescriptionEdit(false);
                            }}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!descriptionEdit && (
                      <Fade in={!descriptionEdit}>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "1rem",
                            }}
                          >
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                            >
                              {t("user_dashboard.incoming_orders.card5.title")}
                            </Typography>

                            {type !== 2 && (
                              <Typography
                                sx={{
                                  color: "var(--green-color)",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setDescriptionEdit(true);
                                }}
                              >
                                {!descriptionEdit &&
                                  t(
                                    "user_dashboard.outgoing_requests.edit_btn"
                                  )}
                              </Typography>
                            )}
                          </Box>
                          <Typography>{ad?.description}</Typography>
                        </Box>
                      </Fade>
                    )}
                  </OrderCard>
                </Box>
                <Box>
                  <OrderCard>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        {t("user_dashboard.incoming_orders.card3.title")}
                      </Typography>
                    </Box>
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
                      {ad?.status === 0 ? (
                        <Typography
                          sx={{
                            color: "rgb(244, 67, 54)",
                            fontWeight: "600",
                            marginBottom: "1rem",
                          }}
                        >
                          غير معروض
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            color: "var(--main-color)",
                            fontWeight: "600",
                            marginBottom: "1rem",
                          }}
                        >
                          معروض
                        </Typography>
                      )}
                    </Box>
                  </OrderCard>
                  <OrderCard>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        {t("user_dashboard.incoming_orders.card4.title")}
                      </Typography>

                      {type !== 2 && (
                        <Typography
                          sx={{
                            color: "var(--green-color)",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                          onClick={handleMapEdit}
                        >
                          {!MapEdit &&
                            t("user_dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      )}
                    </Box>
                    {MapEdit && (
                      <Fade in={MapEdit}>
                        <Box>
                          <EditMap
                            type={type}
                            ad={ad}
                            onCancel={handleCloseEditMap}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!MapEdit && (
                      <Fade in={!MapEdit}>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{ color: "rgb(132, 132, 132)", width: "35%" }}
                          >
                            {ad?.city +
                              ", " +
                              ad?.neighborhood +
                              ", " +
                              ad?.road}
                          </Typography>
                          <Box
                            sx={{
                              width: "60%",
                              height: "197px",
                              borderRadius: "12px",
                              overflow: "hidden",
                              marginInlineStart: "auto",
                              position: "relative",
                            }}
                          >
                            <img
                              src={Map}
                              alt="My "
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      </Fade>
                    )}
                  </OrderCard>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "left" }}>
                  {type === 0 && (
                    <>
                      <Box
                        onClick={() => handleRefreshing(ad.id)} // Corrected prop name here
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography>تحديث</Typography>
                        <RefreshIcon
                          sx={{
                            cursor: "pointer",
                            marginX: "10px",
                            fontSize: "2rem",
                          }}
                        />
                      </Box>
                      <Box onClick={() => handleSpecialAd(ad.id)}>
                        <Star isSpecial={ad.is_special} />
                      </Box>
                    </>
                  )}
                  <Box onClick={() => handleDeleteAd(ad.id)}>
                    <DeleteForeverIcon
                      sx={{
                        color: "black",
                        marginLeft: "3px",
                        fontSize: "2rem",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CustomAccordionDetails>
          </CustomAccordion>
        ))}
        {modalOpen && <ShowHomeSatusModal onClose={handleModalClose} />}
      </Box>
      <PaginationAds
        handlePageChange={handlePageChange}
        current_page={current_page}
        per_page={per_page}
        last_page={last_page}
      />
    </Box>
  );
};

export default OutGoingOrders;
