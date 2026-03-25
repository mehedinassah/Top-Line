'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from "next/link";
import SizeGuideModal from "@/components/product/SizeGuideModal";

const SIZE_CHART = [
  { size: 'XS', chest: '32"', length: '27"', sleeves: '31"' },
  { size: 'S', chest: '34"', length: '28"', sleeves: '32"' },
  { size: 'M', chest: '36"', length: '29"', sleeves: '33"' },
  { size: 'L', chest: '38"', length: '30"', sleeves: '34"' },
  { size: 'XL', chest: '40"', length: '31"', sleeves: '35"' },
  { size: 'XXL', chest: '42"', length: '32"', sleeves: '36"' },
  { size: 'XXXL', chest: '44"', length: '33"', sleeves: '37"' },
];

export default function Footer() {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    // Scroll to top immediately (without delay)
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Check if we're already on this page
    if (pathname === href || pathname === href + "/") {
      // Soft refresh: revalidate the current page with a visible effect
      router.refresh();
    } else {
      // Navigate to the new page
      router.push(href);
    }
  };

  return (
    <>
      <footer className="border-t border-neutral-900 bg-neutral-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:gap-8 grid-cols-2 md:grid-cols-5">
          {/* Brand - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block">
            <h3 className="text-lg font-bold tracking-tight mb-4">Top Line</h3>
            <p className="text-sm text-neutral-300 leading-relaxed"></p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavigation("/categories/men")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Shop mens collection">Men</button></li>
              <li><button onClick={() => handleNavigation("/categories/women")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Shop womens collection">Women</button></li>
              <li><button onClick={() => handleNavigation("/categories/accessories")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Shop accessories">Accessories</button></li>
              <li><button onClick={() => handleNavigation("/products?sort=newest")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="View new arrivals">New Arrivals</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavigation("/account/orders")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Track your orders">Order Status</button></li>
              <li><button onClick={() => setShowSizeGuide(true)} className="text-neutral-300 hover:text-white transition duration-200 cursor-pointer bg-none border-none p-0 text-left" title="View size guide">Size Guide</button></li>
              <li><button onClick={() => handleNavigation("/contact")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Contact support">Contact Us</button></li>
              <li><button onClick={() => handleNavigation("/faq")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Shipping information">Shipping Info</button></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavigation("/about")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="About Top Line">About Us</button></li>
              <li><button onClick={() => handleNavigation("/faq")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Privacy policy">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation("/faq")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Terms and conditions">Terms & Conditions</button></li>
              <li><button onClick={() => handleNavigation("/faq")} className="text-neutral-300 hover:text-white transition duration-200 bg-none border-none cursor-pointer p-0 text-left" title="Returns policy">Returns & Exchanges</button></li>
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

    <SizeGuideModal 
      isOpen={showSizeGuide}
      onClose={() => setShowSizeGuide(false)}
      sizeChart={SIZE_CHART}
    />
    </>
  );
}


