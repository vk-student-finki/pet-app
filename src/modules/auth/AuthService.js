import axios from "axios";
import { useNavigate } from "react-router";
import { SETTINGS } from "../common/Settings";

export const AuthService = {
  authenticate: (username, password) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}auth/authenticate`,
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    });
  },

  logout: () => {
    window.localStorage.removeItem("auth");
    window.location.href = "/signin";
  },

  storeToken: (token) => {
    window.localStorage.setItem("auth", token);
  },

  getToken: () => {
    return window.localStorage.getItem("auth");
  },
};
