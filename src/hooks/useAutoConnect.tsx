import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

export function useAutoConnect() {
  const { data: session } = useSession();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    async function signInWithEthereum() {
      try {
        const callbackUrl = '/protected'; // Change as needed
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in to the Buzzkill World',
          uri: window.location.origin,
          version: '1',
          chainId: 1, // Update to your chain ID
          nonce: await fetch('/api/auth/csrf').then(res => res.json()).then(data => data.csrfToken),
        });

        const signature = await signMessageAsync({ message: message.prepareMessage() });

        await signIn('credentials', {
          message: JSON.stringify(message),
          redirect: false,
          signature,
          callbackUrl,
        });
      } catch (error) {
        console.error('Error during SIWE sign-in:', error);
      }
    }

    if (!session && isConnected) {
      signInWithEthereum();
    }
  }, [session, isConnected, address]);
}