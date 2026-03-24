"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    slug: "men",
    title: "Men",
    image: "https://images.pexels.com/photos/6634474/pexels-photo-6634474.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200"
  },
  {
    slug: "women",
    title: "Women",
    image: "https://images.pexels.com/photos/3111096/pexels-photo-3111096.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200"
  },
  {
    slug: "accessories",
    title: "Accessories",
    image: "https://images.pexels.com/photos/7327051/pexels-photo-7327051.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200"
  }
];

export default function CategorySection() {
  return (
    <section className="border-b border-neutral-200 bg-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 md:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-neutral-700 uppercase">
            Browse
          </h2>
          <h3 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            Shop by Category
          </h3>
        </div>

        {/* Gallery Grid - Premium Fashion Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-3">
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
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/90 font-light tracking-wide">
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

