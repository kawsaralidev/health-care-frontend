import { authApis } from "@/api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: authApis.userLogin,
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: authApis.userLogout,
  });
};

const useGoogleLogin = () => {
  return useMutation({ mutationFn: authApis.googleLogin });
};

const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApis.getMe,
    retry: false,
  });
};

export const useAuthHooks = {
  useLogin,
  useLogout,
  useGoogleLogin,
  useGetMe,
};
