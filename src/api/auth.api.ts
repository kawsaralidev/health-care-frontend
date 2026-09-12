import apiClient from "@/lib/apiClient";

const userLogin = (payload: { email: string; password: string }) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

const getMe = () => {
  return apiClient("/auth/me");
};

const userLogout = () => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};

const googleLogin = (payload: { idToken: string }) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};

export const authApis = {
  userLogin,
  getMe,
  userLogout,
  googleLogin,
};
