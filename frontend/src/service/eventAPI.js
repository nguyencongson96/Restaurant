import axiosClient from "../utils/axiosClient";

const url = "event";
const infoAPI = {
  getMany: (obj) => {
    const newUrl = ["page", "field"]
      .filter((item) => obj[item] !== undefined)
      .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${url}?`);
    return axiosClient.get(newUrl);
  },
  addNew: (obj) => axiosClient.post(url, obj),
  updateOne: (id, obj) => axiosClient.put(`${url}/${id}`, obj),
  deleteOne: (id) => axiosClient.delete(`${url}/${id}`),
};

export default infoAPI;
