import axios from "axios";
import {getFromLS} from "utils/helpers/localStorage";

export const apiProvider = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
})

apiProvider.interceptors.request.use(config => {
  const lsToken = getFromLS('token')

  if (lsToken) {
    config.headers['Authorization'] = `Bearer ${lsToken}`
  }

  return config
}, null)