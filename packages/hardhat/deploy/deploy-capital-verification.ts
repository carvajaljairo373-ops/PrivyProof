import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployCapitalVerification: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying CapitalVerification contract...");
  console.log("Deployer:", deployer);

  const capitalVerification = await deploy("CapitalVerification", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log("✅ CapitalVerification deployed to:", capitalVerification.address);
  console.log("Transaction hash:", capitalVerification.transactionHash);
};

export default deployCapitalVerification;
deployCapitalVerification.tags = ["CapitalVerification"];

