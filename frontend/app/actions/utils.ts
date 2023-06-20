import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const toastCatchAxios = (error: Error) => {
  const message = error instanceof AxiosError
    ? error.response?.data.message
    : error.toString();
  toast.error(message);
}