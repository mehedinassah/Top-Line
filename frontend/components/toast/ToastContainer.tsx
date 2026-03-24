"use client";

import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useToast, type ToastType } from "./ToastContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case "warning":
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-600" />;
      case "info":
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "text-green-900";
      case "error":
        return "text-red-900";
      case "warning":
        return "text-yellow-900";
      case "info":
      default:
        return "text-blue-900";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 400 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 400 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`pointer-events-auto flex items-start gap-3 border p-4 shadow-lg ${getBackgroundColor(toast.type)}`}
          >
            <div className="mt-0.5 flex-shrink-0">{getIcon(toast.type)}</div>
            <p className={`flex-1 text-sm font-medium ${getTextColor(toast.type)}`}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className={`flex-shrink-0 text-sm font-medium hover:opacity-70 transition ${getTextColor(toast.type)}`}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

