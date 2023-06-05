import axiosClient from "../utils/axiosClient";

const url = "place";
const infoAPI = {
  getCityList: () => axiosClient.get(`${url}/city`),
  getDistrictList: (city) => {
    return axiosClient.get(`${url}/district?city=${city}`);
  },
};

export default infoAPI;
