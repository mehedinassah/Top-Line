'use client';

import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

interface SizeChart {
  size: string;
  chest: string;
  waist: string;
  length: string;
  sleeves?: string;
}

interface SizeGuideProps {
  category?: string;
  sizeChart: SizeChart[];
}

export default function SizeGuide({ category = 'clothing', sizeChart }: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border border-neutral-300 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 md:px-5 py-4 md:py-4.5 hover:bg-neutral-50 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3">
          <CheckIcon className="w-5 h-5 text-neutral-700 group-hover:text-neutral-900 transition-colors" />
          <h3 className="font-semibold text-neutral-900 text-sm md:text-base">Size Guide</h3>
        </div>
        <ChevronDownIcon 
          className={`w-5 h-5 text-neutral-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Drawer Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div className="px-4 md:px-5 py-5 md:py-6 border-t border-neutral-200 bg-gradient-to-b from-neutral-50 to-white">
          <div className="mb-5">
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              All measurements are in inches. For the best fit, measure yourself and compare with our size chart.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="text-left py-2.5 px-3 font-semibold text-neutral-900">Size</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-neutral-900">Chest</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-neutral-900">Waist</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-neutral-900">Length</th>
                  {sizeChart[0]?.sleeves && (
                    <th className="text-left py-2.5 px-3 font-semibold text-neutral-900">Sleeves</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-neutral-200 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} hover:bg-neutral-100`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-neutral-900">{row.size}</td>
                    <td className="py-2.5 px-3 text-neutral-700">{row.chest}</td>
                    <td className="py-2.5 px-3 text-neutral-700">{row.waist}</td>
                    <td className="py-2.5 px-3 text-neutral-700">{row.length}</td>
                    {row.sleeves && <td className="py-2.5 px-3 text-neutral-700">{row.sleeves}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 md:p-4 bg-blue-50 border border-blue-200 text-xs md:text-sm text-blue-900">
            <p className="font-semibold mb-1">💡 Tip:</p>
            <p>If you're between sizes, we recommend sizing up for a comfortable fit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
