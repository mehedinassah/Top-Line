"use client";

import { useEffect, useState } from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/components/cart/CartContext";

interface NavbarIconsProps {
  isLoggedIn: boolean;
  userName: string;
  onCartOpen: () => void;
  onProfileMenuToggle: () => void;
  showProfileMenu: boolean;
  onLogout: () => void;
  profileMenuContent?: React.ReactNode;
}

export default function NavbarIcons({
  isLoggedIn,
  userName,
  onCartOpen,
  onProfileMenuToggle,
  showProfileMenu,
  onLogout,
  profileMenuContent,
}: NavbarIconsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { totalQuantity } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until mounted (this component is loaded with ssr: false)
  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
      <button
        onClick={onCartOpen}
        className="relative p-1.5 sm:p-2 text-neutral-700 hover:bg-neutral-100 transition duration-200"
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
            onClick={onProfileMenuToggle}
            className="hidden p-1.5 sm:p-2 text-neutral-700 hover:bg-neutral-100 transition duration-200 md:inline-flex items-center justify-center"
            title="Account menu"
          >
            <UserIcon className="h-4 sm:h-5 w-4 sm:w-5" />
          </button>
          {showProfileMenu && profileMenuContent}
        </div>
      ) : (
        <a
          href="/auth/login"
          className="hidden bg-neutral-900 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white shadow-minimal hover:bg-neutral-800 transition duration-200 md:inline-block"
          title="Sign in to your account"
        >
          Sign in
        </a>
      )}
    </div>
  );
}
