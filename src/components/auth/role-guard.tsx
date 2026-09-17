"use client";

import { useAuthHooks } from "@/hooks/auth.hook";
import { UserRole } from "@/types";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";
import AccessDenied from "./access-denied";

interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[];
}

const RoleGuard = ({ children, roles }: RoleGuardProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = useAuthHooks.useGetMe();

  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

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

  // Show loading while redirecting unauthenticated users
  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  // Show access denied for unauthorized roles
  if (!isAuthorized) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default RoleGuard;
