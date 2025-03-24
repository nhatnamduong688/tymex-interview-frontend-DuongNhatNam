import { useState } from 'react';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

export const useConnectWallet = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert(
          'MetaMask is not installed. Please install it to use this feature.'
        );
        return;
      }

      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]); // Set the first account
        console.log('Connected account:', accounts[0]);
      } else {
        console.error('No accounts found.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return { account, connectWallet };
};
