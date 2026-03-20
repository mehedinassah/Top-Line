"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    slug: "men",
    title: "Men",
    image: "https://drive.google.com/uc?export=view&id=1SaNdd1iK5cCsXnP7Tc8FLCc051xUKRDH"
  },
  {
    slug: "women",
    title: "Women",
    image: "https://drive.google.com/uc?export=view&id=1A87QR8AfLidNzJT5HljedATCv1Xry0D7"
  },
  {
    slug: "accessories",
    title: "Accessories",
    image: "https://drive.google.com/uc?export=view&id=1RuXFUXf4eMzrR8pu_wP2MI5MSeM_X-I_"
  }
];

export default function CategorySection() {
  return (
    <section className="border-b border-neutral-200 bg-white w-full">
      <div className="w-full px-4 py-16 md:py-20 lg:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-neutral-700 uppercase">
            Browse
          </h2>
          <h3 className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Shop by Category
          </h3>
        </div>

        {/* Gallery Grid - Premium Fashion Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <div className="group relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer">
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  sizes="(min-width: 1024px) 33.33vw, (min-width: 640px) 50vw, 100vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/20 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center">
                    <p className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
                      {category.title}
                    </p>
                    <p className="mt-3 text-sm text-white/90 font-light tracking-wide">
                      Shop Now →
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
