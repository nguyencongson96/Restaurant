import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE,
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  token && (request.headers.Authorization = token);
  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    console.log(response);
    return response;
  },
  (error) => {
    // console.log(error.response.data);
    throw JSON.stringify(error.response.data);
  }
);
export default axiosClient;
