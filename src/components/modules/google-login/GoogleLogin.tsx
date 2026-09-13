"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useAuthHooks } from "@/hooks/auth.hook";

const GoogleLoginComponent = () => {
  const router = useRouter();

  // Google authentication mutation
  const { mutate: googleLogin } = useAuthHooks.useGoogleLogin();

  // Handle successful Google authentication
  const handleGoogleLogin = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    // Check Google ID token
    if (!idToken) {
      toast.add({
        title: "Google Authorization failed",
        description: "Google ID token was not received.",
        type: "error",
      });
      return;
    }

    // Send Google ID token to backend
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google Login Successfully",
            description: "Welcome back",
            type: "success",
          });

          // Redirect after successful login
          router.replace("/");
        },

        onError: (err) => {
          toast.add({
            title: "Google Authorization failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  // Handle Google authentication error
  const handleGoogleError = () => {
    toast.add({
      title: "Google Authorization failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleLogin}
      onError={handleGoogleError}
    />
  );
};

export default GoogleLoginComponent;
