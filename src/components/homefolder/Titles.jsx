import React from "react";
import { Typography } from "@mui/material";
import styles from "../../styles/home.module.css";

const Titles = (props) => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: "var(--green-color)",
          fontSize: {xs:"20px" , md:"25px"},
          fontWeight: "600",
          marginTop: "3rem",
        }}
      >
        {props.title}
      </Typography>
      <div className={styles.barPurple}></div>
    </>
  );
};

export default Titles;
