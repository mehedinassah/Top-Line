'use client';

import { CheckIcon } from '@heroicons/react/24/solid';

interface ProductHighlightsProps {
  description: string;
  category: string;
}

// Generate highlights from product description and category
function generateHighlights(description: string, category: string): string[] {
  const highlights: string[] = [];
  
  // Add category as first highlight
  if (category) {
    highlights.push(`${category.charAt(0).toUpperCase() + category.slice(1)}`);
  }

  // Extract key phrases from description
  const keyPhrases = [
    description.includes('premium') ? 'Premium quality material' : null,
    description.includes('comfortable') ? 'Comfortable fit' : null,
    description.includes('versatile') ? 'Versatile design' : null,
    description.includes('elegant') ? 'Elegant style' : null,
    description.includes('durable') ? 'Long-lasting durability' : null,
    description.includes('classic') ? 'Timeless classic' : null,
    description.includes('luxury') ? 'Luxury crafted' : null,
  ];

  keyPhrases.forEach(phrase => {
    if (phrase && !highlights.includes(phrase)) {
      highlights.push(phrase);
    }
  });

  // If we don't have enough highlights, add generic ones
  if (highlights.length < 3) {
    const generic = [
      'Carefully selected materials',
      'Expertly crafted',
      'Available in multiple colors',
      'Perfect for any occasion'
    ];
    
    generic.forEach(item => {
      if (highlights.length < 4 && !highlights.includes(item)) {
        highlights.push(item);
      }
    });
  }

  return highlights.slice(0, 4);
}

export default function ProductHighlights({ description, category }: ProductHighlightsProps) {
  const highlights = generateHighlights(description, category);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-5 md:py-6">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-start gap-2">
          <CheckIcon className="h-5 w-5 text-neutral-900 flex-shrink-0 mt-0.5" />
          <span className="text-xs md:text-sm text-neutral-700 font-medium">
            {highlight}
          </span>
        </div>
      ))}
    </div>
  );
}
