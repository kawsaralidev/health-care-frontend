import { User } from "./user.type";
// Doctor application form data
export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };

  doctor: {
    address?: string;
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    bio?: string;
    consultationFee?: number;
    contactNumber?: string;
  };
}

// Doctor application API payload
export interface DoctorApplicationPayload {
  resume: File;
  additionalFiles: File[];
  data: DoctorApplicationData;
}

// Doctor verification status
export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

// Doctor data returned from API
export interface Doctor {
  id: string;
  name: string;
  email: string;
  address?: string | null;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  consultationFee?: number | string | null;
  contactNumber?: string | null;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  resume?: string | null;
  additionalFiles?:
    | {
        url: string;
        publicId: string;
      }[]
    | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

// Doctor list query parameters
export interface DoctorParams {
  verificationStatus?: DoctorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

// Doctor approval/rejection payload
export interface ApproveDoctorPayload {
  doctorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}
