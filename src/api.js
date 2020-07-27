import axios from "axios";
import {AXIOS_TIMEOUT} from "./const.js";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Error = {
  SUCCESS: 200,
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: AXIOS_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      MySwal.fire({
        icon: `warning`,
        title: `Authorize please`,
        position: `top`,
        showConfirmButton: false,
        timer: 1500,
      });

      throw err;
    }

    MySwal.fire({
      icon: `error`,
      title: `Oops...`,
      text: err,
      position: `top`,
      showConfirmButton: false,
      timer: 1500,
    });

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
