"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import SearchBar from "@/components/search/SearchBar";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartContext";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { totalQuantity } = useCart();

  // Check auth state synchronously as early as possible
  useLayoutEffect(() => {
    const updateAuthState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const email = localStorage.getItem("userEmail") || "";
      setIsLoggedIn(loggedIn);
      setUserEmail(email);
    };

    updateAuthState();
  }, []);

  // Listen for auth state changes from login/register pages and storage events
  useEffect(() => {
    const handleAuthStateChange = () => {
      const updatedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const updatedEmail = localStorage.getItem("userEmail") || "";
      setIsLoggedIn(updatedLoggedIn);
      setUserEmail(updatedEmail);
    };

    // Listen for custom auth event from login/register
    window.addEventListener("authStateChanged", handleAuthStateChange);
    // Listen for storage changes (cross-tab updates)
    window.addEventListener("storage", handleAuthStateChange);
    
    return () => {
      window.removeEventListener("authStateChanged", handleAuthStateChange);
      window.removeEventListener("storage", handleAuthStateChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserEmail("");
    setShowProfileMenu(false);
    // Dispatch event for other components to listen
    window.dispatchEvent(new Event("authStateChanged"));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="border-b border-neutral-200 bg-white px-4 py-1 text-center text-[0.7rem] font-medium uppercase tracking-wide text-neutral-900">
          Free shipping on orders over $75
        </div>
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 md:py-4">
          {/* Logo - Far Left */}
          <Link href="/" className="flex flex-shrink-0 items-center">
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Top Line
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
            <Link 
              href="/products" 
              className="hover:text-neutral-900 transition duration-200"
              title="View all products"
            >
              New Arrivals
            </Link>
            <Link 
              href="/categories/men" 
              className="hover:text-neutral-900 transition duration-200"
              title="Browse men's collection"
            >
              Men
            </Link>
            <Link 
              href="/categories/women" 
              className="hover:text-neutral-900 transition duration-200"
              title="Browse women's collection"
            >
              Women
            </Link>
            <Link 
              href="/categories/accessories" 
              className="hover:text-neutral-900 transition duration-200"
              title="Browse accessories collection"
            >
              Accessories
            </Link>
            <Link 
              href="/about" 
              className="hover:text-neutral-900 transition duration-200"
              title="About Top Line"
            >
              About
            </Link>
            <Link 
              href="/faq" 
              className="hover:text-neutral-900 transition duration-200"
              title="FAQ"
            >
              FAQ
            </Link>
          </nav>

          {/* Search - Desktop only */}
          <div className="hidden flex-1 px-8 md:block">
            <SearchBar />
          </div>

          {/* Icons - Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full border border-neutral-300 p-2 text-neutral-700 hover:bg-neutral-100 transition duration-200"
              aria-label={`Open shopping cart (${totalQuantity} items)`}
              title={`Open shopping cart (${totalQuantity} items)`}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-neutral-900 px-1 text-[0.6rem] font-semibold text-white">
                  {totalQuantity}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="hidden rounded-full border border-neutral-300 p-2 text-neutral-700 hover:bg-neutral-100 transition duration-200 md:inline-flex items-center justify-center"
                  title="Account menu"
                >
                  <UserIcon className="h-5 w-5" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-200 bg-white shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-xs text-neutral-600">Signed in as</p>
                      <p className="text-sm font-medium text-neutral-900 truncate">{userEmail}</p>
                    </div>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                      title="Go to account"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                      title="View orders"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                      title="View wishlist"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 transition border-t border-neutral-200"
                      title="Sign out"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white shadow-minimal hover:bg-neutral-800 transition duration-200 md:inline-block"
                title="Sign in to your account"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-t border-neutral-200 bg-white py-2 md:hidden">
          <div className="mx-auto max-w-6xl px-4">
            <SearchBar />
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

