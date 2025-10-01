import { useState, useEffect } from 'react';
import { useDrain } from './DrainContext';
import { DrainSimulator } from '../services/DrainSimulator';
import Modal from './Modal';
import OpenModalButton from './OpenModalButton';

export default function ERC20Drain() {
  const { connected, ethAddress } = useDrain();
  const [mostValuableToken, setMostValuableToken] = useState<any>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isDrained, setIsDrained] = useState(false);
  const [isCheckingBalances, setIsCheckingBalances] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isDrainModalOpen, setIsDrainModalOpen] = useState(false);

  useEffect(() => {
    if (connected && !mostValuableToken) {
      simulateBalanceCheck();
    }
  }, [connected]);

  const simulateBalanceCheck = async () => {
    setIsCheckingBalances(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const token = DrainSimulator.getMostValuableToken();
    setMostValuableToken(token);
    setIsCheckingBalances(false);
  };

  const handleApprove = async () => {
    setIsApprovalModalOpen(false);
    // Simulate approval transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsApproved(true);
  };

  const handleDrain = async () => {
    setIsDrainModalOpen(false);
    // Simulate drain transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDrained(true);
  };

  if (!connected) return null;

  return (
    <div className="space-y-6">
      {/* Balance Check Status */}
      {isCheckingBalances && (
        <div className="bg-background/40 border border-secondary/10 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent border-t-transparent"></div>
            <span className="text-secondary">Checking token balances...</span>
          </div>
        </div>
      )}

      {/* Most Valuable Token Display */}
      {mostValuableToken && !isDrained && (
        <div className="bg-background/40 border border-secondary/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Most Valuable Token Detected
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-accent font-medium">{mostValuableToken.name}</div>
                <div className="text-sm text-secondary">{mostValuableToken.symbol}</div>
              </div>
              <div className="text-right">
                <div className="text-success">{mostValuableToken.balance.toFixed(2)}</div>
                <div className="text-sm text-secondary">
                  ${(mostValuableToken.balance * mostValuableToken.price).toFixed(2)}
                </div>
              </div>
            </div>

            {!isApproved && (
              <OpenModalButton onClick={() => setIsApprovalModalOpen(true)}>
                Approve Token
              </OpenModalButton>
            )}

            {isApproved && !isDrained && (
              <OpenModalButton onClick={() => setIsDrainModalOpen(true)}>
                Drain Token
              </OpenModalButton>
            )}
          </div>
        </div>
      )}

      {/* Drained State */}
      {isDrained && (
        <div className="bg-danger/5 border border-danger/20 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <span className="text-danger">⚠️</span>
            <span className="text-danger">Token has been drained!</span>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      <Modal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">
            Token Approval Request
          </h3>
          
          <div className="bg-background/40 p-4 rounded-lg border border-secondary/10">
            <div className="space-y-2">
              <div className="text-sm text-secondary">Contract Address</div>
              <div className="font-mono text-xs text-accent break-all">
                {mostValuableToken?.address}
              </div>
            </div>
          </div>

          <div className="bg-background/40 p-4 rounded-lg border border-secondary/10">
            <div className="space-y-2">
              <div className="text-sm text-secondary">Approval Details</div>
              <div className="font-mono text-xs space-y-1">
                <div>Token: <span className="text-accent">{mostValuableToken?.symbol}</span></div>
                <div>Amount: <span className="text-danger">Unlimited</span></div>
                <div>Spender: <span className="text-accent">{ethAddress}</span></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleApprove}
            className="w-full bg-accent hover:bg-accent/90 text-background py-2 rounded-lg transition-colors"
          >
            Confirm Approval
          </button>
        </div>
      </Modal>

      {/* Drain Modal */}
      <Modal isOpen={isDrainModalOpen} onClose={() => setIsDrainModalOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-danger">
            ⚠️ Simulating Token Drain
          </h3>
          
          <div className="bg-danger/5 p-4 rounded-lg border border-danger/20">
            <div className="space-y-2">
              <div className="text-sm text-danger">Transaction Details</div>
              <div className="font-mono text-xs space-y-1 text-secondary">
                <div>Method: <span className="text-danger">transferFrom()</span></div>
                <div>Token: <span className="text-danger">{mostValuableToken?.symbol}</span></div>
                <div>Amount: <span className="text-danger">{mostValuableToken?.balance.toFixed(2)}</span></div>
                <div>Value: <span className="text-danger">${(mostValuableToken?.balance * mostValuableToken?.price).toFixed(2)}</span></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDrain}
            className="w-full bg-danger hover:bg-danger/90 text-background py-2 rounded-lg transition-colors"
          >
            Execute Drain
          </button>
        </div>
      </Modal>
    </div>
  );
}