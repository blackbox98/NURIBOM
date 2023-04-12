import axios from "axios";

// const BASE_URL = "http://localhost:8081/api";
const BASE_URL = "https://k7b303.p.ssafy.io/api";
// const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
// const Authorization = "Authorization";
export const client = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
  //   "Content-type": "application/json",
  // },
});

client.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  // const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");

  if (!accessToken) {
    config.headers["Authorization"] = null;
    return config;
  }

  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});
