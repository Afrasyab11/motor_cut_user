import axios from "axios";
import { getCookie } from "cookies-next";
export const baseDomain = "https://backend.motor-cut.com/";
// export const baseDomain ="http://192.168.18.30:8000/"
// export const baseDomain = "http://192.168.18.30:8000/";

export const axiosInstance = axios.create({
  baseURL: baseDomain,
  // timeout: 15000,
});

const ResponseInterceptor = (response) => {
  return response;
};

const RequestInterceptor = (config) => {
  config.headers.token = getCookie("token");
   return config;
};
axiosInstance.interceptors.request.use(RequestInterceptor);
axiosInstance.interceptors.response.use(ResponseInterceptor, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 509;
  if (!expectedErrors) {
    return Promise.reject(error.response);
  } else {
    return Promise.reject(error.response);
  }
});
