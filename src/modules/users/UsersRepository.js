import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const UsersRepository = {
  getAll: (page, size, searchParams) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}users`,
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
      url: `${SETTINGS.API_BASE_URL}users/${id}`,
      method: "GET",
    });
  },
  create: (user) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}users/create`,
      method: "POST",
      data: user,
    });
  },

  deleteUser: (id) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}users/${id}`,
      method: "DELETE",
    });
  },

  updateUser: (id, user) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}users`,
      method: "PUT",
      data: user,
    });
  },
};
