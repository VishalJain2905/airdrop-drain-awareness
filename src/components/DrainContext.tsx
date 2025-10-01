import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';

interface DrainContextType {
  connected: boolean;
  ethAddress: string;
  solAddress: string;
  approvedERC20: boolean;
  approvedNFT: boolean;
  signedMessage: boolean;
  approvedOwnership: boolean;
  approvedSPL: boolean;
  approvedSOL: boolean;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  setApprovedERC20: (value: boolean) => void;
  setApprovedNFT: (value: boolean) => void;
  setSignedMessage: (value: boolean) => void;
  setApprovedOwnership: (value: boolean) => void;
  setApprovedSPL: (value: boolean) => void;
  setApprovedSOL: (value: boolean) => void;
}

const DrainContext = createContext<DrainContextType | undefined>(undefined);

export function DrainProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [ethAddress, setEthAddress] = useState('');
  const [solAddress, setSolAddress] = useState('');
  const [approvedERC20, setApprovedERC20] = useState(false);
  const [approvedNFT, setApprovedNFT] = useState(false);
  const [signedMessage, setSignedMessage] = useState(false);
  const [approvedOwnership, setApprovedOwnership] = useState(false);
  const [approvedSPL, setApprovedSPL] = useState(false);
  const [approvedSOL, setApprovedSOL] = useState(false);

  const disconnect = () => {
    setConnected(false);
    setEthAddress('');
    setSolAddress('');
    setApprovedERC20(false);
    setApprovedNFT(false);
    setSignedMessage(false);
    setApprovedOwnership(false);
    setApprovedSPL(false);
    setApprovedSOL(false);
  };

  const connect = async () => {
    try {
      // Reset state first
      disconnect();

      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate demo addresses
      const ethWallet = ethers.Wallet.createRandom();
      const solWallet = Keypair.generate();
      
      // Set new state
      setEthAddress(ethWallet.address);
      setSolAddress(solWallet.publicKey.toBase58());
      setConnected(true);

      return true;
    } catch (error) {
      console.error("Connection error:", error);
      throw error; // Re-throw to handle in component
    }
  };

  return (
    <DrainContext.Provider
      value={{
        connected,
        ethAddress,
        solAddress,
        approvedERC20,
        approvedNFT,
        signedMessage,
        approvedOwnership,
        approvedSPL,
        approvedSOL,
        connect,
        disconnect,
        setApprovedERC20,
        setApprovedNFT,
        setSignedMessage,
        setApprovedOwnership,
        setApprovedSPL,
        setApprovedSOL,
      }}
    >
      {children}
    </DrainContext.Provider>
  );
}

export function useDrain() {
  const context = useContext(DrainContext);
  if (context === undefined) {
    throw new Error('useDrain must be used within a DrainProvider');
  }
  return context;
}