"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      }

      // Simulate successful login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      
      // Dispatch custom event to notify navbar of auth state change
      window.dispatchEvent(new Event("authStateChanged"));
      
      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-neutral-700">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300"
                disabled={isLoading}
              />
              <span className="text-sm text-neutral-700">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-sm font-medium text-neutral-900 hover:text-neutral-700 transition"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-neutral-900 px-6 py-2.5 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-700">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-neutral-900 hover:text-neutral-700 transition"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

