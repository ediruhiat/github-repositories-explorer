import type { AxiosInstance } from "axios";
import axios from "axios";
import { API_BASE_URL } from "./envLoader";

const rest: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default rest;
