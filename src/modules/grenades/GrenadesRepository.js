import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const GrenadesRepository = {
  all: (page, size, searchParams) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades`,
      method: "GET",
      params: {
        page: page,
        size: size,
        searchParams: searchParams,
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
  filterGrenades: (producerID, countryID, page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/filter`,
      method: "GET",
      params: {
        producerID: producerID,
        countryID: countryID,
        page: page,
        size: size,
      },
    });
  },
};
