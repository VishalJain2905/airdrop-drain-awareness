
import { Link } from 'react-router-dom';

const solanaAttacks = [
  {
    id: 'spl-drain',
    title: 'SPL Token Drain',
    description: 'Direct token transfer attacks through malicious transactions',
    risk: 'high',
    icon: '💫'
  },
  {
    id: 'sol-drain',
    title: 'Native SOL Drain',
    description: 'Hidden SOL transfers in complex transactions',
    risk: 'high',
    icon: '⚡'
  },
  {
    id: 'program-drain',
    title: 'Program Interaction',
    description: 'Malicious program calls that can drain assets',
    risk: 'high',
    icon: '🔧'
  },
  {
    id: 'nft-drain',
    title: 'NFT Collection Drain',
    description: 'Single-click NFT transfer attacks',
    risk: 'high',
    icon: '🖼️'
  }
];

export default function SolanaAttacks() {
  return (
    <div className="space-y-8">
      <div className="border-b border-secondary/10 pb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Solana Attack Vectors</h1>
        <p className="text-secondary text-lg">
          Understand how Solana wallet drains work and learn to identify suspicious transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solanaAttacks.map((attack) => (
          <Link
            key={attack.id}
            to={`/attack/solana/${attack.id}`}
            className="group"
          >
            <div className="h-full bg-background/40 border border-secondary/10 rounded-lg p-6 backdrop-blur-sm
                          transition-all duration-300 hover:border-highlight/50 hover:bg-background/60">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{attack.icon}</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  attack.risk === 'high' 
                    ? 'bg-danger/10 text-danger' 
                    : 'bg-highlight/10 text-highlight'
                }`}>
                  {attack.risk.toUpperCase()} RISK
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-primary mb-2">
                {attack.title}
              </h3>
              <p className="text-secondary">{attack.description}</p>
              
              <div className="mt-4 flex items-center text-highlight text-sm">
                Learn more
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-highlight/5 border border-highlight/20 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-highlight mb-4">
          ⚠️ Solana Security Best Practices
        </h2>
        <ul className="list-disc list-inside space-y-2 text-secondary">
          <li>Always expand and verify transaction details</li>
          <li>Check program IDs against known contracts</li>
          <li>Use a hardware wallet for large holdings</li>
          <li>Be cautious of websites requesting wallet connections</li>
        </ul>
      </div>
    </div>
  );
}