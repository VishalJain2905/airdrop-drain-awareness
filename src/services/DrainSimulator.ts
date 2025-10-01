import { mockTokens, mockNFTs } from '../components/mockData';

export interface Token {
  address: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  decimals: number;
}

export interface NFT {
  address: string;
  name: string;
  symbol: string;
  tokenId: string;
  floorPrice: number;
  image: string;
}

export class DrainSimulator {
  // ERC20 Token Drain
  static getMostValuableToken(): Token | null {
    return mockTokens
      .map(token => ({
        ...token,
        address: `0x${Math.random().toString(16).slice(2, 42)}`,
        decimals: 18,
        totalValue: token.balance * token.price
      }))
      .sort((a, b) => b.totalValue - a.totalValue)[0] || null;
  }

  // NFT Collection Drain
  static getMostValuableNFT(): NFT | null {
    return mockNFTs
      .map(nft => ({
        ...nft,
        address: `0x${Math.random().toString(16).slice(2, 42)}`,
        totalValue: nft.floorPrice
      }))
      .sort((a, b) => b.totalValue - a.totalValue)[0] || null;
  }

  // Signature Phishing
  static generatePhishingSignature(): string {
    return `0x${Array(130).fill(0).map(() => Math.random().toString(16)[2]).join('')}`;
  }

  // Contract Ownership Transfer
  static generateOwnershipTransfer(contractAddress: string): {
    from: string;
    to: string;
    contract: string;
  } {
    return {
      from: `0x${Math.random().toString(16).slice(2, 42)}`,
      to: `0x${Math.random().toString(16).slice(2, 42)}`,
      contract: contractAddress
    };
  }

  // SPL Token Drain
  static generateSPLDrain(tokenAddress: string): {
    token: string;
    amount: number;
    isBlocked: boolean;
  } {
    return {
      token: tokenAddress,
      amount: Math.floor(Math.random() * 1000000),
      isBlocked: Math.random() > 0.5 // Simulate Blowfish blocking
    };
  }

  // SOL Balance Drain
  static generateSOLDrain(balance: number): {
    amount: number;
    recipient: string;
  } {
    return {
      amount: balance,
      recipient: `${Math.random().toString(36).substring(2, 15)}.sol`
    };
  }
}