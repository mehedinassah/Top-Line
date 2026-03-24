"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/toast/ToastContext";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all fields", "error");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToast("Message sent successfully! We'll get back to you soon.", "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      addToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-white py-12 sm:py-16 md:py-20 lg:py-28 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-neutral-900 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-light max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-neutral-50 py-12 sm:py-16 md:py-24 lg:py-32 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-16 lg:gap-20 md:grid-cols-2">
            
            {/* Contact Information */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {/* Email */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-light text-neutral-900">Email</h3>
                </div>
                <p className="text-neutral-600 font-light text-sm sm:text-base md:text-lg ml-12 sm:ml-15">
                  <a 
                    href="mailto:hello@topline.com" 
                    className="hover:text-neutral-900 transition-colors"
                  >
                    hello@topline.com
                  </a>
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-light text-neutral-900">Location</h3>
                </div>
                <p className="text-neutral-600 font-light text-sm sm:text-base md:text-lg ml-12 sm:ml-15">
                  Dhaka, Bangladesh
                </p>
              </div>

              {/* Follow Us */}
              <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg md:text-xl font-light text-neutral-900">Follow Us</h3>
                <div className="flex gap-4 sm:gap-6">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white border border-neutral-200 flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-300"
                    title="Follow us on Instagram"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5 text-neutral-900 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.203 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white border border-neutral-200 flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-300"
                    title="Follow us on Twitter"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5 text-neutral-900 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-3.51 9.86 9.86 0 01-2.836.856 4.958 4.958 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white border border-neutral-200 flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-300"
                    title="Follow us on Facebook"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5 text-neutral-900 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="flex flex-col justify-center">
              <div className="bg-white p-6 sm:p-8 md:p-12 border border-neutral-200 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all rounded"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all rounded"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all resize-none rounded"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-neutral-900 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50 rounded"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="w-full bg-white py-8 sm:py-12 md:py-16 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-sm sm:text-base text-neutral-900 font-light hover:text-neutral-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}

