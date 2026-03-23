import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    slug: "new-denim",
    title: "New Denim",
    subtitle: "Relaxed, straight and flare fits.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    href: "/products?category=jeans"
  },
  {
    slug: "bottoms",
    title: "New Bottoms",
    subtitle: "Tailored trousers and cargo pants.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    href: "/products?category=pants"
  },
  {
    slug: "tops",
    title: "New Tops",
    subtitle: "Shirts, tees and layering pieces.",
    image:
      "https://images.unsplash.com/photo-1525171254930-643fc658b64e?auto=format&fit=crop&w=1200&q=80",
    href: "/products?category=shirts"
  },
  {
    slug: "outerwear",
    title: "Outerwear",
    subtitle: "Overcoats, bombers and lightweight jackets.",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=80",
    href: "/products?category=outerwear"
  }
];

export default function CollectionsGrid() {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Featured collections</h2>
          <Link
            href="/products"
            className="text-xs font-medium text-neutral-700 hover:text-neutral-900 transition"
            title="Browse all products"
          >
            Shop all →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={collection.href}
              className="group flex flex-col overflow-hidden  border border-neutral-200 bg-white hover:border-neutral-300 transition hover:shadow-minimal"
              title={`Browse ${collection.title}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between px-3 py-3">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {collection.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-700">{collection.subtitle}</p>
                </div>
                <span className="mt-2 text-xs font-medium text-neutral-900 hover:text-neutral-700 transition">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

