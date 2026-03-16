import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">About Top Line</h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Curated essentials for the modern wardrobe, crafted with care and delivered with excellence
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">Our Story</h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Top Line was founded on the belief that great style doesn't need to be complicated. We started as a small team in Dhaka with a simple mission: to create high-quality, minimalist clothing that works for everyone.
                </p>
                <p>
                  Every piece in our collection is carefully selected and designed to be timeless. We believe in quality over quantity, and in creating pieces that you'll love wearing for years to come.
                </p>
                <p>
                  From our small studio in Dhaka to customers around the world, we're committed to bringing you the best in contemporary fashion.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100" />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Quality First", description: "We prioritize quality in every piece." },
              { title: "Minimal Design", description: "Clean lines, timeless aesthetics." },
              { title: "Sustainable", description: "Responsibly sourced materials." },
              { title: "Customer Focus", description: "Your satisfaction is our priority." },
              { title: "Innovation", description: "Constantly evolving our collections." },
              { title: "Community", description: "Building a community of style lovers." }
            ].map((value, index) => (
              <div key={index} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-neutral-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-900 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to join us?</h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Explore our collection and discover your next favorite piece
          </p>
          <Link
            href="/products"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-neutral-900 hover:bg-neutral-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
