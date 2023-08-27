import React, { useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapLocation = ({ lat, lng }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
  };

  const defaultCenter = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapLocation;
