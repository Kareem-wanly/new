import React, { useEffect } from "react";
import {
  abha,
  house,
  jeddah,
  exciting_experience,
  Appstore,
  Googleplay,
} from "../../../assets";
import lightGallery from "lightgallery";

const ImagesTest = () => {
  // Sample image data with relative paths from the "public" folder
  const sampleImages = [
    {
      src: process.env.PUBLIC_URL + "/pool.jpg",
    },
    {
      src: process.env.PUBLIC_URL + "/baranda.jpg",
    },
    {
      src: process.env.PUBLIC_URL + "/bedroom.jpg",
    },
    {
      src: process.env.PUBLIC_URL + "/childrenjpg.jpg",
    },
    {
      src: process.env.PUBLIC_URL + "/living.jpg",
    },
    {
      src: process.env.PUBLIC_URL + "/abha.jpg",
    },
  ];

  useEffect(() => {
    // Initialize lightgallery when the component mounts
    const gallery = document.getElementById("lightgallery");
    if (gallery) {
      lightGallery(gallery, {
        dynamic: true, // Use dynamic mode to populate the gallery with images
        dynamicEl: sampleImages,
      });
    }
  }, [sampleImages]);

  return (
    <div id="lightgallery">
      {/* Render all images for lightgallery */}
      {sampleImages.map((image, index) => (
        <a key={index} href={image.src}>
          <img src={image.src} alt={`Image ${index + 1}`} />
        </a>
      ))}
    </div>
  );
};

export default ImagesTest;
