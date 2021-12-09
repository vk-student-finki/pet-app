import Axios from "axios";
import { AuthService } from "../auth/AuthService";

export default {
  setupInterceptors: (store) => {
    // Add a request interceptor
    Axios.interceptors.request.use(
      function (config) {
        console.log("test");
        // Do something before request is sent
        if (window.localStorage.getItem("auth")) {
          config.headers[
            "Authorization"
          ] = `Bearer ${window.localStorage.getItem("auth")}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    Axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (err) {
        console.log(err.response);
        if (err?.response?.data?.message) {
          if (err.response.data.message.includes("JWT expired at")) {
            AuthService.logout();
          }
        }
        if (err?.response?.status == 403) {
          AuthService.logout("/");
        }
        return Promise.reject(err);
      }
    );
  },
};
