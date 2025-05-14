"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { authService } from "@/services/auth";
import { API_URL } from "@/services/agents";
import { User } from "./LoginForm";
import { useAtom } from "jotai";
import { VerifyRegisterCompleted } from "@/atoms/settingsAtoms";
import { storeRegData } from "@/utils/authStorage";
import SocialButton from "./SocialButton";
import { signIn } from "next-auth/react";

interface RegisterModalProps {
  toggleAuthMode: () => void;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  userData: User | undefined;
}

const RegisterForm = ({ setUserData }: RegisterModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { formData, errors, handleChange, validate } = useRegisterForm();
  const [, setVerifyRegister] = useAtom(VerifyRegisterCompleted);

  const sendEmailVerification = async (
    userId: string,
    setUserData: React.Dispatch<React.SetStateAction<User | undefined>>
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/auth/clients/verify/${userId}/EmailVerification`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      const verificationId = data.verification_id;
      setUserData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          verification_id: verificationId,
        };
      });
    } catch {
      toast.error("Failed to send verification email");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        country_code: "+962",
        password: formData.password,
        confirm_password: formData.password,
      };

      const data = await authService.registerUser(payload);
      storeRegData({
        id: data.id,
        name: data.name,
        email: data.email,
      });

      setUserData({
        id: data.id,
        name: data.name,
        email: data.email,
      });

      toast.success(
        "Registration successful! Please check your email for verification."
      );
      await sendEmailVerification(data.id || "", setUserData);
      // toggleAuthMode();
      setVerifyRegister(true);

      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please check your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-medium text-center text-[#414042] mb-1 mt-[15px]">
        Create an Account
      </h2>
      <p className="text-[#8A8A8A] text-center mb-6">
        Connect with Real Estate Opportunities.
      </p>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className={`w-full px-3 border rounded-md h-[44px] ${
              errors.firstName ? "border-red-500" : ""
            }`}          
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className={`w-full px-3 border rounded-md h-[44px] ${
              errors.lastName ? "border-red-500" : ""
            }`}
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-3 h-[44px] border rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-3 border rounded-md"
            disabled={isLoading}
          />
        </div> */}
        

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="* * * * * * "
            className={`w-full px-3 h-[44px] border rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••"
            className={`w-full p-3 border rounded-md ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div> */}

        <button
          type="submit"
          className="w-full bg-[#E0592A] hover:bg-[#c94e25] text-white py-3 rounded-md font-medium disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Get Started"}
        </button>
      </form>

      <div className="mt-6 w-full flex items-center justify-center gap-4">
        <SocialButton
          provider="google"
          icon="google"
          label="Google"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
        <SocialButton
          provider="facebook"
          icon="facebook"
          label="Facebook"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
        />
        <SocialButton
          provider="apple"
          icon="apple"
          label="Apple"
          onClick={() => signIn("apple", { callbackUrl: "/" })}
        />
      </div>

      <div className="mt-6 text-sm">
        Already have an account?{" "}
        <button
          // onClick={toggleAuthMode}
          className="text-[#E0592A] font-medium hover:underline"
          disabled={isLoading}
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
