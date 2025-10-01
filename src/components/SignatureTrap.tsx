import { useState } from 'react';
import { useDrain } from './DrainContext';

export default function SignatureTrap() {
  const { connected, signedMessage, setSignedMessage } = useDrain();
  const [showExplanation, setShowExplanation] = useState(false);

  if (!connected) return null;

  return (
    <div className="p-4 bg-zinc-800 rounded space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-yellow-400">Malicious Signature Request</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-gray-400 hover:text-white"
          >
            ℹ️
          </button>
          {!signedMessage && (
            <button
              onClick={() => setSignedMessage(true)}
              className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded transition-colors"
            >
              Sign Message
            </button>
          )}
          {signedMessage && (
            <span className="text-red-400">Signed malicious message! ⚠️</span>
          )}
        </div>
      </div>
      {showExplanation && (
        <div className="text-sm text-gray-400 mt-2 p-2 bg-black/30 rounded">
          Some attacks trick users into signing messages that look harmless but
          actually authorize token transfers or other malicious actions.
        </div>
      )}
    </div>
  );
}