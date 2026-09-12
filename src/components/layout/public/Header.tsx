"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAuthHooks } from "@/hooks/auth.hook";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Header = () => {
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
