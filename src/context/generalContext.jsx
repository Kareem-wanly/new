import { createContext, useState, useEffect } from "react";
import useDataFetcher from "../api/useDataFetcher ";
import Cookies from "js-cookie";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const { data, isLoading, error, get, post } = useDataFetcher();
  const [generalData, setGeneralData] = useState([]);
  const [website_status, set_website_status] = useState(null);

  useEffect(() => {
    // if (generalData) return null;
    get("/api/settings/genral");
  }, []);

  useEffect(() => {
    if (data) {
      setGeneralData(data?.settings);
      set_website_status(data?.settings?.site_status);

      // Save fetched data to cookies
      // Cookies.set("generalData", JSON.stringify(data?.settings));
      // Cookies.set("website_status", data?.settings?.site_status?.toString());
      // set_website_status(0);
    }
  }, [data]);

  return (
    <GeneralContext.Provider
      value={{
        generalData,
        website_status,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
