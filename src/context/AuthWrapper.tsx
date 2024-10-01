import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { supabase } from "@/app/libs/supabaseClient";
import { SiweMessage } from "siwe";
import { signIn, useSession } from "next-auth/react";

interface AuthWrapperProps {
  setAuthStatus: (
    status: "loading" | "unauthenticated" | "authenticated"
  ) => void;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ setAuthStatus }) => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: session, status: sessionStatus } = useSession();

  console.log("AuthWrapper initialized.");
  console.log("Session status:", sessionStatus);
  console.log("Session data:", session);
  console.log("Wallet address:", address);
  console.log("Wallet connected:", isConnected);

  // Check if the user already exists in the Supabase DB
  const checkUserInDatabase = async (address: string) => {
    console.log(`Checking if user exists in Supabase for address: ${address}`);
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address);

    if (error) {
      console.error("Error checking user in Supabase:", error);
    } else if (users && users.length > 0) {
      console.log(`User found in Supabase for address: ${address}`);
    } else {
      console.log(`No user found in Supabase for address: ${address}`);
    }

    return !error && users && users.length > 0;
  };

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        console.log("Starting authentication process...");

        setAuthStatus("loading");

        // If already authenticated or no wallet connected, exit early
        if (session && session.address) {
          console.log(
            "User already authenticated via session:",
            session.address
          );
          setAuthStatus("authenticated");
          return;
        }

        if (!isConnected || !address) {
          console.warn("No wallet connected or no address found.");
          setAuthStatus("unauthenticated");
          return;
        }

        // Check if the user already exists in Supabase
        const userExists = await checkUserInDatabase(address);

        if (userExists) {
          console.log(
            `User exists in Supabase. Signing in with NextAuth for address: ${address}`
          );

          // Use redirect: false to prevent navigation on success/failure
          const signInResult = await signIn("credentials", {
            address,
            redirect: false,
          });

          if (signInResult?.error) {
            console.error("NextAuth signIn failed:", signInResult.error);
            setAuthStatus("unauthenticated");
          } else {
            console.log("NextAuth signIn successful.");
            setAuthStatus("authenticated");
          }

          return;
        }

        console.log(
          "User not found in Supabase, proceeding with SIWE authentication..."
        );

        // If user doesn't exist, proceed with SIWE authentication
        const nonce = Math.random().toString(36).substring(2, 15);
        console.log(`Generated nonce: ${nonce}`);

        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to authenticate.",
          uri: window.location.origin,
          version: "1",
          chainId: 1, // Modify the chain ID as necessary
          nonce,
        });

        const messageBody = message.prepareMessage();
        console.log(`Prepared SIWE message: ${messageBody}`);

        const signature = await signMessageAsync({
          message: messageBody,
        });

        console.log("Signature obtained:", signature);

        const verificationResult = await message.verify({ signature });
        console.log("Verification result:", verificationResult);

        if (verificationResult.success) {
          console.log(
            "SIWE verification successful. Inserting new user in Supabase."
          );
          await supabase.from("users").insert({ address });
          console.log(`Inserted user into Supabase for address: ${address}`);

          const signInResult = await signIn("credentials", {
            address,
            redirect: false,
          });

          if (signInResult?.error) {
            console.error(
              "NextAuth signIn failed after SIWE:",
              signInResult.error
            );
            setAuthStatus("unauthenticated");
          } else {
            console.log("NextAuth signIn successful after SIWE.");
            setAuthStatus("authenticated");
          }
        } else {
          console.warn("SIWE verification failed.");
          setAuthStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthStatus("unauthenticated");
      }
    };

    authenticateUser();
  }, [address, isConnected, session, setAuthStatus, signMessageAsync]);

  return null;
};

export default AuthWrapper;
