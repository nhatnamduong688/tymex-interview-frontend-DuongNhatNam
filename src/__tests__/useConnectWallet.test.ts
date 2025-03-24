import { renderHook, act } from '@testing-library/react';
import { useConnectWallet } from '@/hooks/useConnectWallet';

describe('useConnectWallet Hook', () => {
  // Save the original window.ethereum to restore after tests
  const originalEthereum = global.window.ethereum;
  
  // Mock console methods
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const mockConsoleLog = jest.fn();
  const mockConsoleError = jest.fn();
  
  // Mock alert
  const originalAlert = window.alert;
  const mockAlert = jest.fn();
  
  beforeEach(() => {
    console.log = mockConsoleLog;
    console.error = mockConsoleError;
    window.alert = mockAlert;
    
    // Clear all mocks between tests
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Restore original methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    window.alert = originalAlert;
    
    // Restore original ethereum
    global.window.ethereum = originalEthereum;
  });
  
  it('initializes with null account', () => {
    const { result } = renderHook(() => useConnectWallet());
    
    expect(result.current.account).toBeNull();
    expect(typeof result.current.connectWallet).toBe('function');
  });
  
  it('shows alert when ethereum is not available', async () => {
    // Set ethereum to undefined
    global.window.ethereum = undefined;
    
    const { result } = renderHook(() => useConnectWallet());
    
    await act(async () => {
      await result.current.connectWallet();
    });
    
    expect(mockAlert).toHaveBeenCalledWith(
      'MetaMask is not installed. Please install it to use this feature.'
    );
    expect(result.current.account).toBeNull();
  });
  
  it('connects wallet and sets account when ethereum is available', async () => {
    // Mock ethereum with successful connection
    const mockAccounts = ['0x123456789abcdef'];
    global.window.ethereum = {
      request: jest.fn().mockResolvedValue(mockAccounts)
    };
    
    const { result } = renderHook(() => useConnectWallet());
    
    await act(async () => {
      await result.current.connectWallet();
    });
    
    expect(global.window.ethereum.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts'
    });
    expect(result.current.account).toBe(mockAccounts[0]);
    expect(mockConsoleLog).toHaveBeenCalledWith('Connected account:', mockAccounts[0]);
  });
  
  it('handles error when connecting wallet', async () => {
    // Mock ethereum with error
    const mockError = new Error('Connection error');
    global.window.ethereum = {
      request: jest.fn().mockRejectedValue(mockError)
    };
    
    const { result } = renderHook(() => useConnectWallet());
    
    await act(async () => {
      await result.current.connectWallet();
    });
    
    expect(global.window.ethereum.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts'
    });
    expect(result.current.account).toBeNull();
    expect(mockConsoleError).toHaveBeenCalledWith('Error connecting to MetaMask:', mockError);
  });
  
  it('handles empty accounts array', async () => {
    // Mock ethereum with empty accounts array
    global.window.ethereum = {
      request: jest.fn().mockResolvedValue([])
    };
    
    const { result } = renderHook(() => useConnectWallet());
    
    await act(async () => {
      await result.current.connectWallet();
    });
    
    expect(global.window.ethereum.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts'
    });
    expect(result.current.account).toBeNull();
    expect(mockConsoleError).toHaveBeenCalledWith('No accounts found.');
  });
}); 