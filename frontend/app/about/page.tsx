"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  return (
    <>
      {/* 1. HERO SECTION */}
      <section 
        className="relative w-full flex items-center justify-center text-center border-b border-neutral-200"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=2000&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1a1a1a',
          height: '50vh',
          minHeight: '350px'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-3xl px-4 sm:px-6 md:px-8 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight">
              TOP LINE
            </h1>
          </div>
        </div>
      </section>

      {/* 2. MISSION */}
      <section className="w-full bg-neutral-50 py-12 sm:py-16 md:py-24 lg:py-32 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 font-light leading-relaxed max-w-3xl">
                At TOP LINE, we believe fashion is more than clothing—it's a form of self-expression and a statement of values. We're committed to creating pieces that seamlessly blend quality, sustainability, and timeless design. Every garment is thoughtfully crafted to empower you to feel confident, comfortable, and authentically yourself.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl font-light text-neutral-900">100%</div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light">Premium Fabrics</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl font-light text-neutral-900">Global</div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light">Sourced Responsibly</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-3xl sm:text-4xl font-light text-neutral-900">5+</div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUES GRID */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-24 lg:py-32 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
              Our Values
            </h3>
            <p className="text-neutral-600 font-light text-xs sm:text-sm md:text-base mt-4">
              Guiding principles that define who we are
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {[
              {
                title: "Built to Last",
                description: "Quality that stands the test of time."
              },
              {
                title: "Less, but Better",
                description: "Intentional design, zero excess."
              },
              {
                title: "Thoughtfully Made",
                description: "Crafted with care and responsibility."
              },
              {
                title: "You Come First",
                description: "Your satisfaction is everything."
              },
              {
                title: "Always Evolving",
                description: "Innovation in every collection."
              },
              {
                title: "Made for Everyone",
                description: "Fashion that unites our community."
              }
            ].map((value, index) => (
              <div key={index} className="group space-y-3 sm:space-y-4 p-6 sm:p-8 border border-neutral-200 bg-white hover:border-neutral-400 transition-all duration-300 hover:shadow-lg">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-neutral-900 group-hover:bg-neutral-800 transition-colors"></div>
                <h4 className="text-base sm:text-lg md:text-xl font-light text-neutral-900 mt-4">
                  {value.title}
                </h4>
                <p className="text-neutral-600 font-light text-xs sm:text-sm md:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="relative w-full overflow-hidden py-16 sm:py-24 md:py-32 lg:py-40">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
        
        {/* Decorative elements - hide on mobile */}
        <div className="hidden sm:block absolute top-0 left-0 w-96 h-96 bg-white/5 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-white/5 translate-x-1/2 translate-y-1/2"></div>
        
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 gap-8 sm:gap-12">
          <div className="text-center space-y-4 sm:space-y-6 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight">
              Ready to elevate your wardrobe?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/70 font-light">
              Discover our curated collection of modern essentials and timeless pieces.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
            <Link 
              href="/products"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-neutral-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-light hover:bg-neutral-100 transition-all duration-300 hover:shadow-lg w-full sm:w-auto rounded"
            >
              Shop All Products
              <ArrowRightIcon className="h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <section className="w-full bg-white border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-3 sm:flex-row items-center justify-center sm:gap-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="cursor-pointer inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-light text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg rounded w-full sm:w-auto"
              title="Return to homepage"
            >
              Top Line
            </button>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="cursor-pointer inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-light text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded w-full sm:w-auto"
              title="Get in touch with us"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

