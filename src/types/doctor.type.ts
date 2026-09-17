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
