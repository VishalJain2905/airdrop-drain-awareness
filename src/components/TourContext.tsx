import { createContext, useContext, useState, ReactNode } from 'react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  component: string;
  network: 'ethereum' | 'solana';
}

const tourSteps: TourStep[] = [
  {
    id: 'connect',
    title: 'Connect Your Wallet',
    description: 'First, users are prompted to connect their wallet to what appears to be a legitimate website. This could be a fake NFT mint, token claim, or staking site.',
    component: 'ConnectWallet',
    network: 'ethereum'
  },
  {
    id: 'erc20',
    title: 'ERC20 Token Drain',
    description: 'Scammers often target ERC20 tokens using approve() or increaseAllowance() functions. Once approved, they can transfer all your tokens.',
    component: 'ERC20Drain',
    network: 'ethereum'
  },
  {
    id: 'nft',
    title: 'NFT Collection Drain',
    description: 'The setApprovalForAll function is commonly used to drain entire NFT collections. One signature can give access to all NFTs in a collection.',
    component: 'NFTDrain',
    network: 'ethereum'
  },
  {
    id: 'signature',
    title: 'Signature Phishing',
    description: 'Some attacks ask for signatures that look harmless but can be used maliciously. Always verify what you\'re signing.',
    component: 'SignatureTrap',
    network: 'ethereum'
  },
  {
    id: 'ownership',
    title: 'Ownership Transfer Scam',
    description: 'Be cautious of transactions that transfer ownership or grant extensive permissions to your assets.',
    component: 'OwnershipTrap',
    network: 'ethereum'
  },
  {
    id: 'solana-spl',
    title: 'Solana SPL Token Drain',
    description: 'On Solana, token transfers are direct. One approved transaction can instantly transfer your SPL tokens.',
    component: 'SolanaSPLDrain',
    network: 'solana'
  },
  {
    id: 'solana-sol',
    title: 'Solana Native SOL Drain',
    description: 'Similar to SPL tokens, native SOL can be drained with a single transaction approval. Always verify transaction details.',
    component: 'SolanaSOLDrain',
    network: 'solana'
  }
];

interface TourContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: TourStep[];
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <TourContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        steps: tourSteps,
        nextStep,
        prevStep,
        isLastStep: currentStep === tourSteps.length - 1,
        isFirstStep: currentStep === 0,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}