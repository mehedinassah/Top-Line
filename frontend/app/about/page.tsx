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
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80"
          alt="Style, simplified"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-6 md:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl">
            <h2 className="text-xl md:text-3xl font-bold tracking-tight leading-relaxed" style={{
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Woven as if the fabric itself was created just for you—tailored to your comfort, your presence.
            </h2>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY - FULL WIDTH IMAGE BACKGROUND */}
      <section className="relative w-full border-b border-neutral-200 overflow-hidden" style={{ minHeight: '600px' }}>
        <Image
          src="https://images.unsplash.com/photo-1519309881563-430f63602d4b?auto=format&fit=crop&w=2000&q=80"
          alt="Our Story"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8">
          <p className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap" style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            This isn't fabric. It's identity. It's lifestyle.
          </p>
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
