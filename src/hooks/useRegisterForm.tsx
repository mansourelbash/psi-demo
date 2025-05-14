import { useState } from "react";
import { RegisterFormData } from "@/types/auth";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/validation";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<RegisterFormData> = {
      firstName: validateName(formData.firstName, "First name"),
      lastName: validateName(formData.lastName, "Last name"),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.password),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === undefined);
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    setFormData,
    setErrors,
  };
};