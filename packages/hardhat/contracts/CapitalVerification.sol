// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title CapitalVerification
 * @notice Privacy-preserving capital verification using Fully Homomorphic Encryption (FHE)
 * @dev Users can prove their capital meets a threshold without revealing the exact amount
 */
contract CapitalVerification is ZamaEthereumConfig {
    // Encrypted minimum capital threshold required for verification
    euint32 private minCapitalThreshold;
    
    // Mapping from user address to their encrypted capital amount
    mapping(address => euint32) public userCapital;
    
    // Mapping from user address to their encrypted verification result (1 = passed, 0 = failed)
    mapping(address => euint32) public verificationResults;
    
    // Track if user has submitted capital
    mapping(address => bool) public hasSubmitted;
    
    // Track submission timestamp for each user
    mapping(address => uint256) public submissionTimestamp;
    
    // Events
    event CapitalSubmitted(address indexed user, uint256 timestamp);
    event VerificationCompleted(address indexed user, uint256 timestamp);
    
    /**
     * @notice Contract constructor - sets the minimum capital threshold
     * @dev The threshold is encrypted and stored on-chain
     */
    constructor() {
        // Set minimum capital threshold to 10000 (encrypted)
        minCapitalThreshold = FHE.asEuint32(uint32(10000));
        FHE.allowThis(minCapitalThreshold);
    }
    
    /**
     * @notice Submit encrypted capital amount for verification
     * @param encryptedCapital Encrypted capital amount from user
     * @param proof Zero-knowledge proof for the encrypted input
     * @dev Capital amount is compared with threshold using FHE operations
     */
    function submitCapital(
        externalEuint32 encryptedCapital,
        bytes calldata proof
    ) external {
        // Convert external encrypted input to internal encrypted type
        euint32 capital = FHE.fromExternal(encryptedCapital, proof);
        
        // Store user's encrypted capital
        userCapital[msg.sender] = capital;
        
        // Perform FHE comparison: capital >= minCapitalThreshold
        // Since gte might not be available, we check if capital < threshold and negate
        ebool isLessThan = FHE.lt(capital, minCapitalThreshold);
        // isQualified = NOT isLessThan (meaning capital >= threshold)
        ebool isQualified = FHE.not(isLessThan);
        
        // Convert boolean result to uint32 (1 for true, 0 for false)
        euint32 one = FHE.asEuint32(uint32(1));
        euint32 zero = FHE.asEuint32(uint32(0));
        euint32 result = FHE.select(isQualified, one, zero);
        
        // Store encrypted verification result
        verificationResults[msg.sender] = result;
        hasSubmitted[msg.sender] = true;
        submissionTimestamp[msg.sender] = block.timestamp;
        
        // Grant permissions for contract and user to access encrypted data
        FHE.allowThis(capital);
        FHE.allow(capital, msg.sender);
        
        FHE.allowThis(result);
        FHE.allow(result, msg.sender);
        
        emit CapitalSubmitted(msg.sender, block.timestamp);
        emit VerificationCompleted(msg.sender, block.timestamp);
    }
    
    /**
     * @notice Get encrypted verification result for the caller
     * @return bytes32 handle to the encrypted result
     * @dev User must have submitted capital before calling this
     */
    function getMyVerificationResult() external view returns (bytes32) {
        require(hasSubmitted[msg.sender], "No capital submitted yet");
        return FHE.toBytes32(verificationResults[msg.sender]);
    }
    
    /**
     * @notice Get encrypted capital amount for the caller
     * @return bytes32 handle to the encrypted capital
     * @dev User must have submitted capital before calling this
     */
    function getMyCapital() external view returns (bytes32) {
        require(hasSubmitted[msg.sender], "No capital submitted yet");
        return FHE.toBytes32(userCapital[msg.sender]);
    }
    
    /**
     * @notice Check if user has submitted capital
     * @param user Address to check
     * @return bool True if user has submitted
     */
    function hasUserSubmitted(address user) external view returns (bool) {
        return hasSubmitted[user];
    }
    
    /**
     * @notice Get submission timestamp for a user
     * @param user Address to check
     * @return uint256 Timestamp of submission (0 if not submitted)
     */
    function getUserSubmissionTime(address user) external view returns (uint256) {
        return submissionTimestamp[user];
    }
}

