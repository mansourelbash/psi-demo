"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react"; // Spinner icon

export default function SocialButton({
  provider,
  icon,
  label,
  onClick,
}: {
  provider: string;
  icon: string;
  label: string;
  onClick: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (error) {
      toast.error(`Sign in with ${provider} failed`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className={`flex items-center gap-2 p-2 border rounded-md w-full justify-center ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      }`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
      ) : (
        <img src={`/images/auth/${icon}.png`} alt="" className="w-5 h-5" />
      )}
      <span>{loading ? `${label}..` : `${label}`}</span>
    </button>
  );
}
