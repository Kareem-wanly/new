import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payment";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WifiIcon from "@mui/icons-material/Wifi";
import BedIcon from "@mui/icons-material/Bed";
import PriceSlider from "./PriceSlider";
import CheckBoxHome from "./CheckBoxHome";
import RoomsNumber from "./RoomsNumber";
import { useTranslation } from "react-i18next";
import useDebounce from "../Loading/useDebounce";
import useDataFetcher from "../../api/useDataFetcher ";
import ChecBoxPlusFeature from "./ChecBoxPlusFeature";
// import styles from "../../styles/Accordinfilter.module.css";

// const checkboxeshome = [
//   { id: 1, label: "مزرعة" },
//   { id: 2, label: "فيلا" },
//   { id: 3, label: "بيت" },

//   // Add more checkboxes as needed
// ];
const checkboxesextra = [
  { id: 1, label: "انترنت" },
  { id: 2, label: "سماعات" },
  { id: 3, label: "Choice C" },
];
const SearchBoxHome = ({ setFilterProps, FilterProps }) => {
  const {
    data: dataFilterCities,
    isLoading: isLoadingFilterCities,
    get: getFilterCities,
  } = useDataFetcher();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [title, setTitle] = useState("");
  const debouncedTitle = useDebounce(title, 500);
  const [spaceValue2, setSpaceValue] = useState("");
  const debouncedInputValue2 = useDebounce(spaceValue2, 500);
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedValue3, setSelectedValue3] = useState("");
  const [FilterCities, setFilterCities] = useState([]);
  const [FilterNeighborhoods, setFilterNeighborhoods] = useState([]);
  useEffect(() => {
    getFilterCities(`/api/settings/search_data`);
  }, []);
  useEffect(() => {
    if (dataFilterCities) {
      setFilterCities(dataFilterCities?.cities ?? []);
      setFilterNeighborhoods(dataFilterCities?.neighborhoods ?? []);
    }
  }, [dataFilterCities]);

  useEffect(() => {
    setFilterProps((prev) => ({
      ...prev,
      title: debouncedTitle !== "" ? debouncedTitle : null,
    }));
  }, [debouncedTitle, setFilterProps]);
  useEffect(() => {
    if (!FilterProps?.title) {
      setTitle("");
    }
  }, [FilterProps?.title]);
  useEffect(() => {
    if (!FilterProps?.space) {
      setSpaceValue("");
    }
  }, [FilterProps?.space]);

  useEffect(() => {
    if (!FilterProps?.neighborhood) {
      setSelectedValue2("");
    }
  }, [FilterProps?.neighborhood]);
  useEffect(() => {
    if (!FilterProps?.interface_id) {
      setSelectedValue3("");
    }
  }, [FilterProps?.interface_id]);
  useEffect(() => {
    setFilterProps((prev) => ({
      ...prev,
      space: debouncedInputValue2 !== "" ? debouncedInputValue2 : null,
    }));
  }, [debouncedInputValue2, setFilterProps]);

  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
    const neighborhood = event.target.value;
    setFilterProps((prev) => ({
      ...prev,
      neighborhood: neighborhood,
    }));
  };
  const handleChange3 = (event) => {
    setSelectedValue3(event.target.value);
    const categoryId = event.target.value;

    // Call setFilterProps with the updated category_id
    setFilterProps((prev) => ({
      ...prev,
      interface_id: categoryId,
    }));
  };
  if (isLoadingFilterCities) {
    return "load";
  }
  return (
    <>
      <Box>
        <InputLabel sx={{ color: "black" }}>
          {t("advertisements_page.filter_sec.filter1_info.input1")}
        </InputLabel>
        <Input
          placeholder={t(
            "advertisements_page.filter_sec.filter1_info.placeholder1"
          )}
          sx={{ width: "100%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Box sx={{ marginX: "0.2rem", width: "100%" }}>
          <InputLabel sx={{ color: "black" }}>
            {" "}
            {t("advertisements_page.filter_sec.filter1_info.input2")}
          </InputLabel>
          <Input
            placeholder="400"
            sx={{ width: "100%" }}
            value={spaceValue2}
            onChange={(e) => setSpaceValue(e.target.value)}
          />
        </Box>
        {/* <Box sx={{ marginX: "0.2rem" }}>
          <InputLabel sx={{ color: "black" }}>
            {" "}
            {t("advertisements_page.filter_sec.filter1_info.input3")}
          </InputLabel>
          <Input placeholder="2" sx={{ width: "100%", marginX: "0.2rem" }} />
        </Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          direction: lang === "ar" && "rtl !important",
        }}
      >
        <Box>
          <InputLabel
            sx={{ color: "black", marginBottom: "0.5rem" }}
            shrink={false}
          >
            {" "}
            {t("advertisements_page.filter_sec.filter1_info.input4")}
          </InputLabel>
          <Select
            value={FilterProps?.city ? FilterProps?.city : ""}
            onChange={(event) => {
              setFilterProps((prev) => ({
                ...prev,
                city: event.target.value,
              }));
            }}
            // displayEmpty
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.42)",

              "& .MuiSvgIcon-root": {
                right: "unset",
                left: "7px",
              },
              "& .MuiInputBase-input": {
                paddingLeft: "32px",
                paddingRight: "10px !important",
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>
                {t("advertisements_page.filter_sec.filter1_info.placeholder4")}
              </em>
            </MenuItem>
            {FilterCities?.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <InputLabel
            sx={{ color: "black", marginBottom: "0.5rem" }}
            shrink={false}
          >
            {t("advertisements_page.filter_sec.filter1_info.input5")}
          </InputLabel>
          <Select
            value={FilterProps?.neighborhood ? FilterProps?.neighborhood : ""}
            onChange={(event) => {
              setFilterProps((prev) => ({
                ...prev,
                neighborhood: event.target.value,
              }));
            }}
            displayEmpty
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.42) !important",
              boxShadow: "none !important",

              "& .MuiSvgIcon-root": {
                right: "unset",
                left: "7px",
              },
              "& .MuiInputBase-input": {
                paddingLeft: "32px",
                paddingRight: "10px !important",
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>
                {t("advertisements_page.filter_sec.filter1_info.placeholder5")}
              </em>
            </MenuItem>
            {FilterNeighborhoods?.map((neigh, index) => (
              <MenuItem key={index} value={neigh}>
                {neigh}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          direction: lang === "ar" && "rtl !important",
        }}
      >
        <Box>
          <InputLabel
            sx={{ color: "black", marginBottom: "0.5rem" }}
            shrink={false}
          >
            {" "}
            {t("advertisements_page.filter_sec.filter1_info.input6")}
          </InputLabel>
          <Select
            value={FilterProps?.interface_id ? FilterProps.interface_id : ""}
            onChange={(event) => {
              setFilterProps((prev) => ({
                ...prev,
                interface_id: event.target.value,
              }));
            }}
            displayEmpty
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.42)",

              "& .MuiSvgIcon-root": {
                right: "unset",
                left: "7px",
              },
              "& .MuiInputBase-input": {
                paddingLeft: "32px",
                paddingRight: "10px !important",
              },
              "& .MuiSelect-selectMenu": {
                maxHeight: "100px",
                overflowY: "scroll",

                "& .MuiList-root": {
                  maxHeight: "100px",
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>
                {t("advertisements_page.filter_sec.filter1_info.placeholder6")}
              </em>
            </MenuItem>
            <MenuItem value="1">
              {lang === "ar" ? "غير محدد " : "...."}
            </MenuItem>
            <MenuItem value="2">{lang === "ar" ? " شمال " : "North"}</MenuItem>
            <MenuItem value="3">{lang === "ar" ? " شرق " : "Eeast"}</MenuItem>
            <MenuItem value="4">{lang === "ar" ? " غرب " : "Weast"}</MenuItem>
            <MenuItem value="5">{lang === "ar" ? " جنوب " : "South"}</MenuItem>
            <MenuItem value="6">
              {lang === "ar" ? " شمال شرقي " : "North-East"}
            </MenuItem>
            <MenuItem value="7">
              {lang === "ar" ? " جنوب شرقي " : "South-East"}
            </MenuItem>
            <MenuItem value="8">
              {lang === "ar" ? " جنوب غربي " : "South-Weast"}
            </MenuItem>
            <MenuItem value="9">
              {lang === "ar" ? " شمال غربي " : "North-Weast"}
            </MenuItem>
            <MenuItem value="10">
              {lang === "ar" ? " شوارع 3  " : "3 Streets"}
            </MenuItem>
            <MenuItem value="11">
              {lang === "ar" ? " شوارع 4  " : "4 Streets"}
            </MenuItem>
          </Select>
        </Box>
      </Box>
    </>
  );
};

const AccordinFilters = ({ setFilterProps, FilterProps, prices }) => {
  const { data, isLoading, get } = useDataFetcher();
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = (accordionId) => {
    setExpanded(accordionId === expanded ? null : accordionId);
  };
  // const [checkboxeshome, setcheckboxeshome] = useState([]);
  // useEffect(() => {
  //   get(`/api/ads/get_categories`);
  // }, []);
  // useEffect(() => {
  //   if (data) {
  //     setcheckboxeshome(data?.categories);
  //   }
  // }, [checkboxeshome]);

  const { t, i18n } = useTranslation();

  const accordionData = [
    {
      id: 1,
      icon: <SearchIcon />,
      title: t("advertisements_page.filter_sec.filter1"),
      content: (
        <SearchBoxHome
          setFilterProps={setFilterProps}
          FilterProps={FilterProps}
        />
      ),
    },
    {
      id: 2,
      icon: <PaymentIcon />,
      title: t("advertisements_page.filter_sec.filter2"),
      content: (
        <PriceSlider
          prices={prices}
          setFilterProps={setFilterProps}
          FilterProps={FilterProps}
        />
      ),
    },
    {
      id: 3,
      icon: <ApartmentIcon />,
      title: t("advertisements_page.filter_sec.filter3"),
      content: (
        <CheckBoxHome
          setFilterProps={setFilterProps}
          FilterProps={FilterProps}
        />
      ),
    },
    {
      id: 4,
      icon: <WifiIcon />,
      title: t("advertisements_page.filter_sec.filter4"),
      content: (
        <ChecBoxPlusFeature
          setFilterProps={setFilterProps}
          FilterProps={FilterProps}
        />
      ),
    },
    // {
    //   id: 4,
    //   icon: <BedIcon />,
    //   title: t("advertisements_page.filter_sec.filter5"),
    //   content: <RoomsNumber />,
    // },
  ];

  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid rgba(121, 141, 174, 0.16)",
        "@media (max-width: 600px)": {
          border: "none", // No border in xs breakpoint
        },
        marginTop: "3rem",
      }}
    >
      {accordionData.map((accordion, index) => (
        <React.Fragment key={accordion.id}>
          <Accordion
            key={accordion.id}
            expanded={accordion.id === expanded}
            onChange={() => handleAccordionChange(accordion.id)}
            sx={{
              padding: "20px 39px 20px 33px",
              boxShadow: "none",
              borderTopLeftRadius: index === 0 ? "16px !important" : 0,
              borderTopRightRadius: index === 0 ? "16px !important" : 0,
              borderBottomLeftRadius:
                accordionData.length - 1 ? "16px !important" : "0",
              borderBottomRightRadius:
                accordionData.length - 1 ? "16px !important" : "0",
            }}
          >
            <AccordionSummary
              expandIcon={
                accordion.id === expanded ? <MinimizeIcon /> : <AddIcon />
              }
            >
              {accordion.icon}
              <Typography sx={{ fontWeight: "bold", marginX: "0.5rem" }}>
                {" "}
                {accordion.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{accordion.content}</AccordionDetails>
          </Accordion>
          {index !== accordionData.length - 1 && (
            <Box
              sx={{
                width: "100%",
                backgroundColor: "rgb(234, 237, 242)",
                height: "8px",
                "@media (max-width: 600px)": {
                  height: "2px", // No border in xs breakpoint
                },
              }}
            ></Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default AccordinFilters;
