import { authApis } from "@/api/auth.api";
import { clearAuthenticated, isAuthenticated } from "@/utils/auth-session.util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [authStatusReady, setAuthStatusReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication status on the client
  useEffect(() => {
    const syncAuthStatus = () => {
      setAuthenticated(isAuthenticated());
      setAuthStatusReady(true);
    };

    syncAuthStatus();

    window.addEventListener("auth-status-change", syncAuthStatus);

    return () => {
      window.removeEventListener("auth-status-change", syncAuthStatus);
    };
  }, []);

  const query = useQuery({
    queryKey: ["user"],
    queryFn: authApis.getMe,
    enabled: authStatusReady && authenticated,
    retry: false,
  });

  // Clear stale authentication status
  useEffect(() => {
    if (query.isError) {
      clearAuthenticated();
    }
  }, [query.isError]);

  return {
    ...query,
    isLoading: !authStatusReady || query.isLoading,
  };
};

export const useAuthHooks = {
  useLogin,
  useVerifyAccount,
  useRegistration,
  useLogout,
  useGoogleLogin,
  useGetMe,
};
