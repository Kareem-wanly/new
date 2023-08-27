import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Star = ({ isSpecial }) => {
  return (
    <div style={{ alignItems: "center", display: "flex", cursor: "pointer" }}>
      {isSpecial ? (
        <StarIcon sx={{ color: "gold", fontSize: "2rem" }} />
      ) : (
        <StarBorderIcon
          sx={{ color: "black", marginLeft: "3px", fontSize: "2rem" }}
        />
      )}
    </div>
  );
};

export default Star;
