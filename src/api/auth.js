import { useMutation } from "@tanstack/react-query";
import { axiosClient } from ".";

export const useLogin = () => {
  return useMutation((payload) => axiosClient.post("/api/login", payload));
};

export const useRegister = () => {
  return useMutation((payload) => axiosClient.post("/api/register", payload));
};
