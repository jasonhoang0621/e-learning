import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://login-core-server.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.token = `${token}` || "";
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      console.log(error);
    }
  }
);

export { axiosClient };
