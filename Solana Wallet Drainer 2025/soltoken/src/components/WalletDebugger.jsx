import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletDebugger = () => {
  const { 
    publicKey, 
    wallet, 
    connecting, 
    connected, 
    select, 
    wallets 
  } = useWallet();

  useEffect(() => {
    // Log available wallets
    console.log('Available Wallets:', wallets.map(w => w.name));
    
    // Detailed wallet connection state
    console.log('Wallet Connection State:', {
      publicKey: publicKey ? publicKey.toString() : 'No Public Key',
      connected: connected,
      connecting: connecting,
      selectedWallet: wallet?.adapter.name || 'No Wallet Selected'
    });
  }, [publicKey, wallet, connecting, connected, wallets]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Wallet Connection Diagnostics</h2>
      <WalletMultiButton />
      <div className="mt-4 space-y-2">
        <p>Connected: {connected ? 'Yes' : 'No'}</p>
        <p>Connecting: {connecting ? 'Yes' : 'No'}</p>
        <p>Public Key: {publicKey ? publicKey.toString() : 'Not Connected'}</p>
      </div>
    </div>
  );
};

export default WalletDebugger; 