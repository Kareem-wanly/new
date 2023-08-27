import { useEffect, useState } from "react";
import useDataFetcher from "./useDataFetcher ";

const useWebsiteInfoFetcher = () => {
  const { data: fetchedData, get: getWebsiteInfo } = useDataFetcher();
  const [websiteInfoData, setWebsiteInfoData] = useState(null);

  useEffect(() => {
    const storedWebsiteInfoData = localStorage.getItem("websiteInfoData");
    if (storedWebsiteInfoData) {
      setWebsiteInfoData(JSON.parse(storedWebsiteInfoData));
    } else {
      getWebsiteInfo("/api/settings/genral");
    }
  }, []);

  useEffect(() => {
    if (fetchedData) {
      setWebsiteInfoData(fetchedData);
      localStorage.setItem("websiteInfoData", JSON.stringify(fetchedData));
    }
  }, [fetchedData]);
  console.log(websiteInfoData);

  return websiteInfoData;
};

export default useWebsiteInfoFetcher;
