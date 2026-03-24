'use client';

import { StarIcon } from '@heroicons/react/24/solid';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Sarah M.',
      image: '👩‍🦰',
      rating: 5,
      text: 'Absolutely love the quality! The fabric feels premium and the fit was perfect.',
      date: '2 weeks ago',
    },
    {
      name: 'Jessica L.',
      image: '👩',
      rating: 5,
      text: 'Fast delivery and amazing customer service. Will definitely order again!',
      date: '1 month ago',
    },
    {
      name: 'Emma R.',
      image: '👱‍♀️',
      rating: 5,
      text: 'The styling looks just like the photos. Super impressed with the overall experience.',
      date: '3 weeks ago',
    },
    {
      name: 'Lisa K.',
      image: '👩‍🦱',
      rating: 5,
      text: 'Best purchase I\'ve made! The attention to detail is incredible.',
      date: '1 week ago',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-0">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Loved by Customers</h2>
        <p className="text-gray-600">See what our customers have to say</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">{testimonial.image}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.date}</p>
              </div>
            </div>

            <div className="flex mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
