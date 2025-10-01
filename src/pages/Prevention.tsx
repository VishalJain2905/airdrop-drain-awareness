

const preventionTips = [
  {
    category: 'Wallet Security',
    icon: '🔒',
    tips: [
      'Use a hardware wallet for large holdings',
      'Create separate wallets for different purposes',
      'Never share your private keys or seed phrase',
      'Enable additional security features (2FA, etc.)'
    ]
  },
  {
    category: 'Transaction Safety',
    icon: '✅',
    tips: [
      'Always verify transaction details thoroughly',
      'Check contract addresses on block explorers',
      'Be wary of unlimited token approvals',
      'Use transaction simulation tools when available'
    ]
  },
  {
    category: 'Website Safety',
    icon: '🌐',
    tips: [
      'Verify website URLs carefully',
      'Don\'t trust direct message links',
      'Be skeptical of airdrops and free mints',
      'Check official social media for announcements'
    ]
  },
  {
    category: 'Regular Maintenance',
    icon: '🔄',
    tips: [
      'Regularly review and revoke token approvals',
      'Monitor wallet activity with blockchain explorers',
      'Keep software and wallets updated',
      'Remove unused dApp connections'
    ]
  }
];

const tools = [
  {
    name: 'Revoke.cash',
    url: 'https://revoke.cash',
    description: 'Review and revoke token approvals on Ethereum and other EVM chains',
    network: 'ethereum'
  },
  {
    name: 'Etherscan Token Approval',
    url: 'https://etherscan.io/tokenapprovalchecker',
    description: 'Check and revoke token approvals directly on Etherscan',
    network: 'ethereum'
  },
  {
    name: 'Step Finance',
    url: 'https://step.finance',
    description: 'Monitor your Solana wallet and token approvals',
    network: 'solana'
  },
  {
    name: 'Solana Explorer',
    url: 'https://explorer.solana.com',
    description: 'Verify program calls and transaction details',
    network: 'solana'
  }
];

export default function Prevention() {
  return (
    <div className="space-y-12">
      <div className="border-b border-secondary/10 pb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Prevention Guide
        </h1>
        <p className="text-secondary text-lg">
          Comprehensive guide to protect yourself from wallet drain attacks.
        </p>
      </div>

      {/* Prevention Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {preventionTips.map((section) => (
          <div
            key={section.category}
            className="bg-background/40 border border-secondary/10 rounded-lg p-6 backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{section.icon}</span>
              <h2 className="text-xl font-semibold text-primary">
                {section.category}
              </h2>
            </div>
            <ul className="space-y-3">
              {section.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="text-secondary">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Security Tools */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">
          Recommended Security Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="h-full bg-background/40 border border-secondary/10 rounded-lg p-6 backdrop-blur-sm
                            transition-all duration-300 hover:border-accent/50 hover:bg-background/60">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-primary">
                    {tool.name}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    tool.network === 'ethereum'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-highlight/10 text-highlight'
                  }`}>
                    {tool.network.toUpperCase()}
                  </span>
                </div>
                <p className="text-secondary">{tool.description}</p>
                <div className="mt-2 text-accent text-sm group-hover:underline">
                  Visit website →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="bg-danger/5 border border-danger/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-danger mb-4">
          🚨 Emergency Actions
        </h2>
        <div className="space-y-4 text-secondary">
          <p>If you suspect your wallet has been compromised:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Transfer remaining assets to a secure wallet immediately</li>
            <li>Revoke all existing token approvals</li>
            <li>Document everything for potential recovery</li>
            <li>Report the incident to relevant platforms</li>
          </ol>
        </div>
      </div>
    </div>
  );
}