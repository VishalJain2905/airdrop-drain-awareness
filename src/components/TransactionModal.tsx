import { useState, useEffect } from 'react';
import Modal from './Modal';

interface TransactionStep {
  message: string;
  status: 'pending' | 'success' | 'error';
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  title: string;
  steps: string[];
  network: 'ethereum' | 'solana';
}

export default function TransactionModal({
  isOpen,
  onClose,
  onComplete,
  title,
  steps,
  network
}: TransactionModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>([]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setTransactionSteps(steps.map(step => ({
        message: step,
        status: 'pending'
      })));

      // Simulate transaction steps
      steps.forEach((_, index) => {
        setTimeout(() => {
          setTransactionSteps(prev => {
            const newSteps = [...prev];
            if (index > 0) {
              newSteps[index - 1].status = 'success';
            }
            return newSteps;
          });
          setCurrentStepIndex(index);

          if (index === steps.length - 1) {
            setTimeout(() => {
              setTransactionSteps(prev => {
                const newSteps = [...prev];
                newSteps[index].status = 'success';
                return newSteps;
              });
              onComplete();
            }, 1000);
          }
        }, index * 1500);
      });
    }
  }, [isOpen, steps, onComplete]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-secondary border-t-accent" />
        );
      case 'success':
        return (
          <div className="text-success">✓</div>
        );
      case 'error':
        return (
          <div className="text-danger">×</div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary">
          {title}
        </h3>

        <div className={`p-4 rounded-lg border ${
          network === 'ethereum' ? 'border-accent/20' : 'border-highlight/20'
        }`}>
          <div className="space-y-3">
            {transactionSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded ${
                  currentStepIndex === index ? 'bg-background/40' : ''
                }`}
              >
                <span className="text-secondary">{step.message}</span>
                <span>{getStatusIcon(step.status)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-secondary">
          {network === 'ethereum' ? (
            'Ethereum transaction in progress...'
          ) : (
            'Solana transaction in progress...'
          )}
        </div>
      </div>
    </Modal>
  );
}