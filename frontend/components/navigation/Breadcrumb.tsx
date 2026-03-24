"use client";

import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 transition"
              title="Home"
            >
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRightIcon className="h-4 w-4 text-neutral-400" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-neutral-700 hover:text-neutral-900 transition"
                  title={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

