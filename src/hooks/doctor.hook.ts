import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { doctorApis } from "@/api/doctor.api";

import { ApproveDoctorPayload, DoctorParams } from "@/types";

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

// Get all doctors
const useGetAllDoctors = (params: DoctorParams) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => doctorApis.getAllDoctors(params),
  });
};

// Approve or reject doctor
const useApproveDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApproveDoctorPayload) =>
      doctorApis.approveDoctor(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });
    },
  });
};

export {
  useApplyAsDoctor,
  useVerifyDoctorAccount,
  useGetAllDoctors,
  useApproveDoctor,
};
