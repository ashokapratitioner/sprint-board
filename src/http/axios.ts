import axios from "axios";

const baseURL = process.env.REACT_APP_API_URI;

const axiosClient = axios.create({
  baseURL: baseURL,
});

const getRequests = (url: string) => {
  return axiosClient.get(url);
};

export { getRequests };
