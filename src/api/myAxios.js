import axios from "axios";

export const myAxios = axios.create({
  baseURL: "https://www.dashboard.aqartik.com/",
  headers: {
    authorization: `Bearer ${localStorage.getItem("user_token")}`,
  },
});
