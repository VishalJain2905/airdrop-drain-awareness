interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (params: any) => void) => void;
    removeListener: (event: string, callback: (params: any) => void) => void;
    isMetaMask?: boolean;
  };
  solana?: {
    connect: () => Promise<{ publicKey: string }>;
    disconnect: () => Promise<void>;
    on: (event: string, callback: (params: any) => void) => void;
    removeListener: (event: string, callback: (params: any) => void) => void;
    isPhantom?: boolean;
  };
}