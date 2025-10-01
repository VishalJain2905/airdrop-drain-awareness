import { useState } from 'react';
import { useDrain } from './DrainContext';

export default function OwnershipTrap() {
  const { connected, approvedOwnership, setApprovedOwnership } = useDrain();
  const [showExplanation, setShowExplanation] = useState(false);

  if (!connected) return null;

  return (
    <div className="p-4 bg-zinc-800 rounded space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-orange-400">TransferOwnership Transaction</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-gray-400 hover:text-white"
          >
            ℹ️
          </button>
          {!approvedOwnership && (
            <button
              onClick={() => setApprovedOwnership(true)}
              className="bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded transition-colors"
            >
              Approve Transfer
            </button>
          )}
          {approvedOwnership && (
            <span className="text-red-400">Ownership transferred! ⚠️</span>
          )}
        </div>
      </div>
      {showExplanation && (
        <div className="text-sm text-gray-400 mt-2 p-2 bg-black/30 rounded">
          Some scams trick users into transferring ownership of their smart
          contracts or NFT collections to the attacker.
        </div>
      )}
    </div>
  );
}