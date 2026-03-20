import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
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
          height: '65vh',
          minHeight: '500px'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-3xl px-6 md:px-8 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-light text-white tracking-tight">
              TOP LINE
            </h1>
          </div>
        </div>
      </section>

      {/* 2. INTRO STATEMENT */}
      <section className="relative w-full border-b border-neutral-200 overflow-hidden" style={{ height: '65vh', minHeight: '500px' }}>
        <Image
          src="https://drive.google.com/uc?export=view&id=1FocHwdF9BkZ2IAeCEUiUIhaHyqrbdcH2"
          alt="Style, simplified"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        
        {/* Content */}
        <div className="relative h-full flex items-start px-6 md:px-8 pt-10 md:pt-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">Style, simplified.</h2>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY - EDITORIAL LAYOUT */}
      <section className="w-full bg-white py-24 md:py-32 border-b border-neutral-200">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 lg:gap-24 px-6 md:px-8 lg:px-12 max-w-7xl mx-auto items-center">
          {/* Left: Story Text */}
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
                Our Story
              </h3>
              
              <div className="space-y-6 text-lg text-neutral-700 font-light leading-relaxed">
                <p>
                  Top Line began with a simple idea — strip away the unnecessary. In a world of endless noise and limitless choices, we believed there was space for something different.
                </p>
                
                <p>
                  We design essentials that feel effortless, wearable, and timeless. Each piece is intentional. Each design is considered. No trends, no shortcuts.
                </p>
                
                <p>
                  From our origins in Dhaka to our growing community worldwide, we're committed to one thing: creating clothing that improves your life, not complicates it.
                </p>
                
                <p>
                  Quality. Simplicity. Integrity. These aren't just words. They're the foundation of everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 w-full">
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1506629082847-11b53f8b2e4d?w=800&h=800&fit=crop"
                alt="Top Line Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES GRID */}
      <section className="w-full bg-neutral-50 py-24 md:py-32 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h3 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
              Our Values
            </h3>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
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
              <div key={index} className="space-y-3">
                <h4 className="text-xl font-light text-neutral-900">
                  {value.title}
                </h4>
                <p className="text-neutral-600 font-light text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="flex flex-col items-center justify-center px-6 md:px-8 gap-12">
          <div className="text-center space-y-6 max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
              Ready to elevate your wardrobe?
            </h3>
            <p className="text-lg text-neutral-600 font-light">
              Discover our curated collection of modern essentials.
            </p>
          </div>

          {/* CTA Button */}
          <Link 
            href="/categories/men"
            className="group inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-3 text-lg font-light hover:bg-neutral-800 transition-colors"
          >
            Shop Collection
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
