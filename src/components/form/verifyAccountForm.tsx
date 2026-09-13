"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useAuthHooks } from "@/hooks/auth.hook";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

const RESEND_COOLDOWN = 120;

const VerifyAccountForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get email from registration URL
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  // Handle email verification request
  const { mutate: verifyAccount, isPending: verifyPending } =
    useAuthHooks.useVerifyAccount();

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  // Handle resend cooldown timer
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // Handle OTP verification
  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    // Send email and OTP to backend
    verifyAccount(
      {
        email,
        otp,
      },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Verification failed",
              description:
                res.message || "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Verification Successful",
            description: "Your account has been verified.",
            type: "success",
          });

          // Go to login after verification
          router.push("/");
        },

        onError: (err) => {
          toast.add({
            title: "Verification failed",
            description: err.message || "Invalid OTP. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  // Do not render without email
  if (!email) {
    return null;
  }

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Verify Account</h1>

          <p className="text-sm text-muted-foreground">
            Please provide the OTP we sent to your email.
          </p>

          <p className="text-sm font-medium break-all">{email}</p>
        </div>

        <div className="mt-6">
          <form
            id="otp-form"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleOTP();
            }}
          >
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="otp">OTP</FieldLabel>

              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value: string) => {
                  setOtp(value);

                  if (isInvalid) {
                    setIsInvalid(false);
                  }
                }}
                autoComplete="off"
                name="otp"
                id="otp"
                pattern={REGEXP_ONLY_DIGITS}
                disabled={verifyPending}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {isInvalid && (
                <FieldError
                  errors={[
                    {
                      message: "Invalid Code. Please enter a 6-digit OTP.",
                    },
                  ]}
                />
              )}

              <FieldDescription>
                {resendTimer > 0
                  ? `Resend available in ${resendTimer}s`
                  : "You can request a new OTP."}
              </FieldDescription>
            </Field>
          </form>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={resendTimer > 0}
          >
            Resend
          </Button>

          <Button
            type="submit"
            form="otp-form"
            className="flex-1"
            disabled={verifyPending || otp.length !== 6}
          >
            {verifyPending ? (
              <>
                <Spinner />
                Verifying...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountForm;
