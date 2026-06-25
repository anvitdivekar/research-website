"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#03030e] flex items-center justify-center px-6">
      {/* Subtle radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo / title */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-4 font-medium">
            Research Portal
          </p>
          <h1 className="text-3xl font-extralight tracking-tight text-white mb-3">
            Welcome back
          </h1>
          <p className="text-sm text-white/40 font-light">
            Sign in to access your mentor or mentee dashboard.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card glow-border rounded-3xl p-8">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-[#111] text-sm font-medium tracking-wide hover:bg-white/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* Google icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            {loading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="text-center text-xs text-white/20 mt-6 leading-relaxed">
            Only approved mentors and mentees can access the portal.
            <br />
            Questions? Email{" "}
            <a
              href="mailto:divekar.anvit@gmail.com"
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              divekar.anvit@gmail.com
            </a>
          </p>
        </div>

        {/* Back to site */}
        <p className="text-center mt-8">
          <a
            href="/"
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
