import { useEffect, useState } from "react";
import useDataFetcher from "../api/useDataFetcher ";
import { HomeFilter } from "../components";

const Ads = ({ userLocation }) => {
  return (
    <>
      <HomeFilter userLocation={userLocation} />
    </>
  );
};

export default Ads;
