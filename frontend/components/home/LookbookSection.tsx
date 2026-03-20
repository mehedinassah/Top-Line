"use client";

import Link from "next/link";
import Image from "next/image";

export default function LookbookSection() {
  const editorialImages = [
    {
      id: 1,
      image:
        "https://drive.google.com/uc?export=view&id=1aekJJSLXptikHQ1FbKRwIXHa4GTFktD2",
      alt: "Editorial Look 1",
      link: "/products?category=men",
      label: "MEN'S",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&h=1200&q=80",
      alt: "Editorial Look 2",
      link: "/products?category=women",
      label: "WOMEN'S",
    },
    {
      id: 3,
      image:
        "https://drive.google.com/uc?export=view&id=1XEnBAt5WLdptvDrawRjnrsooEqaFFuf-",
      alt: "Editorial Look 3",
      link: "/products?category=accessories",
      label: "ACCESSORIES",
    },
  ];

  return (
    <section className="border-b border-neutral-200 bg-white w-full">
      <div className="w-full px-4 py-16 md:py-20 lg:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-sm font-semibold tracking-widest text-neutral-700 uppercase">
            Look Book
          </h2>
          <h3 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Top Line Editorial
          </h3>
        </div>

        {/* Gallery Grid - Premium Fashion Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {editorialImages.map((item) => (
            <Link key={item.id} href={item.link}>
              <div className="group relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer">
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33.33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/20 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center">
                    <p className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm text-white/90 font-light tracking-wide">
                      Explore Collection
                    </p>
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
