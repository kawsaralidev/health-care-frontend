// Registration request payload
export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  patient: {
    contactNumber?: string;
  };
}

// Login request payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Email verification request payload
export interface VerifyAccountPayload {
  email: string;
  otp: string;
}
