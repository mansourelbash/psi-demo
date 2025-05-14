"use client";

import { signIn } from "next-auth/react";

export default function FacebookButton() {
  return (
    <button
      className="border border-slate-300 rounded px-5 py-4 flex items-center"
      onClick={() => signIn("facebook")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24"
        height="24"
      >
        <path fill="#1877F2" d="M42 24a18 18 0 1 0-18 18v-12.7h-4.7V24H24v-3.6c0-4.6 2.7-7.1 6.9-7.1 2 0 4.1.4 4.1.4v4.5h-2.3c-2.3 0-3 1.4-3 2.9V24h5.1l-.8 5.3H30V42a18 18 0 0 0 12-18z"/>
        <path fill="#FFF" d="M30 29.3l.8-5.3H25.5v-3.4c0-1.5.7-2.9 3-2.9h2.3v-4.5s-2.1-.4-4.1-.4c-4.2 0-6.9 2.5-6.9 7.1V24h-4.7v5.3H18V42a18 18 0 0 0 6 0v-12.7H30z"/>
      </svg>
      <div className="px-2"></div>
      <span>Facebook</span>
    </button>
  );
}