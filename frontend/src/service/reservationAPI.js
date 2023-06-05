import axiosClient from "../utils/axiosClient";

const urlUser = "reservation/user";
const urlAdmin = "reservation/admin";
const reservationAPI = {
  getManybyUser: (obj) => {
    const newUrl = ["phone", "field"]
      .filter((item) => obj[item] !== undefined)
      .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${urlUser}?`);
    return axiosClient.get(newUrl);
  },
  getOneByUser: (obj) => {
    const newUrl = ["_id", "phone", "field"]
      .filter((item) => obj[item] !== undefined)
      .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${urlUser}/view?`);
    return axiosClient.get(newUrl);
  },
  addNewByUser: (obj) => axiosClient.post(urlUser, obj),
  getManyByAdmin: (obj) => {
    const newUrl = obj
      ? ["page", "random"]
          .filter((item) => obj[item] !== undefined)
          .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${urlAdmin}?`)
      : urlAdmin;
    return axiosClient.get(newUrl);
  },
  getOneByAdmin: (id) => axiosClient.get(`${urlAdmin}/${id}`),
  updateOneByAdmin: (obj) => {
    const { _id, ...rest } = obj;
    return axiosClient.put(`${urlAdmin}/${_id}`, rest);
  },
};

export default reservationAPI;
