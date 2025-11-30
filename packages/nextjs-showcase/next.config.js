/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@fhevm-sdk'],
  
  // CORS headers required for FHEVM WebAssembly
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for MetaMask SDK and WalletConnect
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
        '@metamask/sdk': false,
        '@coinbase/wallet-sdk': false,
        '@base-org/account': false,
        '@gemini-wallet/core': false,
        '@safe-global/safe-apps-sdk': false,
        '@safe-global/safe-apps-provider': false,
        '@walletconnect/ethereum-provider': false,
        'porto': false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    config.ignoreWarnings = [
      { module: /@metamask\/sdk/ },
      { module: /@react-native-async-storage/ },
      { module: /pino-pretty/ },
      { module: /@coinbase\/wallet-sdk/ },
      { module: /@base-org\/account/ },
      { module: /@gemini-wallet\/core/ },
      { module: /@safe-global/ },
      { module: /@walletconnect/ },
      { module: /porto/ },
    ];
    
    return config;
  },
}

module.exports = nextConfig
