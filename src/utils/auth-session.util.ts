const AUTH_STATUS_KEY = "ph-healthcare-authenticated";
const DOCTOR_APPROVAL_TOAST_KEY = "ph-healthcare-doctor-approval-toast";

// Mark user as authenticated
export const setAuthenticated = () => {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_STATUS_KEY, "true");
  window.dispatchEvent(new Event("auth-status-change"));
};

// Remove authenticated status
export const clearAuthenticated = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STATUS_KEY);
  window.dispatchEvent(new Event("auth-status-change"));
};

// Check whether user is authenticated
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(AUTH_STATUS_KEY) === "true";
};

// Save doctor approval message for Home page
export const setDoctorApprovalToast = () => {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(DOCTOR_APPROVAL_TOAST_KEY, "true");
};

// Get and remove doctor approval message
export const consumeDoctorApprovalToast = () => {
  if (typeof window === "undefined") return false;

  const shouldShow =
    sessionStorage.getItem(DOCTOR_APPROVAL_TOAST_KEY) === "true";

  if (shouldShow) {
    sessionStorage.removeItem(DOCTOR_APPROVAL_TOAST_KEY);
  }

  return shouldShow;
};
