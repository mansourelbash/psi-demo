"use client";

// import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function SocialButton({
  provider,
  icon,
  label,
}: {
  provider: string;
  icon: string;
  label: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
     
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
      className={`flex items-center gap-2 p-2 border rounded-md ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      }`}
    >
      <img src={`/icons/${icon}.svg`} alt="" className="w-5 h-5" />
      <span>Continue with {label}</span>
    </button>
  );
}
