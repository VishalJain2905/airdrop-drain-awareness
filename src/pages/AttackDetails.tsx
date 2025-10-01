import { type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import ERC20Drain from '../components/ERC20Drain';
import NFTDrain from '../components/NFTDrain';
import SignatureTrap from '../components/SignatureTrap';
import OwnershipTrap from '../components/OwnershipTrap';
import SolanaSPLDrain from '../components/SolanaSPLDrain';
import SolanaSOLDrain from '../components/SolanaSOLDrain';

type AttackComponent = {
  component: () => ReactNode;
  title: string;
  description: string;
};

type NetworkAttacks = {
  [key: string]: {
    [key: string]: AttackComponent;
  };
};

const attackComponents: NetworkAttacks = {
  ethereum: {
    'erc20-drain': {
      component: ERC20Drain,
      title: 'ERC20 Token Drain Attack',
      description: 'Learn how malicious contracts can drain your ERC20 tokens through approvals.',
    },
    'nft-drain': {
      component: NFTDrain,
      title: 'NFT Collection Drain Attack',
      description: 'Understand how setApprovalForAll can be exploited to steal NFTs.',
    },
    'signature-phishing': {
      component: SignatureTrap,
      title: 'Signature Phishing Attack',
      description: 'See how malicious signatures can be used to steal assets.',
    },
    'ownership-trap': {
      component: OwnershipTrap,
      title: 'Ownership Transfer Attack',
      description: 'Learn about hidden ownership transfer functions in contracts.',
    },
  },
  solana: {
    'spl-drain': {
      component: SolanaSPLDrain,
      title: 'SPL Token Drain Attack',
      description: 'Understand how Solana tokens can be drained through transactions.',
    },
    'sol-drain': {
      component: SolanaSOLDrain,
      title: 'Native SOL Drain Attack',
      description: 'Learn about direct SOL transfer attacks.',
    },
  },
};

export default function AttackDetails() {
  const { network, type } = useParams();
  
  if (!network || !type || !attackComponents[network]?.[type]) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Attack Not Found</h2>
        <p className="text-secondary mb-8">
          The attack demonstration you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="text-accent hover:text-accent/80 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const attack = attackComponents[network][type];
  const AttackComponent = attack.component;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-secondary/10 pb-8">
        <div className="flex items-center gap-2 text-secondary mb-4">
          <Link
            to={`/${network}`}
            className="hover:text-primary transition-colors"
          >
            {network.charAt(0).toUpperCase() + network.slice(1)}
          </Link>
          <span>/</span>
          <span>{type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">{attack.title}</h1>
        <p className="text-secondary text-lg">{attack.description}</p>
      </div>

      {/* Interactive Demo */}
      <div className="bg-background/40 border border-secondary/10 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-primary mb-6">Interactive Demo</h2>
        <AttackComponent />
      </div>

      {/* Prevention Tips */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-success mb-4">
          How to Protect Yourself
        </h2>
        <Link
          to="/prevention"
          className="text-success hover:text-success/80 transition-colors"
        >
          View Full Prevention Guide →
        </Link>
      </div>
    </div>
  );
}