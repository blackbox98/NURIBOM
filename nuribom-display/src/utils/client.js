import axios from "axios";

const BASE_URL = "https://k7b303.p.ssafy.io/api";

export const client = axios.create({
  baseURL: BASE_URL,
});
