"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAuthHooks } from "@/hooks/auth.hook";
import {
  clearAuthenticated,
  consumeDoctorApprovalToast,
} from "@/utils/auth-session.util";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const shouldShowToast = consumeDoctorApprovalToast();

    if (!shouldShowToast) {
      return;
    }

    toast.add({
      title: "Email Verified Successfully",
      description:
        "Admin approval is required before you can log in to your account.",
      type: "success",
    });
  }, []);
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useAuthHooks.useGetMe();
  const { mutate: logout } = useAuthHooks.useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        clearAuthenticated();

        toast.add({
          title: "Tata",
          description: "Logged out successfully",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "Tata",
          description: "Logged out failed",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div>PH Healthcare</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant={"destructive"}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
