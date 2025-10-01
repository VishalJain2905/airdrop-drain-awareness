import { Link } from 'react-router-dom';

const attacks = [
  {
    network: 'ethereum',
    title: 'ERC20 Token Drain',
    slug: 'erc20-drain',
    description: 'Learn how attackers can drain ERC20 tokens through malicious approvals',
    icon: '🪙',
    color: 'accent',
  },
  {
    network: 'ethereum',
    title: 'NFT Collection Drain',
    slug: 'nft-drain',
    description: 'Understand how setApprovalForAll can be exploited',
    icon: '🖼️',
    color: 'accent',
  },
  {
    network: 'ethereum',
    title: 'Signature Phishing',
    slug: 'signature-phishing',
    description: 'See how seemingly harmless signatures can be dangerous',
    icon: '✍️',
    color: 'accent',
  },
  {
    network: 'solana',
    title: 'SPL Token Drain',
    slug: 'spl-drain',
    description: 'Discover how Solana tokens can be drained instantly',
    icon: '💫',
    color: 'highlight',
  },
  {
    network: 'solana',
    title: 'Native SOL Drain',
    slug: 'sol-drain',
    description: 'Learn about direct SOL transfer attacks',
    icon: '⚡',
    color: 'highlight',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          Learn About Wallet Drain Attacks
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Interactive demonstrations of common cryptocurrency wallet drain attacks.
          Understand how they work and learn to protect yourself.
        </p>
      </div>

      {/* Attack Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attacks.map((attack) => (
          <Link
            key={`${attack.network}-${attack.title}`}
            to={`/attack/${attack.network}/${attack.slug}`}
            className="group"
          >
            <div className="h-full bg-background/40 border border-secondary/10 rounded-lg p-6 backdrop-blur-sm
                          transition-all duration-300 hover:border-accent/50 hover:bg-background/60">
              <div className="text-4xl mb-4">{attack.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {attack.title}
              </h3>
              <p className="text-secondary">{attack.description}</p>
              <div className="mt-4 flex items-center text-sm">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    attack.network === 'ethereum'
                      ? 'bg-accent'
                      : 'bg-highlight'
                  }`}
                />
                <span className="text-secondary capitalize">{attack.network}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Prevention Guide CTA */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-success mb-4">
          Protect Your Assets
        </h2>
        <p className="text-secondary mb-6 max-w-2xl mx-auto">
          Learn best practices for wallet security and how to prevent falling victim
          to these attacks.
        </p>
        <Link
          to="/prevention"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-success text-background
                     hover:bg-success/90 transition-colors"
        >
          View Prevention Guide
        </Link>
      </div>
    </div>
  );
}