"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadBuzzkillHatchlingsNftTotalMinted,
  useWriteBuzzkillHatchlingsNftPublicMint,
} from "@/hooks/BuzzkillHatchlingsNFTTEMP";
import { Button, Typography } from "@mui/material";

const MintPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [mintedCount, setMintedCount] = useState<string>("0");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);

  const { data: mintedData, refetch: refetchMintedData } =
    useReadBuzzkillHatchlingsNftTotalMinted();

  const { writeContractAsync: mintBatch } =
    useWriteBuzzkillHatchlingsNftPublicMint();

  // Update mintedCount when mintedData changes
  useEffect(() => {
    if (mintedData !== undefined) {
      setMintedCount(mintedData.toString());
    }
  }, [mintedData]);

  // Mint function with error handling and transaction state management
  const handleMint = async () => {
    setErrorMessage(null); // Reset error message
    setIsMintLoading(true); // Set loading state
    setIsMinted(false); // Reset mint success state

    try {
      const txResponse = await mintBatch({
        args: [BigInt(1)],
      });
      setTransactionHash(txResponse); // Track transaction hash
      console.log(txResponse);
    } catch (error) {
      setErrorMessage("An error occurred while trying to mint."); // Display error
      setIsMintLoading(false); // Reset loading state on error
    }
  };

  // Use `useWaitForTransactionReceipt` to track the transaction
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // Effect to handle transaction state change
  useEffect(() => {
    if (isTransactionSuccess) {
      setIsMinted(true); // Minting success
      refetchMintedData(); // Refetch minted data after success
      setIsMintLoading(false); // Reset loading state
    }
    if (transactionError) {
      setErrorMessage("Transaction error: " + transactionError.message); // Set transaction error message
      setIsMintLoading(false); // Reset loading state
    }
  }, [isTransactionSuccess, transactionError, refetchMintedData]);

  return (
    <div>
      <Typography variant="h4">Mint Buzzkill Hatchlings NFTs</Typography>
      <Typography variant="subtitle1">Total Minted: {mintedCount}</Typography>

      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}

      {isConnected ? (
        <Button
          variant="contained"
          disabled={isMintLoading || isTransactionLoading}
          onClick={handleMint}
        >
          {isMintLoading
            ? "Waiting for Approval..."
            : isTransactionLoading
            ? "Minting..."
            : "Mint Tokens"}
        </Button>
      ) : (
        // Show connect wallet message when not connected
        <Typography variant="body1" color="primary">
          Please connect your wallet to mint tokens.
        </Typography>
      )}

      {isMinted && (
        <Typography variant="body1" color="primary">
          Minting successful!
        </Typography>
      )}
    </div>
  );
};

export default MintPage;
