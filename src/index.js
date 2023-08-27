import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/700.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Login } from "./components";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import { ChatProvider } from "./context/chatContext";
import { GeneralProvider } from "./context/generalContext";
const MainApp = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Tajawal, Arial, sans-serif",
    },
  });
  const { i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    // Update CSS variables based on language
    document.documentElement.style.setProperty(
      "direction",
      language === "ar" ? "rtl" : "ltr"
    );

    document.documentElement.style.setProperty(
      "text-align",
      language === "ar" ? "right" : "left"
    );
  }, [language]);

  localStorage.setItem("isNewHome", "true");
  setTimeout(() => {
    localStorage.setItem("isNewHome", "false");
  }, 48 * 60 * 60 * 1000);

  return (
    <>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <ChatProvider>
            <GeneralProvider>
              <App />
            </GeneralProvider>
          </ChatProvider>
        </I18nextProvider>
      </ThemeProvider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainApp />);

reportWebVitals();
