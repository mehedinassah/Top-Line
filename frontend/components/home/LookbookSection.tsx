"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function LookbookSection() {
  const editorialImages = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80",
      alt: "Editorial Look 1",
      link: "/products?category=men",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      alt: "Editorial Look 2",
      link: "/products?category=women",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1508615039623-a25605d2938d?auto=format&fit=crop&w=800&q=80",
      alt: "Editorial Look 3",
      link: "/products?category=accessories",
    },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-8">
          <h2 className="text-center text-2xl font-bold text-neutral-900 md:text-3xl">
            TOP LINE
          </h2>
          <p className="text-center text-lg text-neutral-700 md:text-xl">
            LOOKBOOK
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {editorialImages.map((item) => (
            <Link key={item.id} href={item.link}>
              <div
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />

                {/* Center text - visible on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-center text-white">
                    <p className="text-sm font-semibold tracking-widest md:text-base">
                      {item.id === 1 && "MEN'S"}
                      {item.id === 2 && "WOMEN'S"}
                      {item.id === 3 && "ACCESSORIES"}
                    </p>
                    <p className="text-xs text-white/80 mt-2">View Collection →</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
