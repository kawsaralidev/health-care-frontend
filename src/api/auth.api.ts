import apiClient from "@/lib/apiClient";
import { RegistrationPayload, VerifyAccountPayload } from "@/types/auth.type";

// Login existing user
const userLogin = (payload: { email: string; password: string }) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

// Verify user's email with OTP
const verifyAccount = (payload: VerifyAccountPayload) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

// Register a new patient
const userRegistration = (payload: RegistrationPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

// Get currently logged-in user
const getMe = () => {
  return apiClient("/auth/me");
};

// Logout current user
const userLogout = () => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};

// Login with Google
const googleLogin = (payload: { idToken: string }) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};

export const authApis = {
  userLogin,
  verifyAccount,
  userRegistration,
  getMe,
  userLogout,
  googleLogin,
};
