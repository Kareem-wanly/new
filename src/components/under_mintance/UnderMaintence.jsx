import React, { useState, useEffect } from "react";
// import { BgVideo } from "../../assets";
import styles from "./undermaintence.module.css";
import useDataFetcher from "../../api/useDataFetcher ";
import generateCloseMessage from "./generateCloseMessage";
import { Container, Box } from "@mui/material";

const UnderMaintence = () => {
  const { data, isLoading, error, get, post } = useDataFetcher();
  const [mainData, setMainData] = useState([]);
  useEffect(() => {
    get(`/api/settings/genral`);
  }, []);
  useEffect(() => {
    if (data) {
      setMainData(data?.settings?.close_msg);
    }
  }, [data]);
  console.log(mainData);
  return (
    <Box>
      <video autoPlay muted controls className={styles.video_Style}>
        <source
          src="https://www.dashboard.aqartik.com/assets/mp4/bg.mp4"
          type="video/mp4"
        />
      </video>
      <div className={styles.div_video_style}>
        {/* <div className={styles.div_video_content}>
          <h1 className={styles.heading1}>Soon back </h1>
          <h1 className={styles.heading2}>ستارتك العقاري</h1>
          <h5 className={styles.under_maintece}>
            المنصة قيد التطوير نعتذر لازعاجكم
          </h5>
          <h5 className={styles.under_maintece} style={{ marginTop: "3rem" }}>
            تطوير ستارتك
          </h5>
          <p className={styles.programming}>
            Programming:
            <a href="/" style={{ color: "#BCA53B", marginLeft: "10px" }}>
              sta.sa
            </a>
          </p>
        </div> */}
        <div
          className={styles.div_video_content}
          dangerouslySetInnerHTML={{
            __html: mainData,
          }}
        ></div>
      </div>
      {/* {mainData && (
        <div className="{styles.div_video_style}">
           
          <div
            className={styles.appendedContent}
           
          />
        </div>
      )} */}
    </Box>
  );
};

export default UnderMaintence;
