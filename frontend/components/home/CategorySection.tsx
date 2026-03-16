"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    slug: "men",
    title: "Men",
    subtitle: "Premium essentials for the modern man",
    image: "https://images.unsplash.com/photo-1552062407-c551eeda4bae?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "women",
    title: "Women",
    subtitle: "Elegant designs and contemporary styles",
    image: "https://images.unsplash.com/photo-1595777707802-221658fb74c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "accessories",
    title: "Accessories",
    subtitle: "Perfect finishing touches for any outfit",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80"
  }
];

export default function CategorySection() {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Section Title */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            Shop by category
          </h2>
          <Link
            href="/products"
            className="text-xs font-medium text-neutral-700 hover:text-neutral-900 transition"
            title="Browse all products"
          >
            Explore all →
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block overflow-hidden rounded-lg bg-neutral-50"
                title={`Browse ${category.title} collection`}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-neutral-200">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-neutral-900/0 transition duration-300 group-hover:from-neutral-900/70" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6">
                  <motion.div
                    className="space-y-2 text-center"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {category.title}
                    </h3>
                    <p className="text-sm text-neutral-100 md:text-base">
                      {category.subtitle}
                    </p>
                    
                    {/* Shop Now Button */}
                    <motion.button
                      className="mx-auto mt-3 block rounded-full border-2 border-white bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-neutral-900 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
