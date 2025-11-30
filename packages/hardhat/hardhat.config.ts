require("@fhevm/hardhat-plugin");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@typechain/hardhat");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");

const MNEMONIC = process.env.MNEMONIC || "play cement much paper mandate rubber marble ketchup over wonder critic survey";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xd14a24a2946c0e528036a470ad0bd6597ef2d98674a48072a845e5f7a75ee22d";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "PdDY0FCflhQnCiLhEwxih";
const RPC_URL = process.env.RPC_URL || `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: !!process.env.REPORT_GAS,
  },
  networks: {
    hardhat: {
      accounts: { mnemonic: MNEMONIC },
      chainId: 31337,
    },
    sepolia: {
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      url: RPC_URL,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.24",
    settings: {
      metadata: { bytecodeHash: "none" },
      optimizer: { enabled: true, runs: 800 },
      evmVersion: "cancun",
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

module.exports = config;
