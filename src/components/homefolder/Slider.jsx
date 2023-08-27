import React from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Responsive = {
  0: {
    items: 1.5,
    margin: 5,
  },
  768: {
    items: 2.5,
    margin: 10,
  },
  1024: {
    items: 3.5,
    margin: 20,
  },
};
export default function Slider() {
  return (
    <OwlCarousel responsive={Responsive}>
      <div className="item">
        <div>1</div>
      </div>
      <div className="item">
        <div>2</div>
      </div>
      <div className="item">
        <div>3</div>
      </div>
      <div className="item">
        <div>4</div>
      </div>
    </OwlCarousel>
  );
}
