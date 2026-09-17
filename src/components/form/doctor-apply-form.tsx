"use client";

import { useForm } from "@tanstack/react-form";
import {
  BadgeCheck,
  Banknote,
  BriefcaseMedical,
  FileText,
  FileUp,
  GraduationCap,
  Mail,
  MapPin,
  Plus,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

import { useApplyAsDoctor } from "@/hooks/doctor.hook";
import { DoctorApplicationData } from "@/types";
import {
  doctorApplicationSchema,
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_ADDITIONAL_FILES,
  MAX_FILE_SIZE,
} from "@/validation";
import { formatFileSize } from "@/utils";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

const DoctorApplyForm = () => {
  const router = useRouter();
  const { mutate: apply, isPending: applyPending } = useApplyAsDoctor();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experienceYears: "",
      consultationFee: "",
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },

    // Validate the complete form before submitting
    validators: {
      onSubmit: doctorApplicationSchema,
    },

    // Submit doctor application
    onSubmit: async ({ value }) => {
      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },

        doctor: {
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          contactNumber: value.phone.trim(),
          address: value.address.trim() || undefined,
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          bio: value.bio.trim() || undefined,
        },
      };

      apply(
        {
          data: doctorData,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles,
        },
        {
          // Handle successful application
          onSuccess: (res) => {
            console.log("Doctor application frontend response:", res);

            if (!res.success) {
              toast.add({
                title: "Application Failed",
                description:
                  res.message || "Something went wrong. Please try again.",
                type: "error",
              });
              return;
            }

            // Show success message
            toast.add({
              title: "Application Submitted",
              description:
                "Your application has been submitted. Please verify your email with the OTP.",
              type: "success",
            });

            // Redirect to doctor email verification page
            const params = new URLSearchParams({
              email: value.email.trim(),
            });

            router.push(`/apply/verify-account?${params.toString()}`);
          },

          // Handle application error
          onError: (err) => {
            console.error("Doctor application frontend error:", err);

            toast.add({
              title: "Application Failed",
              description:
                err.message || "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply to join PH Healthcare
        </h1>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>

                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Dr. John Doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="name"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="doctor@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="email"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>

                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+880 1712 345678"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        autoComplete="tel"
                      />

                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <MapPin className="size-4 text-muted-foreground" />
                      </span>
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Practice address{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Chamber or hospital address"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="street-address"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="specialization">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Specialization</FieldLabel>

                    <div className="relative">
                      <Stethoscope className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Cardiology"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="licenseNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      BMDC registration number
                    </FieldLabel>

                    <div className="relative">
                      <BadgeCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="A-12345"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>

                    <div className="relative">
                      <GraduationCap className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="MBBS, FCPS (Medicine)"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="experienceYears">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Years of experience
                    </FieldLabel>

                    <div className="relative">
                      <BriefcaseMedical className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={0}
                        max={70}
                        inputMode="numeric"
                        placeholder="10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="consultationFee">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Consultation fee (BDT){" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>

                  <div className="relative">
                    <Banknote className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      step="0.01"
                      inputMode="decimal"
                      placeholder="1000"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      className="pl-9"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional bio{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    maxLength={1000}
                    placeholder="Share your background, areas of interest and patient care philosophy..."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />

                  <div className="flex items-center justify-between gap-2">
                    <FieldDescription>
                      Shown on your public profile after approval.
                    </FieldDescription>

                    <span className="text-xs text-muted-foreground">
                      {field.state.value.length}/1000
                    </span>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const file = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>

                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="resume-field"
                      className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <FileUp className="size-4" />
                      Upload resume
                    </label>

                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(event) => {
                        const selected = event.target.files?.[0] ?? null;

                        if (
                          selected &&
                          (!isAcceptedFileSize(selected.size) ||
                            !isAcceptedFileType(selected.type))
                        ) {
                          field.handleBlur();
                          return;
                        }

                        field.handleChange(selected);
                        event.target.value = "";
                      }}
                    />

                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary" />

                        <span className="truncate">{file.name}</span>

                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>

                        <button
                          type="button"
                          aria-label="Remove resume"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur();
                          }}
                          className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                        >
                          <X className="size-4" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX or image up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const files = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="additional-file-field">
                    Additional files
                  </FieldLabel>

                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="additional-file-field"
                      className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Plus className="size-4" />
                      Add Files
                    </label>

                    <input
                      id="additional-file-field"
                      type="file"
                      multiple
                      className="sr-only"
                      name={field.name}
                      onChange={(event) => {
                        const incoming = Array.from(event.target.files ?? []);

                        if (incoming.length === 0) {
                          return;
                        }

                        if (
                          files.length + incoming.length >
                          MAX_ADDITIONAL_FILES
                        ) {
                          field.handleBlur();
                          event.target.value = "";
                          return;
                        }

                        const invalid = incoming.some(
                          (file) =>
                            !isAcceptedFileSize(file.size) ||
                            !isAcceptedFileType(file.type),
                        );

                        if (invalid) {
                          field.handleBlur();
                          event.target.value = "";
                          return;
                        }

                        field.handleChange([...files, ...incoming]);
                        event.target.value = "";
                      }}
                    />

                    {files.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {files.length} of {MAX_ADDITIONAL_FILES} added
                      </span>
                    )}
                  </div>

                  {files.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <FileText className="size-4 shrink-0 text-primary" />

                            <span className="truncate">{file.name}</span>

                            <span className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </span>
                          </span>

                          <button
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            onClick={() => {
                              field.handleChange(
                                files.filter((_, i) => i !== index),
                              );
                              field.handleBlur();
                            }}
                            className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="mt-5 flex w-full justify-end">
          <Button type="submit" size="lg" disabled={applyPending}>
            {applyPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Already an approved doctor?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in to the Doctor Portal
        </Link>
        . Patient applications should use the{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          patient registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
};

export default DoctorApplyForm;
