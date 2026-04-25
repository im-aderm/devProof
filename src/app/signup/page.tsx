"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to verification page
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-tighter text-primary inline-block mb-2">DevProof</Link>
          <h1 className="text-headline-md font-bold text-on-surface">Create your account</h1>
          <p className="text-body-sm text-on-surface-variant">Start proving your engineering skills today.</p>
        </div>

        {error && (
          <div className="bg-error-container/20 border border-error/50 text-error p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label-bold text-[10px] uppercase text-on-surface-variant block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="font-label-bold text-[10px] uppercase text-on-surface-variant block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label className="font-label-bold text-[10px] uppercase text-on-surface-variant block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-outline/10 text-center">
          <p className="text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
