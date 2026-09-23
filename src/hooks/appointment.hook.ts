import { appointmentApis } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: appointmentApis.bookAppointment,
  });
};

export const useGetMyAppointments = (params: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentApis.getMyAppointments(params),
  });
};
