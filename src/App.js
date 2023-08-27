import React, { useState, useEffect, useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { Addads, Home } from "./components";
import UserDashbored from "./pages/userdashbored";
// import Ads from "./pages/Ads";
import Ads from "./pages/ads";
import Login from "./pages/loginFolder/Login";
import Details from "./pages/details";
import About from "./pages/about";
import Mappage from "./pages/mappage";
import Cards from "./pages/Cards";
import EditAds from "./pages/EditAds";
import { useMediaQuery } from "@mui/material";
import { Layout } from "./components/layouts/Layout";
import Offices from "./pages/offices/Offices";
import Office from "./pages/offices/Office";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import useDataFetcher from "./api/useDataFetcher ";
import { Maintence } from "./assets";
import UnderMaintence from "./components/under_mintance/UnderMaintence";
import PrivaceyRules from "./pages/PrivaceyRules";
import ContactUs from "./pages/ContactUs";
import LoaderHome from "./components/Loading/LoaderHome";
import GeneralContext from "./context/generalContext";
import EditOrder from "./components/user_dashbord/OutgoingOrder/EditOrder";

function App() {
  const { generalData, website_status } = useContext(GeneralContext);
  const isAuthenticated = localStorage.getItem("user_token") ? true : false;

  const isMediumScreen = useMediaQuery("(min-width:900px)");
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [userLocation, setUserLocation] = useState(null);
  // this is for take user Location

  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (storedLocation) {
      setUserLocation(storedLocation);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      } else {
        console.log("Geolocation not supported");
      }
    }
  }, []);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationData = { latitude, longitude };
    setUserLocation(locationData);
    localStorage.setItem("userLocation", JSON.stringify(locationData));
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  //end  this is for take user Location

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar"
            ? generalData?.site_title_ar
            : generalData?.site_title_en}
        </title>
        <meta
          name="description"
          content={
            lang === "ar"
              ? generalData?.site_desc_ar
              : generalData?.site_desc_en
          }
        />
        <meta
          name="keywords"
          content={
            lang === "ar"
              ? generalData?.site_keywords_ar
              : generalData?.site_keywords_en
          }
        />
      </Helmet>
      {/* {generalData.style_preload && <LoaderHome />} */}

      {website_status === 0 ? (
        <UnderMaintence />
      ) : (
        <Router basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  showNavFooter={true}
                  contentStyles={{ marginTop: "12rem !important" }}
                >
                  <Home userLocation={userLocation} />
                </Layout>
              }
            />
            <Route
              path="/addDeal"
              element={
                <Layout
                  showNavFooter={false}
                  contentStyles={{ marginTop: "2rem !important" }}
                >
                  <Addads />
                </Layout>
              }
            />
            <Route
              path="/userdashbored"
              element={
                <Layout
                  showNavFooter={false}
                  contentStyles={{
                    marginTop: "0rem ",
                  }}
                >
                  <UserDashbored />
                </Layout>
              }
            />

            <Route
              path="/deals"
              element={
                <Layout showNavFooter={true}>
                  <Ads userLocation={userLocation} />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout
                  showNavFooter={false}
                  contentStyles={{
                    background:
                      "linear-gradient(to bottom, #15b184, rgb(11, 79, 60))",
                    height: "100vh",
                    marginTop: "0rem ",
                  }}
                >
                  <Login />
                </Layout>
              }
            />
            {/* here goes offices pages  */}
            <Route path="/offices">
              <Route
                index
                element={
                  <Layout
                    showNavFooter={true}
                    contentStyles={{ margin: "8rem 2rem 0rem 2rem" }}
                  >
                    <Offices />
                  </Layout>
                }
              />
              <Route
                path="/offices/office/:id"
                element={
                  <Layout
                    showNavFooter={true}
                    contentStyles={{ margin: "8rem 2rem 0rem 2rem" }}
                  >
                    <Office />
                  </Layout>
                }
              />
            </Route>
            {/* here goes offices pages  */}
            <Route
              path="/details/:id"
              element={
                <Layout
                  showNavFooter={true}
                  contentStyles={{ marginTop: "9rem " }}
                >
                  <Details />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout
                  showNavFooter={true}
                  contentStyles={{ marginTop: "9rem " }}
                >
                  <About />
                </Layout>
              }
            />
            <Route
              path="/mappage"
              element={
                <Layout
                  showNavFooter={isMediumScreen}
                  contentStyles={{ marginTop: "9rem !important" }}
                >
                  <Mappage />
                </Layout>
              }
            />
            <Route
              path="/memberships"
              element={
                <Layout
                  showNavFooter={true}
                  contentStyles={{ marginTop: "12rem !important" }}
                >
                  <Cards />
                </Layout>
              }
            />
            <Route
              path="/EditAds"
              element={
                isAuthenticated ? (
                  <Layout showNavFooter={false}>
                    <EditAds />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/privacy"
              element={
                <Layout
                  showNavFooter={true}
                  contentStyles={{ marginTop: "12rem !important" }}
                >
                  <PrivaceyRules />
                </Layout>
              }
            />
            <Route
              path="/contact_us"
              element={
                <Layout showNavFooter={true}>
                  <ContactUs />
                </Layout>
              }
            />
            <Route
              path="/EditOrder"
              element={
                isAuthenticated ? (
                  <Layout showNavFooter={false}>
                    <EditOrder />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
///////////////////////////////////////////////
// <div
//   style={{ width: "100%", height: "100vh", backgroundColor: "#EEE" }}
// >
//   <img
//     src={Maintence}
//     alt="maintence"
//     style={{
//       width: "600px",
//       borderRadius: "1rem",
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%,-50%)",
//     }}
//   />
// </div>
