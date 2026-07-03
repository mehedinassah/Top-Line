"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/api";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }
    if (!getToken()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;
  if (!ready) return null;

  const handleLogout = () => {
    clearToken();
    router.replace("/admin/login");
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen flex bg-neutral-100 text-neutral-900">
      <aside className="w-60 shrink-0 bg-neutral-900 text-neutral-100 flex flex-col">
        <div className="px-6 py-5 border-b border-neutral-800">
          <div className="text-lg font-bold">Top-Line</div>
          <div className="text-xs text-neutral-400">Admin Panel</div>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-6 py-2.5 text-sm transition ${
                isActive(item.href)
                  ? "bg-neutral-800 text-white font-medium border-l-2 border-white"
                  : "text-neutral-300 hover:bg-neutral-800/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-800 space-y-2">
          <Link
            href="/"
            className="block text-center text-xs text-neutral-400 hover:text-white"
          >
            ← Back to store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-sm rounded px-4 py-2"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  );
}
