import axios from "axios";
import { SETTINGS } from "../common/Settings";

export const GrenadesRepository = {
  all: (page, size, searchParams) => {
    if (!searchParams) searchParams = {};
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
  uploadPictures: (grenadeId, pictureType, files) => {
    let data = new FormData();
    Object.keys(files).forEach((key) => data.append("files", files[key]));
    if (!pictureType) pictureType = "OTHER";
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/uploadGrenadeImage/${grenadeId}`,
      data: data,
      method: "PUT",
      params: {
        pictureType: pictureType,
      },
    });
  },
  removePicture: (grenadeId, picture) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/removePicture/${grenadeId}`,
      method: "DELETE",
      data: picture,
    });
  },
  pictureTypes: () => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/pictureTypes`,
      method: "GET",
    });
  },
  updatePictureType: (grenadeId, pictureId, pictureType) => {
    return axios({
      url: `${SETTINGS.API_BASE_URL}grenades/updatePictureType/${grenadeId}`,
      method: "PUT",
      params: {
        pictureId: pictureId,
        pictureType: pictureType,
      },
    });
  },
};
