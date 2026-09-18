import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  ApproveDoctorPayload,
  Doctor,
  DoctorApplicationPayload,
  DoctorParams,
} from "@/types";

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

// Get all doctors
const getAllDoctors = (params: DoctorParams) => {
  return apiClient<ApiResponse<Doctor[]>>("/doctors/all-doctors", {
    params,
  });
};
// Approve or reject doctor
const approveDoctor = (payload: ApproveDoctorPayload) => {
  return apiClient("/doctors/approve-doctor", {
    method: "POST",
    body: payload,
  });
};

export const doctorApis = {
  applyAsDoctor,
  verifyDoctorAccount,
  getAllDoctors,
  approveDoctor,
};
