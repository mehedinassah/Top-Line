import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">Top Line</h3>
            <p className="text-sm text-neutral-300 leading-relaxed"></p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories/men" className="text-neutral-300 hover:text-white transition duration-200" title="Shop mens collection">Men</Link></li>
              <li><Link href="/categories/women" className="text-neutral-300 hover:text-white transition duration-200" title="Shop womens collection">Women</Link></li>
              <li><Link href="/categories/accessories" className="text-neutral-300 hover:text-white transition duration-200" title="Shop accessories">Accessories</Link></li>
              <li><Link href="/products?sort=newest" className="text-neutral-300 hover:text-white transition duration-200" title="View new arrivals">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-neutral-300 hover:text-white transition duration-200" title="Track your orders">Order Status</Link></li>
              <li><Link href="/faq" className="text-neutral-300 hover:text-white transition duration-200" title="Visit size guide">Size Guide</Link></li>
              <li><Link href="/contact" className="text-neutral-300 hover:text-white transition duration-200" title="Contact support">Contact Us</Link></li>
              <li><Link href="/faq" className="text-neutral-300 hover:text-white transition duration-200" title="Shipping information">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-300 hover:text-white transition duration-200" title="About Top Line">About Us</Link></li>
              <li><Link href="/about" className="text-neutral-300 hover:text-white transition duration-200" title="Privacy policy">Privacy Policy</Link></li>
              <li><Link href="/about" className="text-neutral-300 hover:text-white transition duration-200" title="Terms and conditions">Terms & Conditions</Link></li>
              <li><Link href="/about" className="text-neutral-300 hover:text-white transition duration-200" title="Returns policy">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Follow</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://instagram.com/topline" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition duration-200" title="Follow on Instagram">Instagram</a></li>
              <li><a href="https://twitter.com/topline" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition duration-200" title="Follow on Twitter">Twitter</a></li>
              <li><a href="https://facebook.com/topline" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition duration-200" title="Like on Facebook">Facebook</a></li>
              <li><a href="https://pinterest.com/topline" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition duration-200" title="Follow on Pinterest">Pinterest</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Top Line. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-neutral-400">
            <span>Handcrafted with care</span>
            <span>•</span>
            <span>Based in Dhaka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

