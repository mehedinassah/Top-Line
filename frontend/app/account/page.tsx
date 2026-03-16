"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, MapPinIcon, ShoppingBagIcon, HeartIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

interface UserProfile {
  name: string;
  email: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Get user data from localStorage
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "";
    setUser({ name: userName, email: userEmail });
    setIsLoggedIn(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    router.push("/auth/login");
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">My Account</h1>
          <p className="mt-2 text-neutral-700">Welcome back, {user.name}!</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="space-y-1 rounded-lg border border-neutral-200 bg-white p-2">
              <Link
                href="#profile"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
              >
                Profile
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
              >
                Orders
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
              >
                Wishlist
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Logout
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Section */}
            <section id="profile" className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 mb-4">
                <Cog6ToothIcon className="h-5 w-5" />
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-700">Name</p>
                  <p className="mt-1 font-medium text-neutral-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-700">Email Address</p>
                  <p className="mt-1 font-medium text-neutral-900">{user.email}</p>
                </div>
                <button className="mt-4 rounded-full border border-neutral-900 px-6 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition">
                  Edit Profile
                </button>
              </div>
            </section>

            {/* Addresses Section */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 mb-4">
                <MapPinIcon className="h-5 w-5" />
                Saved Addresses
              </h2>
              <div className="space-y-3">
                <div className="rounded-lg border border-neutral-200 p-4">
                  <p className="font-medium text-neutral-900">Home</p>
                  <p className="mt-1 text-sm text-neutral-700">123 Main Street</p>
                  <p className="text-sm text-neutral-700">New York, NY 10001</p>
                  <button className="mt-3 text-sm font-medium text-neutral-900 hover:underline">
                    Edit
                  </button>
                </div>
              </div>
              <button className="mt-4 rounded-full border border-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-900 hover:border-neutral-900 transition">
                + Add Address
              </button>
            </section>

            {/* Recent Orders */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 mb-4">
                <ShoppingBagIcon className="h-5 w-5" />
                Recent Orders
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                  <div>
                    <p className="font-medium text-neutral-900">Order #ORD-12345</p>
                    <p className="text-sm text-neutral-700">March 10, 2026</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                  <Link
                    href="/account/orders/1"
                    className="rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
              <Link
                href="/account/orders"
                className="mt-4 inline-block text-sm font-medium text-neutral-900 hover:underline"
              >
                View all orders →
              </Link>
            </section>

            {/* Wishlist */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 mb-4">
                <HeartIcon className="h-5 w-5" />
                Wishlist
              </h2>
              <p className="text-sm text-neutral-700">You have 3 items in your wishlist</p>
              <Link
                href="/wishlist"
                className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition"
              >
                View Wishlist
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
