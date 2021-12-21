import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const ProducersRepository = {
  all: (page, size, searchParams) => {
    if (!searchParams) searchParams = {};
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers`,
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

  deleteProducer: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers/${id}`,
      method: "DELETE",
    });
  },

  updateProducer: (producer) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}producers`,
      method: "PUT",
      data: producer,
    });
  },
};
