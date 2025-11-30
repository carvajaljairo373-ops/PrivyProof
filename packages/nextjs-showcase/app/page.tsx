'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-white">PrivyProof</span>
          </div>
          <Link 
            href="/verify"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold">
              🔐 Powered by Fully Homomorphic Encryption
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Privacy-Preserving
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Capital Verification
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Prove your financial capacity without revealing your exact capital amount. 
            Built on cutting-edge Fully Homomorphic Encryption (FHE) technology by Zama.
          </p>

          <div className="flex gap-4 justify-center">
            <Link 
              href="/verify"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Start Verification
            </Link>
            <a 
              href="#how-it-works"
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20" id="features">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Complete Privacy</h3>
            <p className="text-slate-300">
              Your capital amount remains encrypted end-to-end. No one, not even the smart contract, can see your actual balance.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Trustless Verification</h3>
            <p className="text-slate-300">
              Cryptographically prove you meet capital requirements without intermediaries or revealing sensitive data.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 hover:border-green-500/40 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Instant Results</h3>
            <p className="text-slate-300">
              Get verification results immediately on-chain. Fast, efficient, and completely decentralized.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20" id="how-it-works">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Connect Your Wallet',
                  description: 'Securely connect your Web3 wallet (MetaMask, WalletConnect, etc.) to the application.',
                },
                {
                  step: '02',
                  title: 'Enter Capital Amount',
                  description: 'Input your capital amount. It will be encrypted locally in your browser using FHE.',
                },
                {
                  step: '03',
                  title: 'Submit to Blockchain',
                  description: 'Your encrypted amount is submitted to the smart contract on Ethereum Sepolia testnet.',
                },
                {
                  step: '04',
                  title: 'Get Verification Result',
                  description: 'The smart contract compares your encrypted amount with the threshold (10,000) and returns an encrypted result. Decrypt to see if you passed!',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Real-World Applications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏦', title: 'Bank Loans', desc: 'Prove creditworthiness privately' },
              { icon: '🏢', title: 'Business Deals', desc: 'Verify partner capital' },
              { icon: '💼', title: 'Investment Funds', desc: 'Qualify for exclusive opportunities' },
              { icon: '🎯', title: 'Tender Bids', desc: 'Meet bid requirements confidentially' },
            ].map((useCase, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-blue-500/30 transition-all duration-300">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-400">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Verify Your Capital?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Experience the future of privacy-preserving financial verification. No KYC, no data leaks, just pure cryptographic proof.
          </p>
          <Link 
            href="/verify"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Launch Verification App
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-6 text-center text-slate-400">
          <p>Built with ❤️ using <a href="https://docs.zama.org/fhevm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Zama FHEVM</a> • Deployed on Ethereum Sepolia</p>
          <p className="mt-2 text-sm">Contract: <code className="text-slate-300">0xda0fB5bF9F658F72F6CBA99Cd99057d971110545</code></p>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = 'force-dynamic';
