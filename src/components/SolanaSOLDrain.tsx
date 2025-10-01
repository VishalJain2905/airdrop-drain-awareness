import { useState } from 'react';
import { useDrain } from './DrainContext';

export default function SolanaSOLDrain() {
  const { connected, approvedSOL, setApprovedSOL } = useDrain();
  const [showExplanation, setShowExplanation] = useState(false);

  if (!connected) return null;

  return (
    <div className="p-4 bg-zinc-800 rounded space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-red-400">Request to Send Full SOL Balance 💸</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-gray-400 hover:text-white"
          >
            ℹ️
          </button>
          {!approvedSOL && (
            <button
              onClick={() => setApprovedSOL(true)}
              className="bg-red-700 hover:bg-red-800 px-2 py-1 rounded transition-colors"
            >
              Send All
            </button>
          )}
          {approvedSOL && (
            <span className="text-red-400">SOL balance drained! ⚠️</span>
          )}
        </div>
      </div>
      {showExplanation && (
        <div className="text-sm text-gray-400 mt-2 p-2 bg-black/30 rounded">
          Malicious dApps can request to transfer your entire SOL balance in a
          single transaction. Always verify transaction details!
        </div>
      )}
    </div>
  );
}