"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";

type SizeGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 opacity-100"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          className="bg-white shadow-2xl max-h-[90vh] overflow-y-auto max-w-2xl w-full transform transition-all duration-500 scale-100 opacity-100 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: isOpen ? 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'slideDown 0.3s ease-in'
          }}
        >
          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideDown {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(20px);
              }
            }
          `}</style>

          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Size Chart</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 transition"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Size Chart */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">Size</th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">Chest/Bust</th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">Waist</th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold">Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3 font-medium">XS</td>
                    <td className="border border-neutral-300 px-4 py-3">81-86</td>
                    <td className="border border-neutral-300 px-4 py-3">61-66</td>
                    <td className="border border-neutral-300 px-4 py-3">66</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-4 py-3 font-medium">S</td>
                    <td className="border border-neutral-300 px-4 py-3">86-91</td>
                    <td className="border border-neutral-300 px-4 py-3">66-71</td>
                    <td className="border border-neutral-300 px-4 py-3">68</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3 font-medium">M</td>
                    <td className="border border-neutral-300 px-4 py-3">91-96</td>
                    <td className="border border-neutral-300 px-4 py-3">71-76</td>
                    <td className="border border-neutral-300 px-4 py-3">70</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-4 py-3 font-medium">L</td>
                    <td className="border border-neutral-300 px-4 py-3">96-101</td>
                    <td className="border border-neutral-300 px-4 py-3">76-81</td>
                    <td className="border border-neutral-300 px-4 py-3">72</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3 font-medium">XL</td>
                    <td className="border border-neutral-300 px-4 py-3">101-106</td>
                    <td className="border border-neutral-300 px-4 py-3">81-86</td>
                    <td className="border border-neutral-300 px-4 py-3">74</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-4 py-3 font-medium">XXL</td>
                    <td className="border border-neutral-300 px-4 py-3">106-111</td>
                    <td className="border border-neutral-300 px-4 py-3">86-91</td>
                    <td className="border border-neutral-300 px-4 py-3">76</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-neutral-100 border-t border-neutral-200 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full bg-neutral-900 text-white font-medium py-2.5 hover:bg-neutral-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
