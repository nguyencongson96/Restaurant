import axiosClient from "../utils/axiosClient";

const url = "product";
const infoAPI = {
  getMany: (obj) => {
    const newUrl = obj
      ? ["page", "random", "category", "field"]
          .filter((item) => obj[item] !== undefined)
          .reduce((string, key) => string.concat(`${key}=${obj[key]}&`), `${url}?`)
      : url;
    return axiosClient.get(newUrl);
  },

  getOne: (obj) => {
    const { field, id } = obj;
    return axiosClient.get(`${url}/${id}`, { field });
  },

  addNew: (obj) => axiosClient.post(url, obj),

  updateOne: (obj) => {
    const { _id, ...updateInfo } = obj;
    return axiosClient.put(`${url}/${_id}`, updateInfo);
  },

  deleteOne: (id) => axiosClient.delete(`${url}/${id}`),

  deleteMany: (arr) => axiosClient.delete(url, { id: arr }),
};

export default infoAPI;
