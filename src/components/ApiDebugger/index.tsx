import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { productService } from '../../services/api';
import { TProduct } from '../../types/product';

// Styled components
const DebugContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: ${props => props.isVisible ? '0' : '-400px'};
  right: 20px;
  width: 350px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  border-radius: 8px 8px 0 0;
  padding: 12px;
  z-index: 9999;
  transition: bottom 0.3s ease-in-out;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  font-family: monospace;
  font-size: 12px;
`;

const DebugHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

const StatusBadge = styled.span<{ status: 'connected' | 'disconnected' | 'checking' | 'retrying' }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: ${props => {
    switch (props.status) {
      case 'connected': return '#4caf50';
      case 'disconnected': return '#f44336';
      case 'retrying': return '#ff9800';
      default: return '#2196f3';
    }
  }};
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 9998;
  font-family: monospace;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const DebugButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  margin-left: 8px;
  font-size: 11px;
  font-family: monospace;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ErrorButton = styled(DebugButton)`
  background-color: rgba(255, 59, 48, 0.3);
  
  &:hover {
    background-color: rgba(255, 59, 48, 0.5);
  }
`;

const DebugContent = styled.div`
  max-height: 350px;
  overflow-y: auto;
  word-break: break-all;
`;

const DebugSection = styled.div`
  margin-bottom: 10px;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: #8bc34a;
`;

const ApiInfo = styled.div`
  padding: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
`;

const SampleData = styled.pre`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 6px;
  border-radius: 4px;
  overflow-x: auto;
  max-height: 150px;
  font-size: 11px;
  margin: 0;
`;

const ErrorMessage = styled.div`
  color: #ff5252;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 6px;
  border-radius: 4px;
  margin-top: 8px;
`;

const RetryInfo = styled.div`
  color: #ff9800;
  background-color: rgba(255, 152, 0, 0.1);
  padding: 6px;
  border-radius: 4px;
  margin-top: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ApiDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking' | 'retrying'>('checking');
  const [sampleProduct, setSampleProduct] = useState<TProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string>('');
  const [retryAttempt, setRetryAttempt] = useState<number>(0);
  const [maxRetries, setMaxRetries] = useState<number>(3);
  const [mockErrorMode, setMockErrorMode] = useState<boolean>(false);
  
  const retryTimeoutRef = useRef<number | null>(null);

  const checkApiConnection = async (forceError = false) => {
    setApiStatus('checking');
    setError(null);
    setRetryAttempt(0);
    
    try {
      if (forceError || mockErrorMode) {
        throw new Error('Forced error for testing');
      }
      
      // Try to get first product as sample
      const response = await productService.getProducts(1, 1);
      
      setApiStatus('connected');
      
      if (response.data.length > 0) {
        setSampleProduct(response.data[0]);
      }
      
      // Extract base URL
      setApiUrl(import.meta.env.VITE_API_URL || 'https://tymex-mock-api.onrender.com');
      
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleApiError = (err: unknown, currentRetry = 0) => {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('API Connection Error:', err);
    
    if (currentRetry < maxRetries) {
      setApiStatus('retrying');
      setRetryAttempt(currentRetry + 1);
      
      // Clear any existing retry timeout
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }
      
      // Exponential backoff: 1s, 2s, 4s, etc.
      const retryDelay = Math.min(1000 * Math.pow(2, currentRetry), 10000);
      setError(`Connection failed: ${errorMessage}. Retrying in ${retryDelay/1000}s (${currentRetry + 1}/${maxRetries})...`);
      
      retryTimeoutRef.current = window.setTimeout(() => {
        if (mockErrorMode) {
          handleApiError(new Error('Forced error during retry'), currentRetry + 1);
        } else {
          checkApiConnection();
        }
      }, retryDelay);
    } else {
      setApiStatus('disconnected');
      setError(`Failed to connect: ${errorMessage}. Max retries (${maxRetries}) reached.`);
    }
  };

  const toggleMockErrorMode = () => {
    setMockErrorMode(!mockErrorMode);
    if (!mockErrorMode) {
      checkApiConnection(true);
    } else {
      // When turning off mock error mode, check connection normally
      checkApiConnection(false);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      checkApiConnection();
    }
    
    return () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        <StatusBadge status={apiStatus} />
        API {apiStatus === 'connected' 
          ? 'Connected' 
          : apiStatus === 'disconnected' 
            ? 'Disconnected' 
            : apiStatus === 'retrying'
              ? `Retrying (${retryAttempt}/${maxRetries})`
              : 'Checking...'}
      </ToggleButton>
      
      <DebugContainer isVisible={isVisible}>
        <DebugHeader>
          <Title>
            <StatusBadge status={apiStatus} />
            API Debugger
          </Title>
          <div>
            <DebugButton onClick={() => checkApiConnection()}>
              Refresh
            </DebugButton>
            <DebugButton onClick={() => setIsVisible(false)}>
              Hide
            </DebugButton>
          </div>
        </DebugHeader>
        
        <DebugContent>
          <DebugSection>
            <SectionTitle>Connection Info:</SectionTitle>
            <ApiInfo>
              Status: {apiStatus === 'connected' 
                ? '✅ Connected' 
                : apiStatus === 'disconnected' 
                  ? '❌ Disconnected' 
                  : apiStatus === 'retrying'
                    ? `🔄 Retrying (${retryAttempt}/${maxRetries})`
                    : '🔍 Checking...'}
              <br />
              URL: {apiUrl}
              {mockErrorMode && <div style={{ color: '#ff9800', marginTop: '4px' }}>⚠️ Mock Error Mode Active</div>}
            </ApiInfo>
          </DebugSection>
          
          {sampleProduct && (
            <DebugSection>
              <SectionTitle>Sample Product:</SectionTitle>
              <SampleData>
                {JSON.stringify(sampleProduct, null, 2)}
              </SampleData>
            </DebugSection>
          )}
          
          <DebugSection>
            <SectionTitle>Auto-Refresh:</SectionTitle>
            <ApiInfo>
              ⏱️ Products will refresh every 60 seconds if enabled
            </ApiInfo>
          </DebugSection>
          
          <DebugSection>
            <SectionTitle>Retry Configuration:</SectionTitle>
            <ApiInfo>
              Max Retries: {maxRetries}
              <br />
              Retry Strategy: Exponential backoff (1s, 2s, 4s...)
              <br />
              Current Attempt: {retryAttempt > 0 ? retryAttempt : 'None'}
            </ApiInfo>
          </DebugSection>
          
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
          
          {apiStatus === 'retrying' && (
            <RetryInfo>
              Automatically retrying connection...
            </RetryInfo>
          )}
          
          <ButtonsContainer>
            <DebugButton onClick={() => checkApiConnection()}>
              Test Connection
            </DebugButton>
            <ErrorButton onClick={toggleMockErrorMode}>
              {mockErrorMode ? 'Disable Error Mode' : 'Force Error'}
            </ErrorButton>
          </ButtonsContainer>
        </DebugContent>
      </DebugContainer>
    </>
  );
};

export default ApiDebugger; 