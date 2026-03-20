"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const heroImages = [
  {
    url: "https://drive.google.com/uc?export=view&id=1CVAphp5_n1EO8nq1OxgyC1b8KePhJ4WP",
    alt: "Homepage hero image 1"
  },
  {
    url: "https://drive.google.com/uc?export=view&id=1TRbOMaietYgk5VpupjhteBY99_-BnZyH",
    alt: "Homepage hero image 2"
  },
  {
    url: "https://drive.google.com/uc?export=view&id=1jjiAd9jzcLNtvi88i2p5Cs_bagFwFdoe",
    alt: "Homepage hero image 3"
  }
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

