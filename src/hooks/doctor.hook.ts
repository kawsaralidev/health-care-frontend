import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { doctorApis } from "@/api/doctor.api";

import {
  ApproveDoctorPayload,
  DoctorParams,
  PublicDoctorParams,
} from "@/types";

// Submit doctor application
export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: doctorApis.applyAsDoctor,
  });
};

// Verify doctor email
export const useVerifyDoctorAccount = () => {
  return useMutation({
    mutationFn: doctorApis.verifyDoctorAccount,
  });
};

// Get all doctors
export const useGetAllDoctors = (params: DoctorParams) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => doctorApis.getAllDoctors(params),
  });
};

// Approve or reject doctor
export const useApproveDoctor = () => {
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

export const useGetAllPublicDoctors = (params: PublicDoctorParams) => {
  return useQuery({
    queryKey: ["public-doctors", params],
    queryFn: () => doctorApis.getAllPublicDoctors(params),
  });
};

export const useSuspenseGetPublicDoctors = (params: PublicDoctorParams) => {
  return useSuspenseQuery({
    queryKey: ["public-doctors", params],
    queryFn: () => doctorApis.getAllPublicDoctors(params),
  });
};

export const usePublicDoctorProfile = (doctorId: string) => {
  return useQuery({
    queryKey: ["public-doctor", doctorId],
    queryFn: () => doctorApis.getPublicDoctorProfile(doctorId),
    enabled: !!doctorId,
  });
};

export const useGetTodayScheduleByDoctor = (params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["today-schedule", params],
    queryFn: () => doctorApis.getTodayScheduleByDoctor(params),
    enabled: !!params.doctorId,
  });
};
