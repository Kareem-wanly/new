import React from "react";
import { OverlayView } from "@react-google-maps/api";

const CustomMarker = ({ price, position }) => {
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "translate(-50%, -100%)",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          padding: "0px 5px",
          height: "35px",
          backgroundColor: "rgb(255, 255, 255)",
          border: "2px solid rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "15px",
          fontFamily: "Tajawal",
          boxShadow: "rgba(0, 0, 0, 0.34) 0px 3px 6px",
        }}
      >
        <span>{price} ر.س</span>
      </div>
    </OverlayView>
  );
};

export default CustomMarker;