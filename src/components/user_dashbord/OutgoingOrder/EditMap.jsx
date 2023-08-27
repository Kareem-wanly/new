import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

const googleMapsApiKey = "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const EditMap = ({ type, ad, onCancel, setStateLoading, setGetDataState }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
    // libraries: ['geometry', 'drawing'],
  });
  const { t } = useTranslation();
  const [userMarkers, setUserMarkers] = useState([]);
  const [cityName, setCityName] = useState();
  const [neighborhoodName, setNeighborhoodName] = useState();
  const [rood, setRood] = useState();
  const [error, setError] = useState(false);
  const [centeredMap, setCenteredMap] = useState({
    lat: 23.8859,
    lng: 45.0792,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };
  useEffect(() => {
    if (mapLoaded) {
      if (ad.lat && ad.lng) {
        const clickedPosition = {
          lat: ad?.lat,
          lng: ad?.lng,
          zoom: 10,
        };
        const newMarker = {
          position: clickedPosition,
          id: new Date().getTime(), // Generate a unique ID
        };
        setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });
        // setFormData((prevData) => ({
        //   ...prevData,
        //   selectedLocation: clickedPosition,
        // }));
        setUserMarkers([newMarker]);
      } else {
        console.log("no");
      }
    }
  }, [mapLoaded]);
  console.log(userMarkers);

  // const handleCloseInfoWindow = () => {
  //   setSelectedMarker(null);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     selectedLocation: null,
  //   }));
  // };

  const handleMapClick = (event) => {
    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      zoom: 10,
    };

    const newMarker = {
      position: clickedPosition,
      id: new Date().getTime(), // Generate a unique ID
    };

    setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });

    // setFormData((prevData) => ({
    //   ...prevData,
    //   selectedLocation: clickedPosition,
    // }));

    setUserMarkers([newMarker]);
    let isSaudiArabia = false;

    //getting the country
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedPosition.lat},${clickedPosition.lng}&key=${googleMapsApiKey}&language=ar`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          for (const result of data.results) {
            // Extract city name and neighborhood name from address components
            for (const component of result.address_components) {
              if (component.types.includes("country")) {
                const countryName = component.long_name;
                if (countryName === "السعودية") {
                  isSaudiArabia = true;
                  setError(false);
                } else {
                  setError(true);
                }
              }
              if (component.types.includes("locality")) {
                setCityName(component.long_name);
              }
              if (component.types.includes("sublocality")) {
                setNeighborhoodName(component.long_name);
              }
              if (component.types.includes("route")) {
                setRood(component.long_name);
              }
            }
          }
          if (!isSaudiArabia) {
            // The location is not in Saudi Arabia
            toast.error("لايمكن الاختيار خارج حدود المملكة العربية السعودية");
          }
        } else {
          console.log("Unable to retrieve address details.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // useEffect(() => {
  //   setMapData((prev) => ({
  //     ...prev,
  //     cityName,
  //     neighborhoodName,
  //     rood,
  //   }));
  // }, [cityName, neighborhoodName, rood]);

  // console.log(mapData);
  const handleSubmit = async (e) => {
    setStateLoading(true);
    e.preventDefault();
    if (type === 0) {
      try {
        const res = await fetch(
          `https://www.dashboard.aqartik.com/api/deal/update/${ad.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
            body: JSON.stringify({
              lat: userMarkers["0"].position.lat,
              lng: userMarkers["0"].position.lng,
              zoom: userMarkers["0"].position.zoom,
              road: rood,
              neighborhood: neighborhoodName,
              city: cityName,
            }),
          }
        );
        if (res) {
          setGetDataState((prev) => !prev);
          setStateLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (type === 1) {
      try {
        const res = await fetch(
          `https://www.dashboard.aqartik.com/api/real-estate-request/update/${ad.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
            body: JSON.stringify({
              lat: userMarkers["0"].position.lat,
              lng: userMarkers["0"].position.lng,
              zoom: userMarkers["0"].position.zoom,
              road: rood,
              neighborhood: neighborhoodName,
              city: cityName,
            }),
          }
        );
        if (res) {
          setGetDataState((prev) => !prev);
          setStateLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box>
      <form>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
            marginInline: "auto",
          }}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={centeredMap}
              zoom={10}
              onClick={(event) => handleMapClick(event)}
              onLoad={handleMapLoad}
            >
              {userMarkers.map((marker, index) => (
                <Marker
                  icon={{
                    // path: google.maps.SymbolPath.CIRCLE,
                    url: require("./../../../assets/mapMarker2.svg").default,
                    scale: 1,
                  }}
                  key={index}
                  position={marker.position}
                />
              ))}
              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.position}
                  // onCloseClick={handleCloseInfoWindow}
                >
                  <div>
                    <h3>{selectedMarker.title}</h3>
                    <p>{selectedMarker.description}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </Box>
        <Box
          sx={{
            borderWidth: "0px 0px thin",
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.12)",
            margin: "2rem 4rem",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "1rem ",
            marginInline: "auto",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="submit"
            disabled={error}
            onClick={handleSubmit}
            sx={{
              fontWeight: "600",
              borderRadius: "8px",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "var(--green-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "#0b7b5a",
                color: "white",
              },
            }}
          >
            {t("user_dashboard.outgoing_requests.submit_btn")}
          </Button>
          <Button
            sx={{
              fontWeight: "600",
              borderRadius: "8px",

              border: "1px solid var(--green-color)",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "white",
              color: "var(--green-color)",
              "&:hover": {
                backgroundColor: "#e5f9f4",
              },
            }}
            onClick={onCancel}
          >
            {t("user_dashboard.outgoing_requests.cancel_btn")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditMap;
