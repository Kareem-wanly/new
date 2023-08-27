import React, { useEffect, useState } from "react";

import {
  MainSection,
  ImportantCities,
  Titles,
  TabsFilter,
  PaginationAds,
} from "../../components";

import { Addads } from "../addadsolder";
import { Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDataFetcher from "../../api/useDataFetcher ";
import { Skeleton } from "@mui/material";
import SkeleltonSpeacialAds from "../Loading/SkeleltonSpeacialAds";
import LoaderHome from "../Loading/LoaderHome";
import { myAxios } from "../../api/myAxios";
import { useLocation } from "react-router";

const Home = ({ userLocation }) => {
  const [per_page, set_per_page] = useState();

  const [current_page, set_current_page] = useState();
  const [ads, setAds] = useState([]);
  const [last_page, set_last_page] = useState();
  const [dataLoading, setDataLoading] = useState(true);
  // const { data, isLoading, error, get, post } = useDataFetcher();
  const [FilterProps, setFilterProps] = useState({ page: 1 });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   get(`/api/ads/get_all_ads?page=${current_page}`);
  // }, [current_page]);

  // useEffect(() => {
  //   if (data) {
  //     set_current_page(data.ads.current_page);
  //     set_per_page(data.ads.per_page);
  //     setAds(data.ads.data);
  //     set_last_page(data.ads.last_page);
  //   }
  //   // console.log(current_page);
  // }, [data]);
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    myAxios
      .get(`/api/deal/get_all_deal`, { params: FilterProps })
      .then((res) => {
        // console.log(res)
        setData(res.data.ads.data);
        if (res.data) {
          set_per_page(res.data.ads.per_page);
          // setAds(data.ads.data);
          set_last_page(res.data.ads.last_page);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      });
  }, [
    FilterProps.page,
    FilterProps?.topView,
    FilterProps?.topPrice,
    FilterProps?.minPrice,
    FilterProps?.topRate,
    FilterProps?.lat,
    FilterProps?.lng,
  ]);
  const { t } = useTranslation();

  const handlePageChange = (event, new_page) => {
    // set_current_page(new_page);
    setFilterProps((prev) => ({ ...prev, page: new_page }));
  };

  return (
    <>
      {dataLoading && <LoaderHome />}
      <Box sx={{ marginTop: { xs: "6rem", md: "12rem" } }}>
        <MainSection setDataLoading={setDataLoading} />
        <ImportantCities />
        <Container>
          <Box
            sx={{
              marginY: "3rem",
              marginX: "auto",
            }}
          >
            <Titles title={t("homepage.titles.title2")}></Titles>

            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <SkeleltonSpeacialAds key={index} />
              ))
            ) : (
              <>
                <TabsFilter
                  data={data}
                  userLocation={userLocation}
                  FilterProps={FilterProps}
                  setFilterProps={setFilterProps}
                />
                <PaginationAds
                  handlePageChange={handlePageChange}
                  current_page={FilterProps.page}
                  per_page={per_page}
                  last_page={last_page}
                />
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
