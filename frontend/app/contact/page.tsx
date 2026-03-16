"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/toast/ToastContext";

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      addToast("Please fill in all fields", "error");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToast("Message sent successfully! We'll get back to you soon.", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      addToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Have a question? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Email</h3>
                  <a href="mailto:hello@topline.com" className="text-neutral-700 hover:text-neutral-900">
                    hello@topline.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Location</h3>
                  <p className="text-neutral-700">Dhaka, Bangladesh</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    {["Instagram", "Twitter", "Facebook"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-neutral-700 hover:text-neutral-900 text-sm"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 resize-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
