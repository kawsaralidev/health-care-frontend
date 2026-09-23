import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types";

const bookAppointment = (payload: BookAppointmentPayload) => {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
};

const getMyAppointments = (params: { page?: number; limit?: number }) => {
  return apiClient("/appointment/my-appointments", {
    params,
  });
};

export const appointmentApis = {
  bookAppointment,
  getMyAppointments,
};
