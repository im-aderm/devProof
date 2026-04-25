"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/auth/check-verification?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.verified) {
          clearInterval(interval);
          router.push("/login?verified=true");
        }
      } catch (err) {
        console.error("Verification check failed", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [email, router]);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend");

      setMessage("Verification email resent. Please check your inbox.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6">
        <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
          <h1 className="text-headline-md font-bold mb-4">Invalid Access</h1>
          <Link href="/signup" className="text-primary hover:underline">Back to Sign Up</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center shadow-2xl">
        <div className="mb-6">
          <span className="material-symbols-outlined text-primary text-6xl">mark_email_read</span>
        </div>
        <h1 className="text-headline-md font-bold text-on-surface mb-2">Verify your email</h1>
        <p className="text-body-sm text-on-surface-variant mb-8">
          We&apos;ve sent a verification link to <span className="text-on-surface font-bold">{email}</span>.
          Please check your inbox and click the link to activate your account.
        </p>

        {message && (
          <div className="bg-secondary-container/20 border border-secondary/50 text-secondary p-3 rounded-lg text-sm mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-error-container/20 border border-error/50 text-error p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-on-surface-variant italic">
            <span className="animate-spin material-symbols-outlined text-xs">sync</span>
            Waiting for verification...
          </div>

          <button
            onClick={handleResend}
            disabled={resending}
            className="text-primary font-bold hover:underline text-sm disabled:opacity-50"
          >
            {resending ? "Resending..." : "Didn't receive the email? Resend"}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-outline/10">
          <Link href="/login" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
