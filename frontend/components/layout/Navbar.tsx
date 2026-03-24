"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchBar from "@/components/search/SearchBar";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartContext";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { totalQuantity } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize on mount to load auth state from localStorage
  useEffect(() => {
    const updateAuthState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const email = localStorage.getItem("userEmail") || "";
      const name = localStorage.getItem("userName") || "User";
      setIsLoggedIn(loggedIn);
      setUserEmail(email);
      setUserName(name);
    };

    updateAuthState();

    // Listen for auth state changes
    const handleAuthStateChange = () => {
      updateAuthState();
    };

    window.addEventListener("authStateChanged", handleAuthStateChange);
    window.addEventListener("storage", handleAuthStateChange);
    
    return () => {
      window.removeEventListener("authStateChanged", handleAuthStateChange);
      window.removeEventListener("storage", handleAuthStateChange);
    };
  }, []);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle soft refresh on navigation
  const handleNavigation = (href: string) => {
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    setIsRefreshing(true);
    
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Check if we're already on this page
    if (pathname === href || pathname === href + "/") {
      // Soft refresh: revalidate the current page with a visible effect
      setTimeout(() => {
        router.refresh();
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      }, 300);
    } else {
      // Navigate to the new page
      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      }, 300);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    // Clear user's wishlist and orders on logout
    localStorage.removeItem("topline_wishlist");
    localStorage.removeItem("topline_orders");
    setIsLoggedIn(false);
    setUserEmail("");
    setShowProfileMenu(false);
    // Dispatch event for other components to listen
    window.dispatchEvent(new Event("authStateChanged"));
    // Reload page to refresh all components
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur transition-all duration-300 ${isRefreshing ? 'bg-blue-50/95' : ''}`}>
        {isRefreshing && (
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse" />
        )}
        <div className="mx-auto flex max-w-6xl items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3">
          {/* Logo - Far Left */}
          <button 
            onClick={() => handleNavigation("/")}
            className="flex flex-shrink-0 items-center bg-none border-none cursor-pointer p-0"
            title="Go to home"
          >
            <span className="text-xs sm:text-sm md:text-lg font-bold tracking-tight text-neutral-900">
              Top Line
            </span>
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden items-center gap-4 md:gap-8 text-xs sm:text-sm md:text-sm font-medium text-neutral-700 md:flex">
            <button
              onClick={() => handleNavigation("/products")}
              disabled={isRefreshing}
              className={`hover:text-neutral-900 transition duration-200 bg-none border-none cursor-pointer text-neutral-700 p-0 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="View all products"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavigation("/categories/men")}
              disabled={isRefreshing}
              className={`hover:text-neutral-900 transition duration-200 bg-none border-none cursor-pointer text-neutral-700 p-0 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Browse men's collection"
            >
              Men
            </button>
            <button
              onClick={() => handleNavigation("/categories/women")}
              disabled={isRefreshing}
              className={`hover:text-neutral-900 transition duration-200 bg-none border-none cursor-pointer text-neutral-700 p-0 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Browse women's collection"
            >
              Women
            </button>
            <button
              onClick={() => handleNavigation("/categories/accessories")}
              disabled={isRefreshing}
              className={`hover:text-neutral-900 transition duration-200 bg-none border-none cursor-pointer text-neutral-700 p-0 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Browse accessories collection"
            >
              Accessories
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              disabled={isRefreshing}
              className={`hover:text-neutral-900 transition duration-200 bg-none border-none cursor-pointer text-neutral-700 p-0 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="About Top Line"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("/faq")}
              disabled={isRefreshing}
              className={`hover:text-neutral-900 transition duration-200 bg-none border-none cursor-pointer text-neutral-700 p-0 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="FAQ"
            >
              FAQ
            </button>
          </nav>

          {/* Search - Visible on all sizes */}
          <div className="flex-grow-0 sm:flex-1 px-0.5 sm:px-2 md:px-4 max-w-[140px] sm:max-w-none">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block md:hidden border border-neutral-300 p-1 text-neutral-700 hover:bg-neutral-100 transition duration-200 ml-1"
            aria-label="Toggle navigation menu"
            title="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>

          {/* Icons - Right Side */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 sm:p-1.5 md:p-2 text-neutral-700 hover:bg-neutral-100 transition duration-200"
              aria-label={`Open shopping cart (${totalQuantity} items)`}
              title={`Open shopping cart (${totalQuantity} items)`}
            >
              <ShoppingBagIcon className="h-4 sm:h-5 w-4 sm:w-5" />
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center bg-neutral-900 px-1 text-[0.6rem] font-semibold text-white">
                  {totalQuantity}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="hidden p-1 sm:p-1.5 md:p-2 text-neutral-700 hover:bg-neutral-100 transition duration-200 sm:inline-flex items-center justify-center"
                  title="Account menu"
                >
                  <UserIcon className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 border border-neutral-200 bg-white shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-xs text-neutral-600">Signed in as</p>
                      <p className="text-sm font-medium text-neutral-900 truncate">{userName}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavigation("/account");
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition bg-none border-none cursor-pointer"
                      title="Go to account"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => {
                        handleNavigation("/account/orders");
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition bg-none border-none cursor-pointer"
                      title="View orders"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        handleNavigation("/wishlist");
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition bg-none border-none cursor-pointer"
                      title="View wishlist"
                    >
                      Wishlist
                    </button>
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
              <button
                onClick={() => handleNavigation("/auth/login")}
                disabled={isRefreshing}
                className={`hidden bg-neutral-900 px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm font-medium text-white shadow-minimal hover:bg-neutral-800 transition duration-200 sm:inline-block border-none ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Sign in to your account"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200 bg-white md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-3 py-4 border-t border-neutral-200">
                <button
                  onClick={() => handleNavigation("/products")}
                  disabled={isRefreshing}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="View all products"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => handleNavigation("/categories/men")}
                  disabled={isRefreshing}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Browse men's collection"
                >
                  Men
                </button>
                <button
                  onClick={() => handleNavigation("/categories/women")}
                  disabled={isRefreshing}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Browse women's collection"
                >
                  Women
                </button>
                <button
                  onClick={() => handleNavigation("/categories/accessories")}
                  disabled={isRefreshing}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Browse accessories collection"
                >
                  Accessories
                </button>
                <button
                  onClick={() => handleNavigation("/about")}
                  disabled={isRefreshing}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="About Top Line"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavigation("/faq")}
                  disabled={isRefreshing}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="FAQ"
                >
                  FAQ
                </button>
              </nav>

              {/* Mobile Auth Links */}
              <div className="border-t border-neutral-200 pt-4 mt-4">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 mb-3 bg-neutral-50 rounded">
                      <p className="text-xs text-neutral-600">Signed in as</p>
                      <p className="text-sm font-medium text-neutral-900 truncate">{userName}</p>
                    </div>
                    <button
                      onClick={() => handleNavigation("/account")}
                      disabled={isRefreshing}
                      className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Go to account"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => handleNavigation("/account/orders")}
                      disabled={isRefreshing}
                      className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="View orders"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => handleNavigation("/wishlist")}
                      disabled={isRefreshing}
                      className={`block w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded transition duration-200 bg-none border-none cursor-pointer ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="View wishlist"
                    >
                      Wishlist
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-neutral-100 rounded transition duration-200 mt-2"
                      title="Sign out"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    disabled={isRefreshing}
                    className={`block w-full px-3 py-2 text-sm font-medium text-center text-white bg-neutral-900 hover:bg-neutral-800 rounded transition duration-200 border-none ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Sign in to your account"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}


