import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const ProducersRepository = {
  all: (page, size) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers`,
      method: "GET",
      params: {
        page: page,
        size: size,
      },
    });
  },
  get: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers/${id}`,
      method: "GET",
    });
  },
  create: (producer) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers`,
      method: "POST",
      data: producer,
    });
  },

  delete: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers/${id}`,
      method: "DELETE",
    });
  },

  update: (producer) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers`,
      method: "PUT",
      data: producer,
    });
  },
};
