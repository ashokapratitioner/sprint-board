import axios from "axios";

const baseURL = process.env.REACT_APP_API_URI;

const axiosClient = axios.create({
  baseURL: baseURL,
});

const getRequests = async (url: string) => {
  try {
    const response = await axiosClient.get(url);
    return {
      status: 200,
      response: response.data,
    };
  } catch (err: any) {
    return {
      status: err.response ? err.response.status : 500,
      error: err.message || "An error occurred",
    };
  }
};

export { getRequests };
