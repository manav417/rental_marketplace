import axios from "axios";
import { NetworkStore } from "../stores/networkStore";
import { ApiErrorMessages } from "./api-messages/errors";

type ApiError = keyof typeof ApiErrorMessages;

export function axiosInterceptor() {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const networkStore = NetworkStore();

      const defaultErrorMessage = ApiErrorMessages.DEFAULT_MESSAGE;

      let errorMessage = defaultErrorMessage;

      if (error.response.data) {
        const networkErrorDetail = error.response.data.detail as ApiError;
        const errorMessages = Object.keys(ApiErrorMessages) as ApiError[];

        errorMessage = errorMessages.includes(networkErrorDetail)
          ? ApiErrorMessages[networkErrorDetail]
          : error.response.data.detail;
      }

      networkStore.isError = true;
      networkStore.errorMessage = errorMessage;

      (async () => {
        setTimeout(() => {
          networkStore.isError = false;
          networkStore.errorMessage = defaultErrorMessage;
        }, 5000);
      })();

      return Promise.reject(error);
    }
  );
}
