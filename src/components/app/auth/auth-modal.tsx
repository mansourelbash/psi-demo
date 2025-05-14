"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  AuthModalProps,
  LoginFormData,
  RegisterFormData,
  SocialLoginData,
} from "@/types/auth";
import RegisterForm from "./RegisterForm";
import LoginForm, { User } from "./LoginForm";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function AuthModal({ toggleModal }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<User | undefined>(undefined);
  
  const [, setLoginErrors] = useState<Partial<LoginFormData>>({});

  const [, setRegisterErrors] = useState<
    Partial<RegisterFormData>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setLoginErrors({});
    setRegisterErrors({});
  };

  const handleSocialLogin = async (
    provider: "Google" | "Meta" | "Apple",
    data: SocialLoginData
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://web.dev.psi-crm.com/api/auth/social/login?provider=${provider}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Social login with ${provider} failed`
        );
      }

      // Handle successful login
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: result.id,
          name: result.name,
          email: result.email,
          roles: result.roles,
        })
      );

      toast.success(`Logged in with ${provider} successfully!`);
      toggleModal();
      window.location.reload(); // Refresh to update auth state
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Social login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login Handler
  // const handleGoogleLogin = async () => {
  //   // In a real app, you would implement Google Sign-In and get these tokens
  //   const googleAuthData = {
  //     source: "web", // or 'android', 'ios' based on platform
  //     id_token: "idTokenFromGoogle", // Replace with actual token
  //     access_token: "accessTokenFromGoogle", // Replace with actual token
  //   };
  //   await handleSocialLogin("Google", googleAuthData);
  // };

  // Facebook (Meta) Login Handler
  const handleFacebookLogin = async () => {
    const facebookAuthData = {
      access_token: "accessTokenFromFacebook", // Replace with actual token
      is_limited: "false",
    };
    await handleSocialLogin("Meta", facebookAuthData);
  };

  // Apple Login Handler
  const handleAppleLogin = async () => {
    const appleAuthData = {
      fullname: "userFullName", // Optional
      authorization_code: "authorizationCodeFromApple", // Replace with actual code
      id_token: "idTokenFromApple", // Replace with actual token
    };
    await handleSocialLogin("Apple", appleAuthData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <button
          onClick={toggleModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          disabled={isLoading}
        >
          <X className="w-7 h-7" />
        </button>

        <div className="p-6 flex flex-col items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 mb-4">
            <Image
              src="/images/auth/logopsi.png"
              width={48}
              height={48}
              alt="PSI CRM Logo"
            />
          </div>

          {isLogin ? (
            /* Login Form */
            <>
              <LoginForm toggleModal={toggleModal} setUserData={setUserData} userData={userData} toggleAuthMode={toggleAuthMode} handleFacebookLogin={handleFacebookLogin} handleAppleLogin={handleAppleLogin}  />
            </>
          ) : (
            /* Register Form */
            <>
              <RegisterForm setUserData={setUserData} userData={userData}  toggleAuthMode={toggleAuthMode} />
             
            </>
          )}
        </div>
      </div>
    </div>
  );
}
