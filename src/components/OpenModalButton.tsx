import React from 'react';

interface OpenModalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function OpenModalButton({ onClick, children, disabled = false }: OpenModalButtonProps) {
  return (
    <button
      type="button"
      data-tag="open-modal"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 py-2 border border-secondary/10 rounded-lg bg-background text-primary transition-colors ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-secondary/10 focus:outline-none'
      }`}
    >
      {children}
    </button>
  );
}