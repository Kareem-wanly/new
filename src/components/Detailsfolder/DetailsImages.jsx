import React, { useEffect, useRef, useState } from "react";
import lightGallery from "lightgallery";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import "../../styles/detailsimages.css";
import { Button, useMediaQuery, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import screenfull from "screenfull";

export default function DetailsImages({ adInfo }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const galleryRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const gallery = lightGallery(galleryRef.current, {
      mode: "lg-fade",
    });

    return () => {
      gallery.destroy();
    };
  }, []);

  // const images =
  // [
  //   {
  //     src: "/pool.jpg",
  //   },
  //   {
  //     src: "/baranda.jpg",
  //   },
  //   {
  //     src: "/bedroom.jpg",
  //   },
  //   {
  //     src: "/childrenjpg.jpg",
  //   },
  //   {
  //     src: "/living.jpg",
  //   },
  //   {
  //     src: "/abha.jpg",
  //   },
  //   {
  //     src: "/parking.jpg",
  //   },
  //   {
  //     src: "/house.jpg",
  //   },
  // ];
  const images = adInfo.gallery;
  const gridTemplate = {
    1: "1fr",
    2: "1fr 1fr",
    3: "1fr 2fr",
    4: "2fr 2fr ",
    5: "2fr 2fr  4fr ",
  };
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const displayImages = isXsScreen
    ? images.slice(0, 1)
    : showMore
    ? images
    : images.slice(0, 5);
  const totalImages = displayImages.length;

  const handleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };
  const openLightGallery = (index) => {
    const lg = document.getElementById("lightgallery");
    if (lg) {
      // Add your lightgallery configurations here, if needed
      lg.style.display = "block"; // Show the lightgallery container
      lg.innerHTML = ""; // Clear previous content if any
      const items = images.map((image) => ({
        src: image.src,
        thumb: image.src,
      }));
      lightGallery(lg, {
        dynamic: true,
        dynamicEl: items,
        index,
      });
    }
  };
  const openVideoFullScreen = () => {
    setShowVideo(true);

    const video = videoRef.current;
    if (video) {
      if (screenfull.isEnabled) {
        if (!screenfull.isFullscreen) {
          screenfull.request(video);
          setShowVideo(true);
        }
      }
    }
  };
  useEffect(() => {
    if (!screenfull.isFullscreen) {
      setShowVideo(false);
    }

    // const handleFullscreenChange = () => {
    //   if (!screenfull.isFullscreen) {
    //     setShowVideo(false); // Exit full-screen, set showVideo to false
    //   }
    // };

    // screenfull.on("fullscreenchange", handleFullscreenChange);

    // return () => {
    //   // Remove the listener when the component unmounts
    //   screenfull.off("fullscreenchange", handleFullscreenChange);
    // };
  }, [screenfull.isFullscreen, screenfull]);
  return (
    <div style={{ marginBottom: "2rem", position: "relative" }}>
      <Box
        ref={galleryRef}
        sx={{
          display: "grid",
          gridTemplateColumns: gridTemplate[totalImages],
          gap: "10px",
          borderRadius: "20px",
          overflow: "hidden",
          height: { xs: "250px", md: "508px" },
          position: "relative",
          direction: "ltr",
        }}
      >
        {images.map((image, index) => (
          <a
            key={image.src}
            // data-lg-size="1406-1390"
            className="gallery-item"
            data-src={` https://www.dashboard.aqartik.com/assets/images/deal/image/${image.name}`}
            style={{
              height:
                totalImages === 1
                  ? "508px"
                  : (totalImages === 2 && "508px") ||
                    (totalImages === 2 && "508px") ||
                    (totalImages === 3 && index === 1 && "508px") ||
                    (totalImages === 3 &&
                      (index === 2 || index === 0) &&
                      "254px") ||
                    (totalImages === 4 && "254px") ||
                    (totalImages === 5 && index === 2 && "508px") ||
                    "254px",
              marginTop:
                (totalImages === 3 && index === 2) ||
                (totalImages === 5 && (index === 3 || index === 4))
                  ? "-16rem"
                  : "0",
            }}
          >
            <img
              src={` https://www.dashboard.aqartik.com/assets/images/deal/image/${image.name}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </a>
        ))}
        {adInfo.video ? (
          <a
            className="gallery-item"
            data-src={` https://www.dashboard.aqartik.com/assets/images/deal/video/${adInfo.video.name}`}
          >
            <video
              ref={videoRef}
              id="videoElement"
              src={` https://www.dashboard.aqartik.com/assets/images/deal/video/${adInfo.video.name}`}
              controls
              style={{ width: "500px", height: "300px" }}
            ></video>
          </a>
        ) : (
          ""
        )}
      </Box>

      {/* <Box sx={{ display: showVideo ? "block" : "none" }}>
        <video
          ref={videoRef}
          id="videoElement"
          src={` https://www.dashboard.aqartik.com/assets/images/ads/video/${adInfo.video.name}`}
          controls
          style={{ width: "500px", height: "300px" }}
        ></video>
      </Box> */}

      {adInfo?.video ? (
        <Button
          style={{
            marginTop: "10px",
            position: "absolute",
            bottom: "16px",
            right: "175px",
            zIndex: "9",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(15px)",
            color: "rgb(255, 255, 255)",
            borderRadius: "12px",
            height: "48px",
            fontSize: "15px",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
            border: "none",
            padding: "0rem 1rem ",
            alignItems: "center",
            display: "flex",
          }}
          onClick={openVideoFullScreen}
        >
          عرض الفيديو
        </Button>
      ) : (
        ""
      )}
      {!showMore && (
        <Button
          onClick={handleShowMore}
          style={{
            marginTop: "10px",
            position: "absolute",
            bottom: "16px",
            right: "16px",
            zIndex: "9",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(15px)",
            color: "rgb(255, 255, 255)",
            borderRadius: "12px",
            height: "48px",
            fontSize: "15px",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
            border: "none",
            padding: "0rem 1rem ",
            alignItems: "center",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <PhotoLibraryOutlinedIcon sx={{ marginX: "0.2rem" }} />
          عرض كل الصور
        </Button>
      )}
      {/* {adInfo.video && (
       
      )} */}
    </div>
  );
}
