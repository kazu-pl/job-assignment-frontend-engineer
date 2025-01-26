import axios from "axios";

import { API_URL } from "constants/env";
import { Store } from "store/store";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;

/**
 * Use this function to add JWT token stored in redux to request headers
 */
export const applyAuthInterceptor = (store: Store): void => {
  axiosInstance.interceptors.request.use(config => {
    const token = store.getState().user.data?.user.token;

    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  });
};
