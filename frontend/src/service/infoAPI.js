import axiosClient from "../utils/axiosClient";

const url = "info/";
const infoAPI = {
  logIn: (password) => axiosClient.post(`${url}login`, { password }),
  logOut: () => axiosClient.post(`${url}logout`),
  get: (obj) => {
    const { detail, field } = obj;
    return axiosClient.get(`${url}?detail=${detail}`, { field });
  },
  update: (obj) => axiosClient.put(url, obj),
};

export default infoAPI;
