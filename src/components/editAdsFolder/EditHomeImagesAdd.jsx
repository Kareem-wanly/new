import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import EditCropeerImage from "./EditCropeerImage";
import DeleteIcon from "@mui/icons-material/Delete";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useTranslation } from "react-i18next";
// import Image from "next/image";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EditHomeImagesAdd = ({
  formData,
  setFormData,
  images,
  setImages,
  selectedImage,
  setSelectedImage,
  thumbnail,
  setThumbnail,
  selectedImages,
  setSelectedImages,
  type,
  deletedImages,
  setDeletedImages,
  readyImages,
  setReadyImages,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedVideoFile, setSelectedVideoFile] = useState(
    formData.selectedVideoFile || null
  );

  useEffect(() => {
    // Update the formData when selectedImages or selectedVideoFile changes
    if (selectedVideoFile) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        video: selectedVideoFile,
      }));
    }
  }, [selectedVideoFile]);

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleDeleteReadyImages = (index) => {
    setReadyImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== index);
      return updatedImages;
    });
    setDeletedImages((prev) => [...prev, index]);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: selectedImages, // Append new blob to the array
    }));
  }, [selectedImages]);

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size / 1024; // Size in KB
    if (fileSize <= 40000) {
      setSelectedVideoFile(file);
    } else {
      setSelectedVideoFile(null);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("video-input").click();
    if (selectedVideoFile) {
      // Clear the selected video file
      setSelectedVideoFile(null);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "24px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {t("user_dashboard.property_images.title")}
      </Typography>
      <Box sx={{ color: "rgb(118, 118, 118)" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
          {t("user_dashboard.property_images.desc1")}
        </Typography>
        <Typography sx={{ marginY: "8px" }}>
          {t("user_dashboard.property_images.desc2")}
        </Typography>
        <Typography> {t("user_dashboard.property_images.desc3")}</Typography>
      </Box>
      <Box sx={{ marginY: "8px", fontSize: "16px", fontWeight: "600" }}>
        <Typography variant="label">
          {t("user_dashboard.property_images.label1")}
        </Typography>
        <Box>
          <input
            id="video-input"
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
            style={{ display: "none" }}
          />
          <Button
            onClick={handleButtonClick}
            sx={{
              minWidth: "64px",
              padding: "6px 8px",
              width: "100%",
              height: "200px",
              border: "1px dashed gray",
              marginY: "1rem",
            }}
          >
            {selectedVideoFile ? (
              <video
                key={
                  selectedVideoFile ||
                  (formData.video ? formData.video.name : "no-video")
                }
                autoPlay
                style={{ width: "100%", height: "100%" }}
              >
                <source src={URL.createObjectURL(selectedVideoFile)} />
              </video>
            ) : formData.video ? (
              <video autoPlay style={{ width: "100%", height: "100%" }}>
                <source
                  src={`https://www.dashboard.aqartik.com/assets/images/deal/video/${formData.video.name}`}
                />
              </video>
            ) : (
              <Box
                sx={{
                  color: "rgb(118, 118, 118)",
                  fontSize: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <VideoCallIcon
                  sx={{
                    width: "1.5em",
                    height: "1.5em",
                    color: "rgb(118, 118, 118)",
                    display: "block",
                    margin: "auto",
                  }}
                />
                <Typography>
                  {" "}
                  {t("user_dashboard.property_images.btn1")}{" "}
                </Typography>
              </Box>
            )}
          </Button>
        </Box>

        <Typography variant="label">
          {" "}
          {t("user_dashboard.property_images.label2")}
        </Typography>
        <Typography sx={{ color: "rgb(118, 118, 118)", marginY: "8px" }}>
          {t("user_dashboard.property_images.hint1")}
        </Typography>
        <EditCropeerImage
          type={1}
          isFirstButton={true}
          formData={formData}
          setFormData={setFormData}
          setSelectedImages={setSelectedImages}
          setImages={setImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />

        <Typography variant="label">
          {t("user_dashboard.property_images.label3")}
        </Typography>
        <Typography sx={{ color: "rgb(118, 118, 118)", marginY: "8px" }}>
          {t("user_dashboard.property_images.hint2")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <EditCropeerImage
            type={2}
            width="200px"
            height="120px"
            maxImages={8}
            hasBackground={false} // Set hasBackground prop to false
            formData={formData}
            setFormData={setFormData}
            setSelectedImages={setSelectedImages}
            setImages={setImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
          />
          {type === 1 && (
            <>
              <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {readyImages.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: { xs: "250px", sm: "200px" },
                      height: "120px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "1rem",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "0rem",
                        left: "0rem",
                        color: "white",
                        padding: "0.2rem 0.4rem",
                        borderRadius: "4px",
                        background: "rgba(0, 0, 0, 0.5)",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "12px 0px",
                        backgroundColor: "rgba(17, 17, 17, 0.47)",
                        width: "32px",
                        height: "24px",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </Typography>

                    <img
                      key={index}
                      src={`https://www.dashboard.aqartik.com/assets/images/deal/image/${image.name}`}
                      alt={`Selected Image ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <DeleteIcon
                      sx={{
                        position: "absolute",
                        top: "0rem",
                        right: "0rem",
                        color: "white",
                        cursor: "pointer",
                        // zIndex: 1,
                        padding: "4px",
                        borderRadius: "0px 0px 0px 12px",
                        background:
                          "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                      }}
                      onClick={() => handleDeleteReadyImages(image.id)}
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "250px", sm: "200px" },
                height: "120px",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: "0rem",
                  left: "0rem",
                  color: "white",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  background: "rgba(0, 0, 0, 0.5)",
                  fontSize: "12px",
                  fontWeight: "600",
                  borderRadius: "12px 0px",
                  backgroundColor: "rgba(17, 17, 17, 0.47)",
                  width: "32px",
                  height: "24px",
                  textAlign: "center",
                }}
              >
                {index + 1}
              </Typography>

              <img
                key={index}
                src={image}
                alt={`Selected Image ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <DeleteIcon
                sx={{
                  position: "absolute",
                  top: "0rem",
                  right: "0rem",
                  color: "white",
                  cursor: "pointer",
                  // zIndex: 1,
                  padding: "4px",
                  borderRadius: "0px 0px 0px 12px",
                  background:
                    "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                }}
                onClick={() => handleDeleteImage(index)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EditHomeImagesAdd;
