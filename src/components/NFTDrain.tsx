import { useState, useEffect } from 'react';
import { useDrain } from './DrainContext';
import { DrainSimulator } from '../services/DrainSimulator';
import Modal from './Modal';
import OpenModalButton from './OpenModalButton';

export default function NFTDrain() {
  const { connected, ethAddress } = useDrain();
  const [mostValuableNFT, setMostValuableNFT] = useState<any>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isDrained, setIsDrained] = useState(false);
  const [isCheckingNFTs, setIsCheckingNFTs] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isDrainModalOpen, setIsDrainModalOpen] = useState(false);

  useEffect(() => {
    if (connected && !mostValuableNFT) {
      simulateNFTCheck();
    }
  }, [connected]);

  const simulateNFTCheck = async () => {
    setIsCheckingNFTs(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const nft = DrainSimulator.getMostValuableNFT();
    setMostValuableNFT(nft);
    setIsCheckingNFTs(false);
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
      {/* NFT Check Status */}
      {isCheckingNFTs && (
        <div className="bg-background/40 border border-secondary/10 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent border-t-transparent"></div>
            <span className="text-secondary">Checking NFT collections...</span>
          </div>
        </div>
      )}

      {/* Most Valuable NFT Display */}
      {mostValuableNFT && !isDrained && (
        <div className="bg-background/40 border border-secondary/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">
            High-Value NFT Detected
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-secondary/10 rounded-lg flex items-center justify-center">
                🖼️
              </div>
              <div>
                <div className="text-accent font-medium">{mostValuableNFT.name}</div>
                <div className="text-sm text-secondary">{mostValuableNFT.tokenId}</div>
                <div className="text-success mt-1">
                  Floor: {mostValuableNFT.floorPrice} ETH
                </div>
              </div>
            </div>

            {!isApproved && (
              <OpenModalButton onClick={() => setIsApprovalModalOpen(true)}>
                Approve Collection
              </OpenModalButton>
            )}

            {isApproved && !isDrained && (
              <OpenModalButton onClick={() => setIsDrainModalOpen(true)}>
                Drain NFT
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
            <span className="text-danger">NFT has been drained!</span>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      <Modal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">
            NFT Collection Approval
          </h3>
          
          <div className="bg-background/40 p-4 rounded-lg border border-secondary/10">
            <div className="space-y-2">
              <div className="text-sm text-secondary">Collection Address</div>
              <div className="font-mono text-xs text-accent break-all">
                {mostValuableNFT?.address}
              </div>
            </div>
          </div>

          <div className="bg-background/40 p-4 rounded-lg border border-secondary/10">
            <div className="space-y-2">
              <div className="text-sm text-secondary">Approval Details</div>
              <div className="font-mono text-xs space-y-1">
                <div>Method: <span className="text-danger">setApprovalForAll</span></div>
                <div>Collection: <span className="text-accent">{mostValuableNFT?.name}</span></div>
                <div>Operator: <span className="text-accent">{ethAddress}</span></div>
                <div>Approved: <span className="text-danger">All NFTs</span></div>
              </div>
            </div>
          </div>

          <div className="bg-danger/5 p-4 rounded-lg border border-danger/20">
            <div className="text-sm text-danger">
              ⚠️ Warning: This approval grants access to ALL NFTs in the collection
            </div>
          </div>

          <button
            onClick={handleApprove}
            className="w-full bg-accent hover:bg-accent/90 text-background py-2 rounded-lg transition-colors"
          >
            Confirm Collection Approval
          </button>
        </div>
      </Modal>

      {/* Drain Modal */}
      <Modal isOpen={isDrainModalOpen} onClose={() => setIsDrainModalOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-danger">
            ⚠️ Simulating NFT Drain
          </h3>
          
          <div className="bg-danger/5 p-4 rounded-lg border border-danger/20">
            <div className="space-y-2">
              <div className="text-sm text-danger">Transaction Details</div>
              <div className="font-mono text-xs space-y-1 text-secondary">
                <div>Method: <span className="text-danger">transferFrom()</span></div>
                <div>NFT: <span className="text-danger">{mostValuableNFT?.name} #{mostValuableNFT?.tokenId}</span></div>
                <div>Value: <span className="text-danger">{mostValuableNFT?.floorPrice} ETH</span></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDrain}
            className="w-full bg-danger hover:bg-danger/90 text-background py-2 rounded-lg transition-colors"
          >
            Execute NFT Drain
          </button>
        </div>
      </Modal>
    </div>
  );
}