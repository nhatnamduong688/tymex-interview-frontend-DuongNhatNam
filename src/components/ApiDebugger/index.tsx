import React, { useState, useEffect, useRef } from 'react';
import * as productApi from '../../services/product';
import { TProduct } from '../../types/product';
import {
  ApiStatusType,
  DebugContainer,
  DebugHeader,
  Title,
  StatusBadge,
  ToggleButton,
  DebugButton,
  ErrorButton,
  DebugContent,
  DebugSection,
  SectionTitle,
  ApiInfo,
  SampleData,
  ErrorMessage,
  RetryInfo,
  MockSwitch,
  SwitchLabel,
  ToggleSwitch,
  ButtonsContainer
} from './styles';

export const ApiDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatusType>('checking');
  const [retryCount, setRetryCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sampleData, setSampleData] = useState<TProduct[] | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  // Để test API khi component mount
  useEffect(() => {
    checkApiStatus();
  }, []);

  // Check API status
  const checkApiStatus = async () => {
    setApiStatus('checking');
    setErrorMessage(null);
    
    try {
      const data = await productApi.getProducts({ useMockData });
      setSampleData(data.slice(0, 3));
      setApiStatus('connected');
      setRetryCount(0);
    } catch (error) {
      setApiStatus('disconnected');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unknown error');
      }
      
      // Retry logic
      if (retryCount < 3) {
        setApiStatus('retrying');
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          checkApiStatus();
        }, 2000);
      }
    }
  };

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
              ? `Retrying (${retryCount}/3)`
              : 'Checking...'}
      </ToggleButton>
      
      <DebugContainer isVisible={isVisible}>
        <DebugHeader>
          <Title>
            <StatusBadge status={apiStatus} />
            API Debugger
          </Title>
          <div>
            <DebugButton onClick={() => checkApiStatus()}>
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
                    ? `🔄 Retrying (${retryCount}/3)`
                    : '🔍 Checking...'}
              <br />
              Mock Data: {useMockData ? 'Enabled' : 'Disabled'}
            </ApiInfo>
          </DebugSection>
          
          {sampleData && (
            <DebugSection>
              <SectionTitle>Sample Data:</SectionTitle>
              <SampleData>
                {JSON.stringify(sampleData, null, 2)}
              </SampleData>
            </DebugSection>
          )}
          
          <DebugSection>
            <SectionTitle>Auto-Refresh:</SectionTitle>
            <ApiInfo>
              ⏱️ Data will refresh every 2 seconds if enabled
            </ApiInfo>
          </DebugSection>
          
          <DebugSection>
            <SectionTitle>Retry Configuration:</SectionTitle>
            <ApiInfo>
              Max Retries: 3
              <br />
              Retry Strategy: Fixed delay (2s)
              <br />
              Current Attempt: {retryCount > 0 ? retryCount : 'None'}
            </ApiInfo>
          </DebugSection>
          
          {errorMessage && (
            <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
          )}
          
          <ButtonsContainer>
            <DebugButton onClick={() => checkApiStatus()}>
              Test Connection
            </DebugButton>
            <ErrorButton onClick={() => setUseMockData(!useMockData)}>
              {useMockData ? 'Disable Mock Data' : 'Use Mock Data'}
            </ErrorButton>
          </ButtonsContainer>
        </DebugContent>
      </DebugContainer>
    </>
  );
};

export default ApiDebugger; 