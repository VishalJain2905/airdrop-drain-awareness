import { useState } from 'react';
import { useDrain } from './DrainContext';

export default function SolanaSPLDrain() {
  const { connected, approvedSPL, setApprovedSPL } = useDrain();
  const [showExplanation, setShowExplanation] = useState(false);

  if (!connected) return null;

  return (
    <div className="p-4 bg-zinc-800 rounded space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-purple-400">SPL Token Transfer Detected ⚠️</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-gray-400 hover:text-white"
          >
            ℹ️
          </button>
          {!approvedSPL && (
            <button
              onClick={() => setApprovedSPL(true)}
              className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded transition-colors"
            >
              Attempt Transfer
            </button>
          )}
          {approvedSPL && (
            <span className="text-red-400">SPL tokens drained! ⚠️</span>
          )}
        </div>
      </div>
      {showExplanation && (
        <div className="text-sm text-gray-400 mt-2 p-2 bg-black/30 rounded">
          On Solana, approving a malicious transaction can instantly transfer all
          your SPL tokens to the attacker.
        </div>
      )}
    </div>
  );
}