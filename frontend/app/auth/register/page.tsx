"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface PasswordStrength {
  score: number;
  color: string;
  label: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z\d]/.test(pwd)) score++;

    if (score === 0) return { score: 0, color: "bg-neutral-300", label: "Very Weak" };
    if (score <= 2) return { score: 1, color: "bg-red-500", label: "Weak" };
    if (score <= 3) return { score: 2, color: "bg-yellow-500", label: "Fair" };
    if (score <= 4) return { score: 3, color: "bg-blue-500", label: "Strong" };
    return { score: 4, color: "bg-green-500", label: "Very Strong" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (!agreed) {
        setError("Please agree to the Terms & Conditions");
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful registration
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);
      
      // Clear any previous data
      localStorage.removeItem("topline_wishlist");
      localStorage.removeItem("topline_orders");
      
      // Dispatch custom event to notify navbar of auth state change
      window.dispatchEvent(new Event("authStateChanged"));
      
      router.push("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Create Account</h1>
          <p className="mt-2 text-sm text-neutral-700">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Voirob"
              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              disabled={isLoading}
            />
          </div>

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
              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
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
              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              disabled={isLoading}
            />
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-700">Password Strength</span>
                  <span className="text-xs font-medium text-neutral-700">{passwordStrength.label}</span>
                </div>
                <div className="h-1 bg-neutral-200 overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all`}
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-900">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder-neutral-500 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                disabled={isLoading}
              />
              {password && confirmPassword && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {password === confirmPassword ? (
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <XMarkIcon className="h-5 w-5 text-red-600" />
                  )}
                </div>
              )}
            </div>
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 mt-1"
              disabled={isLoading}
            />
            <span className="text-xs text-neutral-700">
              I agree to the{" "}
              <Link href="#" className="font-medium text-neutral-900 hover:text-neutral-700">
                Terms & Conditions
              </Link>
              {" "}and{" "}
              <Link href="#" className="font-medium text-neutral-900 hover:text-neutral-700">
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neutral-900 px-6 py-2.5 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-700">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-neutral-900 hover:text-neutral-700 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

