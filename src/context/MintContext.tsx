"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadBuzzkillHatchlingsNftTotalSupply,
  useReadBuzzkillHatchlingsNftCurrentBatchSize,
  useWriteBuzzkillHatchlingsNftMint,
} from "@/hooks/BuzzkillHatchlingsNFT";
import { formatEther } from "ethers";
import { useUserContext } from "@/context/UserContext";

export interface MintContextValue {
  // States
  mintedCount: string;
  totalSupply: string;
  formattedBalance: string;
  quantity: number;
  maxQuantity: number;
  isMintLoading: boolean;
  isMinted: boolean;
  mintQuantityRequested: number;
  errorMessage: string | null;
  isCooldown: boolean;
  cooldownRemaining: number;
  transactionHash?: `0x${string}`;
  // Flags
  isConnected: boolean;
  isBalanceLoading: boolean;
  isTransactionLoading: boolean;
  isMintedCountLoading: boolean;
  isTotalSupplyLoading: boolean;
  isMintedCountError: boolean;
  isTotalSupplyError: boolean;
  // Methods
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  handleMint: () => void;
  resetError: () => void;
  // For SnackBar (or other UI) to handle
  snackbarOpen: boolean;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MintContext = createContext<MintContextValue | undefined>(undefined);

export const MintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const { bees, stakedBees, refreshBeesData } = useUserContext();

  const [mintedCount, setMintedCount] = useState<string>("0");
  const [totalSupply, setTotalSupply] = useState<string>("0");
  const [formattedBalance, setFormattedBalance] = useState<string>("0");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculation for how many minted for this user
  const currentMinted = bees.length + stakedBees.length;
  const maxPerAddress = 2;
  const remainingMint = maxPerAddress - currentMinted;

  const initialMaxQuantity = remainingMint > 0 ? remainingMint : 0;
  const [quantity, setQuantity] = useState(remainingMint > 0 ? 1 : 0);
  const [maxQuantity, setMaxQuantity] = useState(initialMaxQuantity);

  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [mintQuantityRequested, setMintQuantityRequested] = useState<number>(0);

  // Fetch balance
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useBalance({
    address: address,
  });

  // Read contract: minted count, total supply
  const {
    data: mintedData,
    isLoading: isMintedCountLoading,
    isError: isMintedCountError,
    refetch: refetchMintedCount,
    error: mintedCountError,
  } = useReadBuzzkillHatchlingsNftTotalSupply();

  const {
    data: totalSupplyData,
    isLoading: isTotalSupplyLoading,
    isError: isTotalSupplyError,
    error: totalSupplyError,
  } = useReadBuzzkillHatchlingsNftCurrentBatchSize();

  // Write contract
  const { writeContractAsync: mintBatch } = useWriteBuzzkillHatchlingsNftMint();

  // Wait for transaction
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // ********************
  //   EFFECTS
  // ********************

  // Update mintedCount
  useEffect(() => {
    if (mintedData !== undefined) {
      setMintedCount(Intl.NumberFormat().format(Number(mintedData)));
    }
  }, [mintedData]);

  // Update totalSupply
  useEffect(() => {
    if (totalSupplyData) {
      const formattedTotalSupply = new Intl.NumberFormat().format(
        Number(totalSupplyData)
      );
      setTotalSupply(formattedTotalSupply);
    }
  }, [totalSupplyData]);

  // Update formattedBalance
  useEffect(() => {
    if (balanceData) {
      const balance = parseFloat(formatEther(balanceData.value)).toFixed(4);
      setFormattedBalance(balance);
    }
  }, [balanceData]);

  // Update quantity
  useEffect(() => {
    setMaxQuantity(remainingMint > 0 ? remainingMint : 0);
    if (remainingMint > 0 && quantity > remainingMint) {
      setQuantity(remainingMint);
    } else if (remainingMint <= 0) {
      setQuantity(0);
    } else if (quantity === 0 && remainingMint > 0) {
      setQuantity(1);
    }
  }, [remainingMint]);

