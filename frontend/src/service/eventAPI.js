import axiosClient from "../utils/axiosClient";

const url = "event";
const infoAPI = {
  getMany: (obj) => {
    const newUrl = obj
      ? ["page", "field"]
          .filter((item) => obj[item] !== undefined)
          .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${url}?`)
      : url;
    return axiosClient.get(newUrl);
  },
  getOne: (id) => axiosClient.get(`${url}/${id}`),
  addNew: (obj) => axiosClient.post(url, obj),
  updateOne: (_id, obj) => axiosClient.put(`${url}/${_id}`, obj),
  deleteOne: (id) => axiosClient.delete(`${url}/${id}`),
};

export default infoAPI;
