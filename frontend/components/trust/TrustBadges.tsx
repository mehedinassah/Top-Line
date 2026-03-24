'use client';

import { CheckCircleIcon, ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function TrustBadges() {
  const badges = [
    {
      icon: <ArrowPathIcon className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'On orders over $50',
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Premium Quality',
      description: '100% authentic products',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-4 md:px-0">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="text-gray-800 mb-3">{badge.icon}</div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{badge.title}</h3>
          <p className="text-sm text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}

