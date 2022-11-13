import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosClient } from ".";

export const useLogin = () => {
  return useMutation((payload) => axiosClient.post("/login", payload));
};

export const useRegister = () => {
  return useMutation((payload) => axiosClient.post("/register", payload));
};

export const useProfile = (enabled) => {
  return useQuery(["profile"], () => axiosClient.get("/profile"), {
    enabled: enabled,
  });
};
