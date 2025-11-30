'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers, BrowserProvider } from 'ethers';
import Link from 'next/link';

// Contract configuration
const CONTRACT_ADDRESS = '0xda0fB5bF9F658F72F6CBA99Cd99057d971110545';
const CONTRACT_ABI = [
  'function submitCapital(bytes32 encryptedCapital, bytes proof) external',
  'function getMyVerificationResult() external view returns (bytes32)',
  'function getMyCapital() external view returns (bytes32)',
  'function hasSubmitted(address) external view returns (bool)',
  'event CapitalSubmitted(address indexed user, uint256 timestamp)',
  'event VerificationCompleted(address indexed user, uint256 timestamp)',
];

// FHEVM v0.9 Configuration
const FHEVM_CONFIG = {
  chainId: 11155111,  // Sepolia
  aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
  kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
  inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
  verifyingContractAddressDecryption: '0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478',
  verifyingContractAddressInputVerification: '0x483b9dE06E4E4C7D35CCf5837A1668487406D955',
  gatewayChainId: 10901,
  relayerUrl: 'https://relayer.testnet.zama.org',
};

export default function VerifyPage() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [fhevmInstance, setFhevmInstance] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  
  const [capitalAmount, setCapitalAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [countdown, setCountdown] = useState(0);
  const [canDecrypt, setCanDecrypt] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [verificationResult, setVerificationResult] = useState<number | null>(null);
  const [decryptError, setDecryptError] = useState<string | null>(null);
  
  const isInitializingRef = useRef(false);

  // Initialize FHEVM
  useEffect(() => {
    if (!isConnected || !address || !walletClient || isInitializingRef.current || fhevmInstance) {
      return;
    }

    const initFhevm = async () => {
      isInitializingRef.current = true;
      setIsInitializing(true);
      setInitError(null);

      try {
        if (!(window as any).relayerSDK) {
          throw new Error('Relayer SDK not loaded. Please refresh the page.');
        }

        // Initialize SDK
        await (window as any).relayerSDK.initSDK();

        // Get provider
        let provider = (window as any).ethereum;
        
        if (!provider && walletClient) {
          provider = walletClient;
        }
        
        if (!provider) {
          throw new Error('No wallet provider found');
        }

        // Create FHEVM instance
        const instance = await (window as any).relayerSDK.createInstance({
          ...FHEVM_CONFIG,
          network: provider,
        });

        setFhevmInstance(instance);
        console.log('✅ FHEVM initialized successfully');
      } catch (e: any) {
        setInitError(e.message || 'Failed to initialize FHEVM');
        console.error('❌ FHEVM init failed:', e);
        isInitializingRef.current = false;
      } finally {
        setIsInitializing(false);
      }
    };

    initFhevm();
  }, [isConnected, address, walletClient, fhevmInstance]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && submitSuccess && !canDecrypt) {
      setCanDecrypt(true);
    }
  }, [countdown, submitSuccess, canDecrypt]);

  // Handle capital submission
  const handleSubmit = async () => {
    if (!fhevmInstance || !walletClient || !capitalAmount) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const amount = parseInt(capitalAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid positive number');
      }

      // Encrypt the capital amount
      console.log('🔐 Encrypting capital amount...');
      const input = fhevmInstance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add32(amount);
      const encryptedInput = await input.encrypt();

      // Get signer
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Submit to blockchain
      console.log('📤 Submitting to blockchain...');
      const tx = await contract.submitCapital(
        encryptedInput.handles[0],
        encryptedInput.inputProof
      );

      console.log('⏳ Waiting for transaction confirmation...');
      await tx.wait();

      console.log('✅ Transaction confirmed!');
      setSubmitSuccess(true);
      
      // Start countdown for permission sync
      setCountdown(10);
      
    } catch (e: any) {
      console.error('❌ Submit failed:', e);
      setSubmitError(e.message || 'Failed to submit capital');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle decryption with retry logic
  const handleDecrypt = async (retryCount = 0) => {
    if (!fhevmInstance || !walletClient) return;

    setIsDecrypting(true);
    setDecryptError(null);

    try {
      // Get signer and contract
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Get encrypted result handle
      console.log('📥 Fetching encrypted result...');
      const encryptedHandle = await contract.getMyVerificationResult();

      if (!encryptedHandle || encryptedHandle === '0x' + '0'.repeat(64)) {
        throw new Error('No verification result found. Please submit capital first.');
      }

      // Generate keypair for decryption
      console.log('🔑 Generating keypair...');
      const keypair = fhevmInstance.generateKeypair();

      // Prepare decryption parameters
      const handleContractPairs = [
        { handle: encryptedHandle, contractAddress: CONTRACT_ADDRESS }
      ];
      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = "10";
      const contractAddresses = [CONTRACT_ADDRESS];

      // Create EIP-712 signature
      console.log('✍️ Creating signature...');
      const eip712 = fhevmInstance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays
      );

      const typesWithoutDomain = { ...eip712.types };
      delete typesWithoutDomain.EIP712Domain;

      const signature = await signer.signTypedData(
        eip712.domain,
        typesWithoutDomain,
        eip712.message
      );

      console.log('🔓 Decrypting result... (may take 30-60 seconds)');
      
      // Call userDecrypt
      const decryptedResults = await fhevmInstance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace("0x", ""),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays
      );

      const result = decryptedResults[encryptedHandle];
      console.log('✅ Decrypted result:', result);
      
      setVerificationResult(result);
      
    } catch (e: any) {
      console.error('❌ Decrypt failed:', e);
      
      // Retry logic for 500 errors
      if (e.message?.includes('500') && retryCount < 3) {
        const waitTime = (retryCount + 1) * 10;
        console.log(`⚠️ Retrying ${retryCount + 1}/3 after ${waitTime}s...`);
        setDecryptError(`Relayer busy. Retrying in ${waitTime}s... (${retryCount + 1}/3)`);
        
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        return handleDecrypt(retryCount + 1);
      }
      
      setDecryptError(e.message || 'Failed to decrypt result');
    } finally {
      setIsDecrypting(false);
    }
  };

  // Loading state
  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-slate-300 mb-8">
            To start the capital verification process, please connect your Web3 wallet.
          </p>
          <div className="flex justify-center mb-6">
            <ConnectButton />
          </div>
          <Link 
            href="/"
            className="inline-block text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
          <p className="text-white text-xl">Initializing FHEVM...</p>
          <p className="text-slate-400 text-sm mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-3">Initialization Error</h2>
          <p className="text-red-300 mb-6">{initError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="container mx-auto mb-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <ConnectButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-2xl">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">Capital Verification</h1>
          <p className="text-slate-300 mb-6">
            Enter your capital amount to verify if it meets the minimum threshold. 
            Your amount will be encrypted and never revealed publicly.
          </p>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
            <p className="text-blue-300 text-sm">
              <strong>Minimum Threshold:</strong> 10,000 (encrypted on-chain)
            </p>
          </div>

          {/* Input Form */}
          {!submitSuccess && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Your Capital Amount
                </label>
                <input
                  type="number"
                  value={capitalAmount}
                  onChange={(e) => setCapitalAmount(e.target.value)}
                  placeholder="Enter amount (e.g., 15000)"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{submitError}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !capitalAmount}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {isSubmitting ? '🔐 Encrypting & Submitting...' : '🚀 Submit for Verification'}
              </button>
            </div>
          )}

          {/* Success & Countdown */}
          {submitSuccess && countdown > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold text-white mb-2">Syncing Permissions...</h3>
              <p className="text-yellow-300 mb-4">
                Please wait <strong>{countdown}</strong> seconds for blockchain permissions to sync.
              </p>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Decrypt Button */}
          {canDecrypt && verificationResult === null && (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                <p className="text-green-300 text-sm text-center">
                  ✅ Capital submitted successfully! You can now decrypt your verification result.
                </p>
              </div>

              {decryptError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{decryptError}</p>
                </div>
              )}

              <button
                onClick={() => handleDecrypt(0)}
                disabled={isDecrypting}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDecrypting ? '🔓 Decrypting... (30-60s)' : '🔓 Decrypt Verification Result'}
              </button>
            </div>
          )}

          {/* Verification Result */}
          {verificationResult !== null && (
            <div className={`${verificationResult === 1 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-2xl p-8 text-center`}>
              <div className="text-7xl mb-4">{verificationResult === 1 ? '✅' : '❌'}</div>
              <h2 className={`text-3xl font-bold mb-3 ${verificationResult === 1 ? 'text-green-400' : 'text-red-400'}`}>
                {verificationResult === 1 ? 'Verification Passed!' : 'Verification Failed'}
              </h2>
              <p className={`${verificationResult === 1 ? 'text-green-300' : 'text-red-300'} mb-6`}>
                {verificationResult === 1 
                  ? 'Your capital meets or exceeds the minimum threshold of 10,000.' 
                  : 'Your capital is below the minimum threshold of 10,000.'}
              </p>
              <button
                onClick={() => {
                  setVerificationResult(null);
                  setSubmitSuccess(false);
                  setCanDecrypt(false);
                  setCapitalAmount('');
                }}
                className="px-8 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
              >
                Verify Again
              </button>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">🔒 Privacy Guarantee</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>✓ Your capital amount is encrypted in your browser before submission</li>
            <li>✓ The smart contract never sees your actual amount</li>
            <li>✓ All comparisons are done on encrypted data using FHE</li>
            <li>✓ Only you can decrypt and view the verification result</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

