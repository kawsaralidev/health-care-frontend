import { z } from "zod";

export const doctorApplicationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),

  email: z.email("Invalid email address").trim().toLowerCase(),

  phone: z.string().trim().min(5, "Contact number is invalid"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long"),

  specialization: z.string().trim().min(2, "Specialization is required"),

  licenseNumber: z.string().trim().min(3, "License number is required"),

  qualifications: z.string().trim().min(2, "Qualifications are required"),

  experienceYears: z
    .string()
    .min(1, "Experience years is required")
    .refine(
      (value) => /^\d+$/.test(value),
      "Experience years must be a valid number",
    ),

  consultationFee: z
    .string()
    .refine(
      (value) => value === "" || /^\d+(\.\d+)?$/.test(value),
      "Consultation fee must be a valid number",
    ),

  bio: z.string().trim().max(1000, "Bio cannot exceed 1000 characters"),

  resume: z.custom<File>((file) => file instanceof File, "Resume is required"),

  additionalFiles: z.array(z.instanceof(File)),
});

// Maximum resume/additional file size in MB
export const MAX_FILE_SIZE = 5;

// Maximum file size in bytes
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

// Maximum number of additional files
export const MAX_ADDITIONAL_FILES = 5;

// Accepted resume and document types
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

// Check file size
export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

// Check file type
export const isAcceptedFileType = (fileType: string) => {
  return ACCEPTED_FILE_TYPES.includes(fileType);
};
