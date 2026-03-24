'use client';

import { CheckIcon, TruckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface TrustSignal {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function TrustSignals() {
  const signals: TrustSignal[] = [
    {
      icon: <TruckIcon className="h-6 w-6" />,
      title: 'Free Delivery',
      description: 'On orders over ৳2,000'
    },
    {
      icon: <ArrowPathIcon className="h-6 w-6" />,
      title: '30-Day Returns',
      description: 'Change your mind hassle-free'
    },
    {
      icon: <CheckIcon className="h-6 w-6" />,
      title: 'Quality Assured',
      description: 'Premium materials guaranteed'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {signals.map((signal, index) => (
        <div 
          key={index}
          className="border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-4 md:p-5 hover:border-neutral-300 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="text-neutral-900 flex-shrink-0 pt-0.5">
              {signal.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">
                {signal.title}
              </h4>
              <p className="mt-1 text-xs text-neutral-600">
                {signal.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

