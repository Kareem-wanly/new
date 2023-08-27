import { OfficesContainer } from "../../styledComponents/OfficesStyles";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SpecialAds } from "../../components";
import useDataFetcher from "../../api/useDataFetcher ";
import PaginationAds from "../../components/Filter/PaginationAds";
import { DefaultImage } from "../../assets";
const Offices = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [rating, setRating] = useState(700);
  const nav = useNavigate();
  const [per_page, set_per_page] = useState();
  const [current_page, set_current_page] = useState();
  const [ads, setAds] = useState([]);
  const [last_page, set_last_page] = useState();
  const [offices, setOffices] = useState();
  const [cityFilter, setCityFilter] = useState("");
  const {
    data: officesData,
    isLoading: isOfficesLoading,
    get: getOffices,
  } = useDataFetcher();

  useEffect(() => {
    getOffices(
      `api/user/get_all_offices`
      // &category_id=${adInfo.category_aqar.id}
    );
  }, [current_page]);
  const handleOfficeClick = (office) => {
    // nav(`/offices/office/${office.id}`, { state: { office } });

    nav(`/offices/office/${office.id}`);
  };

  useEffect(() => {
    if (officesData) {
      setOffices(officesData.offices.data);
      // console.log(offices);
      set_current_page(officesData.offices.current_page);
      set_per_page(officesData.offices.per_page);

      set_last_page(officesData.offices.last_page);
    }
  }, [officesData]);

  const handlePageChange = (event, new_page) => {
    set_current_page(new_page);
  };
  const getMatchcity = () => {
    getOffices(`api/user/get_all_offices?city=${cityFilter}`);
  };
  useEffect(() => {
    getOffices(`api/user/get_all_offices?city=${cityFilter}`);
  }, [cityFilter]);
  return (
    <>
      <OfficesContainer>
        <h2>{t("offices.title")}</h2>
        <header>
          <span>{t("offices.label")}</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Perform the search when the user clicks "بحث"
              getOffices(
                `api/user/get_all_offices?city=${cityFilter}&page=${current_page}`
              );
            }}
          >
            <input
              type="text"
              placeholder={t("offices.placeholder")}
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
            <button type="submit">بحث</button>
          </form>
        </header>

        <section>
          {offices?.map((office, index) => (
            <article>
              <div key={office.id}>
                <div className="office-header">
                  <span>{t("offices.office")}:</span>

                  <span>
                    {t("offices.review")}:
                    <span>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </span>
                  </span>
                </div>
                <h4 className="office-name">{office.company_name}</h4>
              </div>
              <img
                className="office-img"
                src={
                  `https://www.dashboard.aqartik.com/assets/images/users/logo/${office.image.name}` ||
                  DefaultImage
                }
                alt=""
              />
              <button onClick={() => handleOfficeClick(office)}>
                <NoteAddOutlinedIcon /> {t("offices.main_btn")}
              </button>
              <div className="office-footer">
                <span>
                  <LocationOnIcon />
                  المدينة{" "}
                </span>
                <span>{office.city}</span>
              </div>
            </article>
          ))}
        </section>
      </OfficesContainer>

      <Box>
        {isOfficesLoading ? (
          ""
        ) : (
          <PaginationAds
            handlePageChange={handlePageChange}
            current_page={current_page}
            per_page={per_page}
            last_page={last_page}
          />
        )}
      </Box>
    </>
  );
};

export default Offices;
