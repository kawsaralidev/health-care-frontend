import apiClient from "@/lib/apiClient";
import { DoctorApplicationPayload } from "@/types";

// Submit doctor application
const applyAsDoctor = (payload: DoctorApplicationPayload) => {
  const formData = new FormData();

  // Add doctor application data
  formData.append("data", JSON.stringify(payload.data));

  // Add resume file
  formData.append("resume", payload.resume);

  // Add additional documents
  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctors/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
};

// Verify doctor email with OTP
const verifyDoctorAccount = (payload: { email: string; otp: string }) => {
  return apiClient("/doctors/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const doctorApis = {
  applyAsDoctor,
  verifyDoctorAccount,
};
