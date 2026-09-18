// User role
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

// User account status
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

// User data returned from API
export interface User {
  id: string;
  name: string;
  email: string;
  googleId: string | null;
  authProvider: string;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: string | null;
  imagePublicId: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
