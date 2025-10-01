import { useTour } from './TourContext';

export default function TourNavigation() {
  const { currentStep, steps, nextStep, prevStep, isFirstStep, isLastStep } = useTour();
  const step = steps[currentStep];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-secondary/10 p-4 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-primary">{step.title}</h3>
            <p className="text-secondary">{step.description}</p>
          </div>
          <div className="flex gap-4 ml-4">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isFirstStep
                  ? 'bg-secondary/10 text-secondary cursor-not-allowed'
                  : 'bg-accent/10 text-accent hover:bg-accent/20'
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={isLastStep}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isLastStep
                  ? 'bg-secondary/10 text-secondary cursor-not-allowed'
                  : 'bg-accent text-background hover:bg-accent/90'
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded ${
                index === currentStep ? 'bg-accent' : 'bg-secondary/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}