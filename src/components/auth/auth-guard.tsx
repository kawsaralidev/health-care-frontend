"use client";

import { useAuthHooks } from "@/hooks/auth.hook";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = useAuthHooks.useGetMe();

  const user = data?.data;

  // Redirect unauthenticated users
  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      router.replace("/login");
    }
  }, [isLoading, isError, user, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <AuthLoading />;
  }

  // Show loading while redirecting
  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  return <>{children}</>;
};

export default AuthGuard;
