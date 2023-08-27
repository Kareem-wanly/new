import { useState } from "react";
import { myAxios } from "./myAxios";

const useDataFetcher = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await myAxios(url, options);
      setData(response.data);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  const get = async (url, params) => {
    await fetchData(url, {
      method: "GET",
      headers: {
        params: params,
      },
    });
  };

  const post = async (url, data) => {
    await fetchData(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
  };

  return {
    data,
    isLoading,
    error,
    get,
    post,
  };
};

export default useDataFetcher;
