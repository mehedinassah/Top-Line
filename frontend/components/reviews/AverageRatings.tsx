'use client';

import { StarIcon } from '@heroicons/react/24/solid';

interface ReviewCount {
  rating: number;
  count: number;
}

interface AverageRatingsProps {
  averageRating: number;
  totalReviews: number;
  reviewCounts: ReviewCount[];
}

export default function AverageRatings({ averageRating, totalReviews, reviewCounts }: AverageRatingsProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-6 border-b border-gray-200">
      {/* Left: Average Rating */}
      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">/ 5</span>
        </div>
        <div className="flex mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">{totalReviews} reviews</p>
      </div>

      {/* Right: Rating Distribution */}
      <div className="flex-1 min-w-0">
        {reviewCounts.map((item) => (
          <div key={item.rating} className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">{item.rating}★</span>
            <div className="bg-gray-200 h-2 flex-1">
              <div
                className="bg-yellow-400 h-2 transition-all"
                style={{ width: `${(item.count / totalReviews) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

