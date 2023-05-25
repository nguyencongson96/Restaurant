import axiosClient from "../utils/axiosClient";

const url = "info";
const infoAPI = {
  logIn: (password) => axiosClient.post(`${url}/login`, { password }),
  logOut: () => axiosClient.post(`${url}/logout`),
  get: (obj) => {
    const newUrl = ["detail", "field"]
      .filter((item) => obj[item] !== undefined)
      .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${url}?`);
    return axiosClient.get(newUrl);
  },
  update: (obj) => axiosClient.put(url, obj),
};

export default infoAPI;
