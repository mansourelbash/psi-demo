"use client";

import React, { useState } from "react";
import { User } from "./LoginForm";
import { useEffect } from "react";

interface ForgetPasswordProps {
  setForgetPassword: (value: boolean) => void;
  setRequiresVerification: (value: boolean) => void;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>
  setResetPassword: (value: boolean) => void;
}

const ForgetPasswordForm = ({
  setForgetPassword,
  setRequiresVerification,
  setUserData,
  setResetPassword
}: ForgetPasswordProps) => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://web.dev.psi-crm.com/api/auth/passwordRecovery/EMAIL/${formData.email}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.ok) {

        const updatedUserData = {
          email: formData.email,
          verification_id: data.verification_id
        };
        
        setUserData(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        


        setUserData(updatedUserData)

        localStorage.setItem("user", JSON.stringify(updatedUserData));

        setMessage("Password recovery email sent successfully.");
        setTimeout(() => {
          setRequiresVerification(true);
          setResetPassword(true)
        }, 2000);
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to send recovery email.");
      }
    } catch (error) {
      console.error("Submission failed", error);
      setMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-1">
        Forgot Password
      </h2>
      <p className="text-[#8A8A8A] text-center mb-6 mt-1">
        Submit your email to recover your account.
      </p>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full p-3 border rounded-md h-[44px] ${
              errors.email ? "border-red-500" : ""
            }`}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {message && (
          <div
            className={`text-sm mt-2 ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-sm">
          Back to{" "}
          <button
            type="button"
            onClick={() => setForgetPassword(false)}
            className="text-[#E0592A] font-medium hover:underline"
            disabled={isLoading}
          >
            Log in
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#E0592A] hover:bg-[#c94e25] text-white py-3 rounded-md font-medium disabled:opacity-70 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Send Recovery Email"}
        </button>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
