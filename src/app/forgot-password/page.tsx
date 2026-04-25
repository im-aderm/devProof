"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center shadow-2xl">
        <h1 className="text-headline-md font-bold mb-4">Reset Password</h1>
        <p className="text-body-sm text-on-surface-variant mb-8">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        <div className="space-y-4 text-left">
          <div>
            <label className="font-label-bold text-[10px] uppercase text-on-surface-variant block mb-1">Email Address</label>
            <input
              type="email"
              className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="john@example.com"
            />
          </div>
          <button className="w-full py-3 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all">
            Send Reset Link
          </button>
        </div>
        <div className="mt-8 pt-8 border-t border-outline/10">
          <Link href="/login" className="text-sm text-primary font-bold hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
