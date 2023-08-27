import React from "react";
import { useTranslation } from "react-i18next";
import IcomingOrders from "./IncomingOrder/IcomingOrders";

const MyAds = ({ userData }) => {
  const { t } = useTranslation();
  return (
    <IcomingOrders
      userData={userData}
      title={t("user_dashboard.incoming_orders.page_title")}
    />
  );
};

export default MyAds;
