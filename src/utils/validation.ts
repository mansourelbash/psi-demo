export type ValidationResult = string | undefined;

export const validateName = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) return `${fieldName} is required`;
  if (value.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  if (/[^a-zA-Z\s]/.test(value)) return `${fieldName} must not contain special characters`;
  return undefined;
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
  return undefined;
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 16) return "Password must be no more than 16 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain at least one special character";
  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return undefined;
};

export const validateOtp = (otp: string): ValidationResult => {
  if (!otp.trim()) return "OTP is required";
  if (!/^\d{6}$/.test(otp)) return "OTP must be a 6-digit number";
  return undefined;
};

export const validateMobileNumber = (mobile: string, countryCode: string): ValidationResult => {
  if (countryCode === 'UAE') {
    if (!/^\+971\d{9}$/.test(mobile)) return "Please enter a valid UAE mobile number";
  }
  return undefined;
};
