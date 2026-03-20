"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",
    alt: "Elegant fashion lifestyle photography"
  },
  {
    url: "https://images.unsplash.com/photo-1455849318743-63233373ff62?w=1200&q=80",
    alt: "Modern fashion essentials"
  },
  {
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    alt: "Contemporary fashion styling"
  },
  {
    url: "https://images.unsplash.com/photo-1483389127117-b6a938b99aea?w=1200&q=80",
    alt: "Luxury fashion collection"
  }
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.button
          key={currentImage}
          onClick={() => {
            window.location.href = "/products";
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 cursor-pointer group"
          aria-label="Browse products"
          title="Click to view all products"
        >
          <Image
            src={heroImages[currentImage].url}
            alt={heroImages[currentImage].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300" />
        </motion.button>
      </AnimatePresence>

      {/* Content Overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-4xl px-4 text-center space-y-6">
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4">
              Clean lines.<br /> Premium fit.
            </h1>
            <p className="text-lg md:text-xl text-neutral-100 max-w-2xl mx-auto leading-relaxed">
              Curated collection of essentials for the modern wardrobe. Built to last, designed to inspire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/products"
              className="rounded-sm bg-white px-8 py-3 text-center text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition duration-200 shadow-lg"
              title="Shop collection"
            >
              Shop collection
            </Link>
            <Link
              href="/products?sort=newest"
              className="rounded-sm border-2 border-white px-8 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 transition duration-200"
              title="View new arrivals"
            >
              What's new
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition duration-200 backdrop-blur-sm"
        aria-label="Previous image"
        title="Previous image"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition duration-200 backdrop-blur-sm"
        aria-label="Next image"
        title="Next image"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 transition duration-300 rounded-full ${
              index === currentImage ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${index + 1}`}
            title={`Image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

