import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const GrenadesRepository = {
  all: (page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades`,
      method: "GET",
      params: {
        page: page,
        size: size,
      },
    });
  },
  get: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/${id}`,
      method: "GET",
    });
  },
  create: (grenade) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades`,
      method: "POST",
      data: grenade,
    });
  },

  deleteGrenade: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/${id}`,
      method: "DELETE",
    });
  },

  updateGrenade: (grenade) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades`,
      method: "PUT",
      data: grenade,
    });
  },
};
