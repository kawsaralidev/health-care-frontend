import { useMutation } from "@tanstack/react-query";
import { doctorApis } from "@/api/doctor.api";

// Submit doctor application
const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: doctorApis.applyAsDoctor,
  });
};

// Verify doctor email
const useVerifyDoctorAccount = () => {
  return useMutation({
    mutationFn: doctorApis.verifyDoctorAccount,
  });
};

export { useApplyAsDoctor, useVerifyDoctorAccount };
