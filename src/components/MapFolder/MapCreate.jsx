import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import AdsListSmall from "./AdsListSmall";
import AdsList from "./AdsList";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const CustomMarker = ({ price, isActive, onClick }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",

        padding: "0px 8px",
        height: "35px",
        backgroundColor: isActive ? "var(--green-color)" : "rgb(255, 255, 255)",
        border: isActive
          ? "2px solid var(--green-color)"
          : "2px solid rgb(255, 255, 255)",
        color: isActive ? "white" : "rgb(0, 0, 0)",
        borderRadius: "20px",
        zIndex: isActive ? "20000" : "1",
        transform: "translate(-50%, -50%)",
        display: "flex",

        justifyContent: "center",

        alignItems: "center",
        fontWeight: "700",
        fontSize: "15px",
        fontFamily: "Tajawal",
        boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 6px",
      }}
    >
      <span>
        {price} {t("currency")}
      </span>
    </div>
  );
};
const MapCreate = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk",
    // libraries: ['geometry', 'drawing'],
  });
  const { locations, state, isBoxVisible, setBoxVisible, setSelectedAd } =
    props;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [overlayViews, setOverlayViews] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [isMarkerClicked, setMarkerClicked] = useState(false);
  const [cityCenter, setCityCenter] = useState();
  useEffect(() => {
    setCityCenter({ lat: state.lat, lng: state.lng, zoom: state.zoom });
  }, []);
  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  useEffect(() => {
    if (mapLoaded) {
      // Create an array of overlayViews for the custom markers
      const loadedOverlayViews = locations.map((location, index) => (
        <>
          <OverlayView
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <CustomMarker
              price={location.price}
              isActive={activeMarkerIndex === location.id}
              onClick={() => handleMarkerClick(location.id, location)}
            />
          </OverlayView>
        </>
      ));

      // Set the overlayViews state with the loaded overlayViews
      setOverlayViews(loadedOverlayViews);
    }
  }, [mapLoaded, locations, activeMarkerIndex]);

  const handleMarkerClick = (id, loc) => {
    setActiveMarkerIndex(id);
    setMarkerClicked(true);
    setBoxVisible(true);
    setSelectedAd(id);
    setCityCenter({ lat: loc.lat, lng: loc.lng, zoom: loc.zoom });
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  // const cityCenter = {
  //   lat: state.lat,
  //   lng: state.lng,
  // };

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={state.zoom}
          center={cityCenter}
          options={mapOptions}
          onLoad={handleMapLoad}
        >
          {overlayViews}
        </GoogleMap>
      )}
      {isMarkerClicked && (
        <AdsListSmall
          data={locations}
          isBoxVisible={isBoxVisible}
          setBoxVisible={setBoxVisible}
          activeMarkerIndex={activeMarkerIndex}
        />
      )}
    </>
  );
};

export default MapCreate;
