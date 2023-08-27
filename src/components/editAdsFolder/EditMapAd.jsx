import React, { useEffect } from "react";
import { useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { toast } from "react-hot-toast";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const googleMapsApiKey = "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk";

const EditMapAd = ({
  formData,
  setFormData,
  setError,
  mapData,
  setMapData,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
    // libraries: ['geometry', 'drawing'],
  });

  const [userMarkers, setUserMarkers] = useState([]);
  const [cityName, setCityName] = useState();
  const [neighborhoodName, setNeighborhoodName] = useState();
  const [rood, setRood] = useState();

  const [centeredMap, setCenteredMap] = useState({
    lat: 23.8859,
    lng: 45.0792,
  });

  const [selectedMarker, setSelectedMarker] = useState(
    formData.selectedLocation || null
  );

  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  useEffect(() => {
    if (mapLoaded) {
      if (formData.lat && formData.lng) {
        const clickedPosition = {
          lat: formData.lat,
          lng: formData.lng,
          zoom: 10,
        };
        const newMarker = {
          position: clickedPosition,
          id: new Date().getTime(), // Generate a unique ID
        };
        setCenteredMap({ lat: clickedPosition.lat, lng: clickedPosition.lng });
        setFormData((prevData) => ({
          ...prevData,
          lat: clickedPosition.lat,
          lng: clickedPosition.lng,
          zoom: clickedPosition.zoom,
        }));
        setUserMarkers([newMarker]);
        let isSaudiArabia = false;
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
                toast.error(
                  "لايمكن الاختيار خارج حدود المملكة العربية السعودية"
                );
              }
            } else {
              console.log("Unable to retrieve address details.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.log("no");
      }
    }
  }, [mapLoaded]);

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null);
    setFormData((prevData) => ({
      ...prevData,
      selectedLocation: null,
    }));
  };

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

    setFormData((prevData) => ({
      ...prevData,
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
      zoom: clickedPosition.zoom,
    }));

    setUserMarkers([newMarker]);

    //getting the country
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
            setError(true);
          }
        } else {
          console.log("Unable to retrieve address details.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setMapData((prev) => ({
      ...prev,
      cityName,
      neighborhoodName,
      rood,
    }));
  }, [cityName, neighborhoodName, rood]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centeredMap}
        zoom={10}
        onClick={(event) => handleMapClick(event)}
        onLoad={handleMapLoad}
      >
        {userMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={{
              // path: google.maps.SymbolPath.CIRCLE,
              url: require("./../../assets/mapMarker2.svg").default,
              scale: 1,
            }}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleCloseInfoWindow}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  );
};

export default EditMapAd;
