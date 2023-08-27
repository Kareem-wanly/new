import { OfficeContainer } from "../../styledComponents/OfficeSyles";
import StarIcon from "@mui/icons-material/Star";
import CallIcon from "@mui/icons-material/Call";
import { useLocation, useParams } from "react-router";
import useDataFetcher from "../../api/useDataFetcher ";
import { useEffect, useState } from "react";
import { Special } from "../../assets";
import { Box, Typography } from "@mui/material";
import { SpecialAds } from "../../components";
import PaginationAds from "../../components/Filter/PaginationAds";
import { useTranslation } from "react-i18next";
import { AlamOffice, Verrfird, DefaultImage } from "../../assets";

const Office = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const officeId = useParams().id;
  const [officeDetails, setOfficeDetails] = useState();
  const [per_page, set_per_page] = useState();
  const [current_page, set_current_page] = useState();
  const [ads, setAds] = useState([]);
  const [last_page, set_last_page] = useState();

  const { data, isLoading, get } = useDataFetcher();

  useEffect(() => {
    get(`api/user/get_office_details/${officeId}`);
  }, [officeId]);
  useEffect(() => {
    if (data) {
      setOfficeDetails(data?.office);
    }
  }, [data]);

  // useEffect(() => {
  //   if (officesData) {
  //     setOffices(officeDetails.offices.data);
  //     // console.log(offices);
  //     set_current_page(officeDetails.offices.current_page);
  //     set_per_page(officeDetails.offices.per_page);

  //     set_last_page(officeDetails.offices.last_page);
  //   }
  // }, [officesData]);

  const handlePageChange = (event, new_page) => {
    set_current_page(new_page);
  };
  console.log(officeDetails);
  const rawDate = officeDetails?.type?.created_at;
  const upatedtime = officeDetails?.type?.updated_at;

  // Convert the raw date string to a JavaScript Date object
  const date = new Date(rawDate);
  const date2 = new Date(upatedtime);

  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedDateupdate = date2.toLocaleDateString("en-US", options);
  return (
    <>
      <OfficeContainer dir="rtl">
        <main>
          <div className="logo" style={{ width: "100px", height: "100px" }}>
            <img
              src={
                `https://www.dashboard.aqartik.com/assets/images/users/logo/${officeDetails?.image.name}` ||
                DefaultImage
              }
              alt=""
              style={{ width: "100%", objectFit: "cover", height: "100%" }}
            />
          </div>
          <h2 className="office-name"> {officeDetails?.company_name} </h2>
          <div className="stars">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <span>{officeDetails?.ads.user_rate}</span>
          </div>
          <div>
            <span>
              تاريخ الانضمام: <span> {formattedDate}</span>
            </span>
          </div>
          <div>
            رقم المعلن في الهيئة العامة للعقار: {officeDetails?.IdNumber}
          </div>
          {/* <button>
          <span>اظهار رقم الهاتف</span>
          <CallIcon />
        </button> */}
          <div className="specialities">
            <span className="speciality">
              <img src={AlamOffice} alt="" className="icon" />
              <span>{formattedDateupdate} </span>
            </span>
            <span className="speciality">
              <img src={Verrfird} alt="" className="icon" />
              <span>عقاري متميز</span>
            </span>
          </div>
        </main>
      </OfficeContainer>
      {/* similar ads */}
      <Box sx={{ marginTop: "4rem" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "var(--green-color)",
            fontSize: { xs: "18px", md: "2rem" },
            marginRight: "1rem",
          }}
        >
          {lang === "ar" ? "عدد الاعلانات" : " Ads Numbers"}
        </Typography>
        <Box sx={{ marginBottom: "2rem" }}>
          {officeDetails?.ads.map((ad, i) => (
            <SpecialAds key={ad.id} ad={ad} />
          ))}
        </Box>
        {/* {isLoading ? (
          ""
        ) : (
          <PaginationAds
            handlePageChange={handlePageChange}
            current_page={current_page}
            per_page={per_page}
            last_page={last_page}
          />
        )} */}
      </Box>
    </>
  );
};

export default Office;
