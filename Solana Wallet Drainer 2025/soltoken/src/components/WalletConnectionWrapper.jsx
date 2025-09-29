import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletIcon } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui/button';

const WalletConnectionWrapper = ({ children }) => {
  const { connected, disconnect, select, wallets } = useWallet();

  return (
    <div className="space-y-4">
      {!connected ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {wallets.map((wallet) => (
              <Button
                key={wallet.adapter.name}
                onClick={() => select(wallet.adapter.name)}
                className="flex items-center justify-center space-x-2 p-4 bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <img 
                  src={wallet.adapter.icon} 
                  alt={wallet.adapter.name}
                  className="w-8 h-8"
                />
                <span>{wallet.adapter.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={disconnect}
            className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400"
          >
            <WalletIcon className="w-5 h-5" />
            <span>Disconnect Wallet</span>
          </Button>
          {children}
        </div>
      )}
    </div>
  );
};

export default WalletConnectionWrapper; 