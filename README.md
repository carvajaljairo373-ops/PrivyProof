# PrivyProof 🔐

**Privacy-Preserving Capital Verification Platform**

> Built with Zama FHEVM v0.9 - Prove your financial capacity without revealing your exact capital amount

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.24-363636?logo=solidity)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-blue?logo=ethereum)

---

## 🌟 Overview

**PrivyProof** is a revolutionary decentralized application (DApp) that enables individuals and businesses to cryptographically prove their capital meets specific thresholds **without revealing the exact amount**. Built on cutting-edge **Fully Homomorphic Encryption (FHE)** technology by [Zama](https://zama.ai), PrivyProof ensures complete privacy while maintaining trustless verification on the Ethereum blockchain.

### The Problem We Solve

In traditional financial systems, proving capital adequacy requires:
- ❌ Disclosing sensitive financial information
- ❌ Trusting third-party intermediaries
- ❌ Risking data breaches and privacy leaks
- ❌ Time-consuming verification processes

### Our Solution

PrivyProof leverages FHE to enable:
- ✅ **Complete Privacy**: Your capital amount remains encrypted end-to-end
- ✅ **Trustless Verification**: Cryptographic proof without intermediaries
- ✅ **Instant Results**: On-chain verification in seconds
- ✅ **Zero Knowledge**: No one, not even the smart contract, can see your actual balance

---

## 🎯 Use Cases

### Real-World Applications

1. **🏦 Bank Loans & Credit Lines**
   - Prove creditworthiness for loan applications
   - Qualify for premium credit cards privately
   - Demonstrate financial stability without KYC data leaks

2. **🏢 Business Partnerships**
   - Verify partner capital for joint ventures
   - Qualify for investment opportunities
   - Participate in exclusive business networks

3. **💼 Investment Funds**
   - Meet accredited investor requirements
   - Qualify for private equity deals
   - Access exclusive hedge fund opportunities

4. **🎯 Government Tenders & Bids**
   - Prove financial capacity for government contracts
   - Meet bid security requirements
   - Demonstrate project funding privately

5. **🌐 DeFi & Web3**
   - Qualify for high-tier staking pools
   - Access exclusive DAO memberships
   - Participate in private token sales

---

## 🚀 Features

- **🔒 Privacy-First Architecture**: FHE ensures your data never leaves encrypted form
- **⚡ Instant Verification**: Get results in seconds, not days
- **🌐 Fully Decentralized**: No centralized servers or databases
- **🔗 On-Chain Proof**: Verification results stored immutably on Ethereum
- **💎 Modern UI/UX**: Beautiful, responsive design built with Next.js 15 and Tailwind CSS
- **🔌 Multi-Wallet Support**: Compatible with MetaMask, WalletConnect, Coinbase Wallet, and more

---

## 🏗️ Architecture

### Technology Stack

**Blockchain Layer:**
- **FHEVM v0.9**: Fully Homomorphic Encryption Virtual Machine by Zama
- **Solidity 0.8.24**: Smart contract development
- **Ethereum Sepolia**: Testnet deployment
- **Hardhat**: Development environment

**Frontend Layer:**
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features
- **RainbowKit**: Beautiful wallet connection UI
- **Wagmi**: Ethereum React hooks
- **Tailwind CSS**: Utility-first CSS framework

**Encryption Layer:**
- **Zama Relayer SDK 0.3.0-5**: Client-side FHE operations
- **EIP-712**: Typed data signing for decryption authorization

### Smart Contract

**Contract Address (Sepolia):**
```
0xda0fB5bF9F658F72F6CBA99Cd99057d971110545
```

**Key Functions:**
- `submitCapital()`: Submit encrypted capital amount for verification
- `getMyVerificationResult()`: Retrieve encrypted verification result
- `getMyCapital()`: Retrieve encrypted capital amount

**How It Works:**
1. User encrypts capital amount locally using FHEVM SDK
2. Encrypted data is submitted to smart contract on Sepolia
3. Contract performs FHE comparison: `capital >= threshold` (10,000)
4. Result is encrypted and stored on-chain
5. User decrypts result privately using EIP-712 signature

---

## 📦 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** for gas fees ([Get from faucet](https://sepoliafaucet.com))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/PrivyProof.git
   cd PrivyProof
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Navigate to frontend:**
   ```bash
   cd packages/nextjs-showcase
   ```

4. **Run development server:**
   ```bash
   pnpm dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🎮 Usage Guide

### Step 1: Connect Your Wallet
1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Launch App" button
3. Connect your Web3 wallet (MetaMask, WalletConnect, etc.)
4. Switch to **Ethereum Sepolia** testnet

### Step 2: Submit Capital Amount
1. Enter your capital amount (e.g., 15000)
2. Click "Submit for Verification"
3. Approve the transaction in your wallet
4. Wait for transaction confirmation (~10-15 seconds)

### Step 3: Decrypt Verification Result
1. Wait for 10-second countdown (permission sync)
2. Click "Decrypt Verification Result"
3. Sign the EIP-712 message in your wallet
4. Wait for decryption (~30-60 seconds)
5. View your result: ✅ Passed or ❌ Failed

**Minimum Threshold:** 10,000

---

## 🔧 Development

### Project Structure

```
PrivyProof/
├── packages/
│   ├── hardhat/                    # Smart contract development
│   │   ├── contracts/
│   │   │   └── CapitalVerification.sol
│   │   ├── deploy/
│   │   │   └── deploy-capital-verification.ts
│   │   └── hardhat.config.ts
│   └── nextjs-showcase/            # Frontend DApp
│       ├── app/
│       │   ├── page.tsx            # Landing page
│       │   ├── verify/
│       │   │   └── page.tsx        # Verification page
│       │   └── layout.tsx
│       ├── components/
│       │   ├── Providers.tsx
│       │   └── ClientProviders.tsx
│       ├── utils/
│       │   └── wallet.ts
│       ├── next.config.js
│       └── vercel.json
└── README.md
```

### Smart Contract Development

**Compile contracts:**
```bash
cd packages/hardhat
pnpm compile
```

**Deploy to Sepolia:**
```bash
pnpm deploy:sepolia
```

**Environment Variables:**
Create `.env` in `packages/hardhat/`:
```env
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_key
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_alchemy_key
```

### Frontend Development

**Start dev server:**
```bash
cd packages/nextjs-showcase
pnpm dev
```

**Build for production:**
```bash
pnpm build
```

**Run tests:**
```bash
pnpm test
```

---

## 🔒 Security & Privacy

### Privacy Guarantees

1. **End-to-End Encryption**: Capital amounts are encrypted in your browser before submission
2. **Homomorphic Operations**: All comparisons are performed on encrypted data
3. **Zero Knowledge**: The smart contract never sees plaintext values
4. **User-Controlled Decryption**: Only you can decrypt your verification result

### Security Best Practices

- ✅ All contracts audited for common vulnerabilities
- ✅ Non-custodial: We never hold your private keys
- ✅ Open source: All code is publicly verifiable
- ✅ Testnet deployment: Safe testing environment

### Known Limitations

- ⚠️ Testnet only (not production-ready)
- ⚠️ Decryption can take 30-60 seconds due to relayer processing
- ⚠️ Requires Sepolia testnet ETH for gas fees

---

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Build:**
   - **Root Directory**: `packages/nextjs-showcase`
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`

4. **Environment Variables:**
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xda0fB5bF9F658F72F6CBA99Cd99057d971110545
   NEXT_PUBLIC_CHAIN_ID=11155111
   ```

5. **Deploy!**

---

## 📚 Technical Deep Dive

### Fully Homomorphic Encryption (FHE)

FHE allows computations to be performed directly on encrypted data without decryption. In PrivyProof:

1. **Client-Side Encryption**: User's capital is encrypted using `fhevmInstance.createEncryptedInput()`
2. **On-Chain Computation**: Smart contract compares encrypted capital with encrypted threshold
3. **Encrypted Result**: Comparison result (pass/fail) is stored encrypted
4. **Client-Side Decryption**: Only the user can decrypt using `userDecrypt()` with EIP-712 signature

**Key FHE Operations Used:**
- `FHE.fromExternal()`: Import encrypted input
- `FHE.lt()`: Less-than comparison (encrypted)
- `FHE.not()`: Logical NOT (encrypted)
- `FHE.select()`: Conditional selection (encrypted)
- `FHE.allowThis()`: Grant contract access permission
- `FHE.allow()`: Grant user decryption permission

### FHEVM Configuration

```typescript
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
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Zama](https://zama.ai)**: For providing the revolutionary FHEVM technology
- **[Ethereum Foundation](https://ethereum.org)**: For the decentralized infrastructure
- **[Next.js Team](https://nextjs.org)**: For the amazing React framework
- **[RainbowKit](https://rainbowkit.com)**: For beautiful wallet connection UI

---

## 📞 Support & Community

- **Documentation**: [Zama FHEVM Docs](https://docs.zama.org/fhevm)
- **Issues**: [GitHub Issues](https://github.com/yourusername/PrivyProof/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/PrivyProof/discussions)

---

## 🔮 Roadmap

- [x] ✅ Core capital verification functionality
- [x] ✅ Beautiful landing page and UI
- [x] ✅ Complete FHE integration
- [x] ✅ Sepolia testnet deployment
- [ ] 🚧 Multi-threshold support (customize verification amounts)
- [ ] 🚧 Verification history dashboard
- [ ] 🚧 Export verification certificates (NFTs)
- [ ] 🚧 Mainnet deployment
- [ ] 🚧 Smart contract audit
- [ ] 🚧 Mobile app (iOS/Android)

---

## ⭐ Star History

If you find this project useful, please consider giving it a star ⭐️

---

<div align="center">

**Built with ❤️ using Zama FHEVM**

*Empowering financial privacy through cryptography*

</div>
