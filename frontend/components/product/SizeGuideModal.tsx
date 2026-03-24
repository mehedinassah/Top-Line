'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';

interface SizeChart {
  size: string;
  chest?: string;
  waist?: string;
  length?: string;
  sleeves?: string;
  inseam?: string;
  width?: string;
  height?: string;
  depth?: string;
  strap?: string;
}

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChart: SizeChart[];
  category?: string;
}

export default function SizeGuideModal({ isOpen, onClose, sizeChart, category }: SizeGuideModalProps) {
  if (!isOpen) return null;

  // Get all column keys from the size chart
  const getColumns = () => {
    if (!sizeChart.length) return [];
    const firstRow = sizeChart[0];
    return Object.keys(firstRow).filter(key => key !== 'size');
  };

  const columns = getColumns();

  return (
    <>
      {/* Backdrop - Smooth fade in/out */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 opacity-100 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal - Smooth scale and fade */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl pointer-events-auto animate-slideUp">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-5">
            <h2 className="text-2xl font-bold text-neutral-900">Size Guide</h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            <p className="mb-6 text-sm text-neutral-600">
              All measurements are in inches. For the best fit, measure yourself and compare with our size chart.
            </p>

            {/* Size Chart Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900 bg-neutral-50">
                      Size
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-left py-3 px-4 font-semibold text-neutral-900 bg-neutral-50 capitalize"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-neutral-200 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                      } hover:bg-neutral-100 transition-colors duration-200`}
                    >
                      <td className="py-3 px-4 font-semibold text-neutral-900">
                        {row.size}
                      </td>
                      {columns.map((col) => (
                        <td key={col} className="py-3 px-4 text-neutral-700">
                          {row[col as keyof SizeChart] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tip */}
            <div className="mt-6 bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm font-semibold text-blue-900 mb-1">💡 Tip:</p>
              <p className="text-sm text-blue-800">
                If you're between sizes, we recommend sizing up for a comfortable fit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}
