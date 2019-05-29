import axios from "axios";

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};