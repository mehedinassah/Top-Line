'use client';

import Image from 'next/image';

export default function PaymentMethods() {
  const methods = [
    { name: 'Visa', icon: '💳' },
    { name: 'PayPal', icon: '🅿️' },
    { name: 'Apple Pay', icon: '🍎' },
    { name: 'Google Pay', icon: '🔵' },
    { name: 'Stripe', icon: '💰' },
  ];

  return (
    <div className="flex flex-col items-center py-8">
      <p className="text-sm text-gray-600 mb-4 font-medium">We Accept</p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {methods.map((method) => (
          <div key={method.name} className="flex flex-col items-center">
            <div className="text-3xl mb-2">{method.icon}</div>
            <span className="text-xs text-gray-500 text-center">{method.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