  // Transaction success/failure watch
  useEffect(() => {
    const handleTransaction = async () => {
      if (isTransactionSuccess) {
        setIsMinted(true);
        setSnackbarOpen(true);

        // Refetch minted data after success
        await refetchMintedCount();
        refreshBeesData();

        setIsMintLoading(false);

        // Start cooldown
        setCooldownRemaining(60);
        setIsCooldown(true);
      }
      if (transactionError) {
        setErrorMessage("Transaction error: " + transactionError.message);
        setIsMintLoading(false);
      }
    };
    handleTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransactionSuccess, transactionError]);

  // Cooldown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isCooldown && cooldownRemaining > 0) {
      interval = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            setIsCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCooldown, cooldownRemaining]);

  // ********************
  //   METHODS
  // ********************
  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleMint = async () => {
    if (!isConnected) {
      setErrorMessage("Wallet not connected or minting unavailable.");
      setSnackbarOpen(true);
      return;
    }

    if (quantity > remainingMint) {
      setErrorMessage("You cannot mint more than the allowed limit.");
      setSnackbarOpen(true);
      return;
    }

    setIsMinted(false);
    setErrorMessage(null);
    setIsMintLoading(true);

    // Capture the exact quantity for this mint action
    setMintQuantityRequested(quantity);

    if (mintBatch && address) {
      try {
        // Check supply
        const { data: latestMintedData } = await refetchMintedCount();
        if (
          latestMintedData !== undefined &&
          totalSupplyData !== undefined &&
          latestMintedData + BigInt(quantity) > totalSupplyData
        ) {
          setErrorMessage("Requested quantity exceeds available supply.");
          setSnackbarOpen(true);
          setIsMintLoading(false);
          return;
        }

        // Send tx
        const txResponse = await mintBatch({
          args: [BigInt(quantity)],
        });
        setTransactionHash(txResponse);
      } catch (error: any) {
        let userFriendlyMessage = "An unknown error occurred during minting";

        if (error instanceof Error) {
          if (error.message.includes("User denied transaction")) {
            userFriendlyMessage = "Transaction rejected by user.";
          } else if (error.message.includes("insufficient funds")) {
            userFriendlyMessage = "Insufficient funds for transaction.";
          } else if (error.message.includes("gas estimation failed")) {
            userFriendlyMessage = "Transaction failed due to gas estimation.";
          } else if (error.message.includes("network")) {
            userFriendlyMessage = "Network error. Please try again.";
          } else if (error.message.includes("invalid parameters")) {
            userFriendlyMessage =
              "Transaction failed due to invalid parameters.";
          } else if (error.message.includes("revert")) {
            userFriendlyMessage = "Transaction reverted by the contract.";
          } else {
            userFriendlyMessage = error.message;
          }
        }
        setIsMintLoading(false);
        setErrorMessage(userFriendlyMessage);
        setSnackbarOpen(true);
      }
    } else {
      setErrorMessage("Wallet not connected or minting unavailable.");
      setSnackbarOpen(true);
      setIsMintLoading(false);
    }
  };

  const resetError = () => {
    setErrorMessage(null);
  };

  // ********************
  //   PROVIDER VALUE
  // ********************
  const value: MintContextValue = {
    mintedCount,
    totalSupply,
    formattedBalance,
    quantity,
    maxQuantity,
    isMintLoading,
    isMinted,
    mintQuantityRequested,
    errorMessage,
    isCooldown,
    cooldownRemaining,
    transactionHash,
    isConnected,
    isBalanceLoading,
    isTransactionLoading,
    isMintedCountLoading,
    isTotalSupplyLoading,
    isMintedCountError,
    isTotalSupplyError,
    incrementQuantity,
    decrementQuantity,
    handleMint,
    resetError,
    snackbarOpen,
    setSnackbarOpen,
  };

  return <MintContext.Provider value={value}>{children}</MintContext.Provider>;
};

export const useMintContext = (): MintContextValue => {
  const context = useContext(MintContext);
  if (!context) {
    throw new Error("useMintContext must be used within a MintProvider");
  }
  return context;
};
