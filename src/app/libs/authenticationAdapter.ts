import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";
import { supabase } from "./supabaseClient";
import { signOut } from "next-auth/react";

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async (): Promise<string> => {
    const nonce = Math.random().toString(36).substring(2, 15);
    return nonce;
  },

  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to authenticate.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
  },

  getMessageBody: ({ message }) => message.prepareMessage(),

  verify: async ({ message, signature }) => {
    // Verify the signature using SIWE's verify method
    const verificationResult = await message.verify({ signature });
    
    if (!verificationResult.success) {
      throw new Error("Signature verification failed");
    }

    const { address } = message;
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", address);

    if (error) {
      throw new Error(`Error fetching user from Supabase: ${error.message}`);
    }

    // If no users were found, insert a new user
    if (!users || users.length === 0) {
      const { error: insertError } = await supabase
        .from("users")
        .insert({ address, signature });

      if (insertError) {
        throw new Error(`Error inserting user into Supabase: ${insertError.message}`);
      }
    }

    return true;
  },

  signOut: async () => {
    await signOut({ callbackUrl: "/" });
  },
});

export default authenticationAdapter;
