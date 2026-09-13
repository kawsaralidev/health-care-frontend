import { authApis } from "@/api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// Login existing user
const useLogin = () => {
  return useMutation({
    mutationFn: authApis.userLogin,
  });
};

// Verify user's email
const useVerifyAccount = () => {
  return useMutation({
    mutationFn: authApis.verifyAccount,
  });
};

// Register a new patient
const useRegistration = () => {
  return useMutation({
    mutationFn: authApis.userRegistration,
  });
};

// Logout current user
const useLogout = () => {
  return useMutation({
    mutationFn: authApis.userLogout,
  });
};

// Login with Google
const useGoogleLogin = () => {
  return useMutation({
    mutationFn: authApis.googleLogin,
  });
};

// Get currently logged-in user
const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApis.getMe,
    retry: false,
  });
};

export const useAuthHooks = {
  useLogin,
  useVerifyAccount,
  useRegistration,
  useLogout,
  useGoogleLogin,
  useGetMe,
};
