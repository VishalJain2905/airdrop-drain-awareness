
import { Link } from 'react-router-dom';

const ethereumAttacks = [
  {
    id: 'erc20-drain',
    title: 'ERC20 Token Drain',
    description: 'Malicious contracts that request unlimited token approvals',
    risk: 'high',
    icon: '🪙'
  },
  {
    id: 'nft-drain',
    title: 'NFT Collection Drain',
    description: 'setApprovalForAll exploits that can steal entire NFT collections',
    risk: 'high',
    icon: '🖼️'
  },
  {
    id: 'signature-phishing',
    title: 'Signature Phishing',
    description: 'Malicious signature requests that can be used to steal assets',
    risk: 'medium',
    icon: '✍️'
  },
  {
    id: 'ownership-trap',
    title: 'Ownership Transfer Trap',
    description: 'Hidden ownership transfer functions in malicious contracts',
    risk: 'high',
    icon: '👑'
  }
];

export default function EthereumAttacks() {
  return (
    <div className="space-y-8">
      <div className="border-b border-secondary/10 pb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Ethereum Attack Vectors</h1>
        <p className="text-secondary text-lg">
          Learn about common Ethereum wallet drain techniques and how to protect yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ethereumAttacks.map((attack) => (
          <Link
            key={attack.id}
            to={`/attack/ethereum/${attack.id}`}
            className="group"
          >
            <div className="h-full bg-background/40 border border-secondary/10 rounded-lg p-6 backdrop-blur-sm
                          transition-all duration-300 hover:border-accent/50 hover:bg-background/60">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{attack.icon}</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  attack.risk === 'high' 
                    ? 'bg-danger/10 text-danger' 
                    : 'bg-accent/10 text-accent'
                }`}>
                  {attack.risk.toUpperCase()} RISK
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-primary mb-2">
                {attack.title}
              </h3>
              <p className="text-secondary">{attack.description}</p>
              
              <div className="mt-4 flex items-center text-accent text-sm">
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
          ⚠️ Important Security Tips
        </h2>
        <ul className="list-disc list-inside space-y-2 text-secondary">
          <li>Always verify contract addresses on Etherscan</li>
          <li>Never approve unlimited token spending</li>
          <li>Use hardware wallets for large holdings</li>
          <li>Regularly check and revoke unnecessary approvals</li>
        </ul>
      </div>
    </div>
  );
}