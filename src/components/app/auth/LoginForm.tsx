"use client";

import { LoginFormData } from "@/types/auth";
// import SocialButton from "./SocialButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { storeAuthData } from "@/utils/authStorage";
import { authService } from "@/services/auth";
import VerifyForm from "./VerifyForm";
// import { API_URL } from "@/services/agents";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { useAtom } from "jotai";
import { VerifyRegisterCompleted } from "@/atoms/settingsAtoms";
import { storeAuthData } from "@/utils/authStorage";
// import { SocialButton } from "./SocialLogin";
import { signIn } from "next-auth/react";
import SocialButton from "./SocialButton";

interface Permission {
  id: number;
  name: string;
}
interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  profile_image?: { thumb: string } | null;
  roles?: Role[];
  status?: number;
  created_at?: string;
  country_code?: string;
  verification_id?: string;
  image?: string;
}

interface LoginModalProps {
  toggleModal: () => void;
  toggleAuthMode: () => void;
  handleFacebookLogin: () => void;
  handleAppleLogin: () => void;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  userData: User | undefined;
}
const LoginForm = ({
  toggleModal,
  toggleAuthMode,
  // handleFacebookLogin,
  // handleAppleLogin,
  setUserData,
  userData,
}: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [verifyRegister] = useAtom(VerifyRegisterCompleted);

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<Partial<LoginFormData>>({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateLoginForm = () => {
    const newErrors: Partial<LoginFormData> = {};

    if (!loginFormData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!loginFormData.password) {
      newErrors.password = "Password is required";
    } else if (loginFormData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsLoading(true);

    try {
      const data = await authService.loginUser(loginFormData);
      storeAuthData(data);
      if (!data.is_email_verified && !data.is_phone_verified) {
        setRequiresVerification(true);
        return;
      } else {
        setRequiresVerification(false);
      }
      toast.success("Login successful!");
      toggleModal();
      router.refresh();
    } catch (error: unknown) {
      console.error("Login error:", error);

      let errorMessage = "Login failed. Please try again.";
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }

      if (typeof errorMessage === "string") {
        if (errorMessage.toLowerCase().includes("password")) {
          toast.error("Your password is not valid.");
        } else if (errorMessage.toLowerCase().includes("email")) {
          toast.error("Email doesn't exist in our database.");
        } else if (errorMessage.toLowerCase().includes("401")) {
          toast.error("Unauthorized: Please check your login credentials.");
        } else if (errorMessage.includes("422")) {
          toast.error("Invalid input. Please check your data and try again.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!requiresVerification && !forgetPassword && !verifyRegister && (
        <>
          <h2 className="text-2xl font-semibold text-center mb-1">
            Hi, Welcome Back! 👋
          </h2>
          <p className="text-[#8A8A8A] text-center mb-6 mt-1">
            Please enter your details.
          </p>

          <form className="w-full space-y-4" onSubmit={handleLogin}>
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
                value={loginFormData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-md h-[44px] ${
                  loginErrors.email ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {loginErrors.email && (
                <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
              )}
            </div>

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
                value={loginFormData.password}
                onChange={handleLoginChange}
                placeholder="* * * * * * "
                className={`w-full p-3 h-[44px] border rounded-md placeholder:text-2lg ${
                  loginErrors.password ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {loginErrors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#E0592A] border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  onClick={() => setForgetPassword(true)}
                  className="text-[#E0592A] hover:underline"
                >
                  Forgot password
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E0592A] hover:bg-[#c94e25] text-white py-3 rounded-md font-medium disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
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
            Don&rsquo;t have an account?{" "}
            <button
              onClick={toggleAuthMode}
              className="text-[#E0592A] font-medium hover:underline"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </>
      )}
      {requiresVerification ||
        (verifyRegister && (
          <VerifyForm
            toggleModal={toggleModal}
            user={userData}
            type={!resetPassword ? "email" : ""}
          />
        ))}
      {forgetPassword && !requiresVerification && (
        <ForgetPasswordForm
          setUserData={setUserData}
          setRequiresVerification={setRequiresVerification}
          setForgetPassword={setForgetPassword}
          setResetPassword={setResetPassword}
        />
      )}
    </>
  );
};

export default LoginForm;
