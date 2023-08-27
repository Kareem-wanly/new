import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { useTranslation } from "react-i18next";

const PaginationAds = ({
  handlePageChange,
  current_page,
  per_page,
  last_page,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const theme = createTheme({
    direction: lang === "ar" ? "rtl" : "ltr",
    palette: {
      primary: {
        main: "#14b183",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Pagination
          page={current_page}
          count={last_page}
          color="primary"
          onChange={handlePageChange}
          sx={{
            "& .Mui-selected": {
              color: "#FFFFFF !important",
              backgroundColor: "#14b183",
              "&:hover": {
                backgroundColor: "#14b183",
              },
            },
            "& .MuiButtonBase-root": {
              fontSize: "14px",
              minWidth: "30px",
            },
            justifyContent: "center",
            marginTop: "2rem",
            display: "flex",
          }}
        />
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default PaginationAds;
