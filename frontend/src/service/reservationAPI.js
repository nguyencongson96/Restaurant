import axiosClient from "../utils/axiosClient";

const url = "reservation/user";
const reservationAPI = {
  getMany: (obj) => {
    const newUrl = ["phone", "field"]
      .filter((item) => obj[item] !== undefined)
      .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${url}?`);
    return axiosClient.get(newUrl);
  },
  getOne: (obj) => {
    const newUrl = ["_id", "phone", "field"]
      .filter((item) => obj[item] !== undefined)
      .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${url}/view?`);
    return axiosClient.get(newUrl);
  },
  addNew: (obj) => axiosClient.post(url, obj),
};

export default reservationAPI;
