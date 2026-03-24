import { CheckIcon } from "@heroicons/react/24/solid";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            {/* Step Circle */}
            <div
              className={`flex h-10 w-10 items-center justify-center font-semibold text-sm transition ${
                isCompleted
                  ? "bg-green-600 text-white"
                  : isCurrent
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-200 text-neutral-700"
              }`}
              aria-label={`Step ${stepNumber}: ${step}${isCurrent ? " (current)" : ""}${isCompleted ? " (completed)" : ""}`}
            >
              {isCompleted ? <CheckIcon className="h-5 w-5" /> : stepNumber}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 transition ${
                  isCompleted ? "bg-green-600" : "bg-neutral-200"
                }`}
                aria-hidden
              />
            )}
          </div>
        );
      })}

      {/* Step Labels Below */}
      <div className="mt-3 absolute bottom-0 left-0 right-0 flex justify-between w-full px-4">
        {steps.map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <p className={`text-xs font-medium ${
              currentStep === index + 1 
                ? "text-neutral-900" 
                : currentStep > index + 1
                ? "text-green-600"
                : "text-neutral-500"
            }`}>
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

