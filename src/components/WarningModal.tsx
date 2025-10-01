
import Modal from './Modal';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function WarningModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  type = 'warning'
}: WarningModalProps) {
  const getColorsByType = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-danger/5',
          border: 'border-danger/20',
          text: 'text-danger',
          button: 'bg-danger hover:bg-danger/90'
        };
      case 'warning':
        return {
          bg: 'bg-highlight/5',
          border: 'border-highlight/20',
          text: 'text-highlight',
          button: 'bg-highlight hover:bg-highlight/90'
        };
      case 'info':
        return {
          bg: 'bg-accent/5',
          border: 'border-accent/20',
          text: 'text-accent',
          button: 'bg-accent hover:bg-accent/90'
        };
    }
  };

  const colors = getColorsByType();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h3 className={`text-xl font-bold ${colors.text}`}>
          {type === 'danger' ? '⚠️ ' : ''}{title}
        </h3>
        
        <div className={`${colors.bg} p-4 rounded-lg border ${colors.border}`}>
          <div className="text-secondary whitespace-pre-line">
            {message}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-secondary/10 rounded-lg text-secondary hover:bg-secondary/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg text-background transition-colors ${colors.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}