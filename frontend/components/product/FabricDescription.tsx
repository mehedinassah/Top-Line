'use client';

import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

interface FabricDetails {
  material: string;
  composition: string;
  care: string;
  description: string;
}

interface FabricDescriptionProps {
  details: FabricDetails;
}

export default function FabricDescription({ details }: FabricDescriptionProps) {
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
          <h3 className="font-semibold text-neutral-900 text-sm md:text-base">Fabric & Materials</h3>
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
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">Material</p>
              <p className="text-sm text-neutral-900 font-medium">{details.material}</p>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">Composition</p>
              <p className="text-sm text-neutral-900 font-medium">{details.composition}</p>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">About This Fabric</p>
              <p className="text-sm text-neutral-700 leading-relaxed">{details.description}</p>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">Care Instructions</p>
              <p className="text-sm text-neutral-700">{details.care}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

