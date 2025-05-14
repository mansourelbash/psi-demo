"use client";

import { API_URL } from "@/services/agents";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { User } from "./LoginForm";
import Error from "next/error";
import { toast } from "sonner";
import { VerifyRegisterCompleted } from "@/atoms/settingsAtoms";
import { useAtom } from "jotai";

interface VerifyFormProps {
  user?: User;
  toggleModal?: () => void;
  type?: string
}

export default function VerifyForm({ user, toggleModal, type }: VerifyFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(57);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [, setVerifyRegister] = useAtom(VerifyRegisterCompleted);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed[0]?.email) {

            setUserEmail(parsed[0].email);
          }
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
        }
      }
    }
  }, [user]);

  
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setOtp(Array(6).fill(""));
      setTimer(57);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVerify = async ({verifyType}: {verifyType: string}) => {
    const code = otp.join("");
    if (code.length < 6) {
      alert("Please enter all 6 digits of the code.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/auth/otp/verify?otp_type=${verifyType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verification_id: user?.verification_id,
            verification_code: code,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Verification failed");
      }

      toast.success("Email verified successfully.")
      // toggleAuthMode();
      setVerifyRegister(false)
      if (toggleModal) {
        toggleModal();
      }
    } catch (error) {
      alert(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-medium text-gray-800 mb-4">
          {type == 'email' ? 'Verify Email Address': 'Verify Password OTP'}
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter OTP sent to{" "}
          {userEmail
            ? `${userEmail.slice(0, 2)}****@${
              userEmail.split("@")[1] || ""
              } `
            : ""}
          for {type == 'email' ? 'verification' : 'reset password'} 
        </p>

        <div className="flex gap-2 mb-8 w-full justify-center">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-14 h-14 relative">
              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-full h-full text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e64a19] focus:border-[#e64a19]"
                placeholder="-"
              />
            </div>
          ))}
        </div>

        <button
          className="w-full py-4 bg-[#e64a19] text-white rounded-lg text-lg font-medium mb-6 hover:bg-[#d84315] transition-colors disabled:opacity-50"
          onClick={() => handleVerify({ verifyType: "EmailVerification" })}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="text-gray-700 text-center">
          Didn&rsquo;t get the code?{" "}
          <button
            onClick={handleResend}
            className={`text-[#e64a19] font-medium ${
              !canResend && "opacity-70"
            }`}
            disabled={!canResend}
          >
            Resend
          </button>
        </div>

        <div  className="text-gray-700 mt-2">
          Resend Code in {formatTime(timer)}
        </div>
      </div>
    </div>
  );
}
