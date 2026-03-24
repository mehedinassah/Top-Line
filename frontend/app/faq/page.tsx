"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are your shipping times?",
    answer: "We typically process orders within 1-2 business days and ship via standard courier. Delivery usually takes 3-7 business days."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package in real-time."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on all items in original condition with tags attached."
  },
  {
    question: "Do you offer exchanges?",
    answer: "Yes! We offer free exchanges for different sizes or colors within 30 days of purchase."
  },
  {
    question: "How do I use a size guide?",
    answer: "Each product page has a 'Size Guide' link with detailed measurements. We recommend checking both length and width."
  },
  {
    question: "Are your clothes sustainable?",
    answer: "We prioritize quality and durability to reduce waste. Our materials are responsibly sourced and ethically produced."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship to most countries with additional shipping costs. International orders may take 2-3 weeks."
  },
  {
    question: "Can I cancel my order?",
    answer: "You can cancel orders that haven't been processed yet. Contact support immediately if you need to cancel."
  }
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-200 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left font-medium text-neutral-900 flex items-center justify-between hover:bg-neutral-50"
      >
        <span>{item.question}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-neutral-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-neutral-200 px-6 py-4 text-neutral-700">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">FAQ</h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Find answers to common questions about shipping, returns, and more
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} item={faq} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Didn't find what you're looking for?</h2>
          <p className="text-neutral-700 mb-8">Contact our support team and we'll be happy to help</p>
          <Link
            href="/contact"
            className="inline-block bg-neutral-900 px-8 py-3 font-semibold text-white hover:bg-neutral-800"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}

