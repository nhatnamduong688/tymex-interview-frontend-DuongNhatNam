import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { productService } from '../../services/api';
import { TProduct } from '../../types/Product';

// Styled components
const DebugContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: ${props => props.isVisible ? '0' : '-400px'};
  right: 20px;
  width: 300px;
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

const StatusBadge = styled.span<{ connected: boolean }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: ${props => props.connected ? '#4caf50' : '#f44336'};
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

export const ApiDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [sampleProduct, setSampleProduct] = useState<TProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string>('');

  const checkApiConnection = async () => {
    setApiStatus('checking');
    setError(null);
    
    try {
      // Try to get first product as sample
      const response = await productService.getProducts(1, 1);
      
      setApiStatus('connected');
      
      if (response.data.length > 0) {
        setSampleProduct(response.data[0]);
      }
      
      // Extract base URL
      setApiUrl(process.env.REACT_APP_API_URL || 'http://localhost:5005');
      
    } catch (err) {
      setApiStatus('disconnected');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('API Connection Error:', err);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      checkApiConnection();
    }
  }, []);

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        <StatusBadge connected={apiStatus === 'connected'} />
        API {apiStatus === 'connected' ? 'Connected' : apiStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
      </ToggleButton>
      
      <DebugContainer isVisible={isVisible}>
        <DebugHeader>
          <Title>
            <StatusBadge connected={apiStatus === 'connected'} />
            API Debugger
          </Title>
          <div>
            <DebugButton onClick={checkApiConnection}>
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
                  : '🔄 Checking...'}
              <br />
              URL: {apiUrl}
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
          
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
        </DebugContent>
      </DebugContainer>
    </>
  );
};

export default ApiDebugger; 