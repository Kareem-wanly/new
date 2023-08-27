import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { TopNav, SideBar } from "../components/user_dashbord";
import {
  PersonalInfo,
  MyAds,
  NewRequests,
  OutgoingOrder,
  IcomingOrders,
  SpecialAds,
  Usersmangament,
  SubscribeDetails,
} from "../components/user_dashbord";
import Notification from "../components/user_dashbord/Notification";

import { UserDashboradSpeacialAds } from "../components";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../api/useDataFetcher ";
import Loader from "../components/Loading/Loader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { DataArrayOutlined } from "@mui/icons-material";
import { myAxios } from "../api/myAxios";
import axios from "axios";
const UserDashbored = ({ type = null }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedSubitem, setSelectedSubitem] = useState(0);
  const nav = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (type !== null) {
      setSelectedItem(type);
    }
  }, [type]);

  const [userData, setUserData] = useState();
  // const { data, isLoading, get, error } = useDataFetcher();
  const [isLoadingData, setIsLoadingData] = useState(true);
  // console.log(data);

  useEffect(() => {
    // const isTokenExist = localStorage.getItem("user_token") ? true : false;
    // isTokenExist && get("/api/user/get_user_data");
    const token = localStorage.getItem("user_token");
    const getData = async () => {
      const res = await axios.get(
        `https://www.dashboard.aqartik.com/api/user/get_user_data`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status === 1) {
        setUserData(res.data.user);
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
        localStorage.removeItem("user_token");
        nav("../login");
      } else {
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     if (data.status === 1) {
  //       setUserData(data?.user);
  //     }
  //     //  else if (data.status === 0 && data.message === "401 Unauthorized") {
  //     //   toast.error("غير مصرح، يرجى تسجيل الدخول");
  //     //   const isTokenExist = localStorage.getItem("user_token") ? true : false;
  //     //   isTokenExist && localStorage.removeItem("user_token");
  //     //   nav("../login");
  //     // }
  //   } else {
  //     console.log("not yet");
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     setUserdata(data.user);
  //   }
  // }, [data]);
  // console.log(data);

  const handleItemClick = (index) => {
    setSelectedItem(index);
    setShowNotification(false);
  };

  const handleSubitemClick = (index) => {
    setSelectedSubitem(index);
    setShowNotification(false);
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  let content;
  switch (selectedItem) {
    case 0:
      content = <PersonalInfo userData={userData} />;
      break;
    case 1:
      content = <OutgoingOrder type={0} userData={userData} />; // my ads section
      break;
    case 2:
      switch (selectedSubitem) {
        case 0:
          content = <NewRequests />; /// add new request
          break;
        case 1:
          content = <OutgoingOrder type={1} userData={userData} />; // my outgoing requests section
          break;
        case 2:
          content = <OutgoingOrder type={2} userData={userData} />; // my icoming requests section
          break;
        default:
          content = null;
          break;
      }
      break;
    case 3:
      content = <UserDashboradSpeacialAds />;
      break;
    case 4:
      content = <Usersmangament />;
      break;
    case 5:
      content = <SubscribeDetails />;
      break;
    default:
      content = null;
      break;
  }
  return (
    <Box>
      {isLoadingData && <Loader />}
      <TopNav
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
      <Grid container>
        <Grid item xs={12} lg={3}>
          <SideBar
            onItemClick={handleItemClick}
            onSubitemClick={handleSubitemClick}
            selectedItem={selectedItem}
            selectedSubitem={selectedSubitem}
          />
        </Grid>

        <Grid item xs={12} lg={9}>
          <Box sx={{ marginTop: "7rem" }}>
            {showNotification ? <Notification /> : content}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashbored;
