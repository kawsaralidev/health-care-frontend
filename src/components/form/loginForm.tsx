"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useAuthHooks } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: loginPending } = useAuthHooks.useLogin();
  const { mutate: googleLogin } = useAuthHooks.useGoogleLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login successfully",
            description: "Welcome back",
            type: "success",
          });
          router.replace("/");
        },

        onError: (err) => {
          toast.add({
            title: "Authorization failed",
            description: err.message || "Something went wrong",
            type: "error",
          });
        },
      });
    },
  });

  const handleGoogleLogin = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google Login Successfully",
        description: "Welcome back",
        type: "success",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google Login Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.replace("/");
        },
        onError: () => {
          toast.add({
            title: "Google Authorization failed",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google Authorization failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button disabled={loginPending} type="submit">
            {loginPending ? (
              <>
                <Spinner></Spinner> : submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>or continue with</FieldSeparator>

      <GoogleLogin
        theme="outline"
        shape="pill"
        text="continue_with"
        onSuccess={handleGoogleLogin}
        onError={handleGoogleError}
      ></GoogleLogin>
    </div>
  );
};
export default LoginForm;
