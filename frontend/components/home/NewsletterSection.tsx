"use client";

import { useState } from "react";
import { useToast } from "@/components/toast/ToastContext";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      addToast("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast(
        `Welcome! We've sent a confirmation email to ${email}`,
        "success"
      );
      setEmail("");
    } catch {
      addToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-4xl">
            JOIN THE TOP LINE COMMUNITY
          </h2>
          <p className="mt-3 text-sm text-neutral-700 md:text-base">
            Subscribe to get special offers, access new collections, and updates
            on our latest releases.
          </p>

          <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm placeholder-neutral-500 transition focus:border-neutral-900 focus:outline-none disabled:opacity-50"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="mt-4 text-xs text-neutral-600">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
