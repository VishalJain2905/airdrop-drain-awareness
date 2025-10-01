import { Outlet, NavLink } from 'react-router-dom';

import ConnectWallet from './ConnectWallet';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-secondary/10 bg-background/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <NavLink to="/" className="flex items-center">
                <span className="text-2xl">💀</span>
                <span className="ml-2 text-primary font-bold">Drain Awareness</span>
              </NavLink>
              
              <div className="ml-10 flex items-center space-x-4">
                <NavLink
                  to="/ethereum"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-secondary hover:text-primary'
                    }`
                  }
                >
                  Ethereum Attacks
                </NavLink>
                <NavLink
                  to="/solana"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-highlight/10 text-highlight'
                        : 'text-secondary hover:text-primary'
                    }`
                  }
                >
                  Solana Attacks
                </NavLink>
                <NavLink
                  to="/prevention"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-success/10 text-success'
                        : 'text-secondary hover:text-primary'
                    }`
                  }
                >
                  Prevention Guide
                </NavLink>
              </div>
            </div>
            
            <div className="flex items-center">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary/10 bg-background/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-secondary text-sm">
            <p>⚠️ This is an educational demonstration. Never share your private keys or approve suspicious transactions.</p>
            <p className="mt-2">
              Built for educational purposes. Learn more about{' '}
              <a
                href="https://revoke.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80"
              >
                revoking approvals
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}