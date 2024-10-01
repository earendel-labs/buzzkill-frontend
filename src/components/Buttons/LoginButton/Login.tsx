import { signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { BrowserProvider } from "ethers"; // For ethers v6

async function handleLogin() {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  // Fetch CSRF token
  const csrfRes = await fetch("/api/auth/csrf");
  const { csrfToken } = await csrfRes.json();

  // Create SIWE message
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: "Sign in with Ethereum",
    uri: window.location.origin,
    version: "1",
    chainId: Number((await provider.getNetwork()).chainId), // Convert to number
    nonce: csrfToken,
  });

  // Sign the SIWE message
  const signature = await signer.signMessage(message.prepareMessage());

  // Submit to NextAuth
  const result = await signIn("credentials", {
    message: JSON.stringify(message),
    signature,
    redirect: false,
  });

  if (result?.error) {
    console.error("Login failed:", result.error);
  } else {
    console.log("Logged in successfully");
  }
}

export default function LoginButton() {
  return <button onClick={handleLogin}>Login with Ethereum</button>;
}
