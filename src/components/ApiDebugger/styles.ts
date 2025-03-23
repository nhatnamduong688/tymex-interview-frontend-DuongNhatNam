import styled from 'styled-components';

// Định nghĩa type cho ApiStatusType
export type ApiStatusType = 'connected' | 'disconnected' | 'checking' | 'retrying' | 'connecting';

export const DebugContainer = styled.div<{ isVisible: boolean }>`
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

export const DebugHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

export const StatusBadge = styled.span<{ status: ApiStatusType }>`
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
      case 'checking': return '#2196f3';
      case 'connecting': return '#2196f3';
      default: return '#2196f3';
    }
  }};
`;

export const ToggleButton = styled.button`
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

export const DebugButton = styled.button`
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

export const ErrorButton = styled(DebugButton)`
  background-color: rgba(255, 59, 48, 0.3);
  
  &:hover {
    background-color: rgba(255, 59, 48, 0.5);
  }
`;

export const DebugContent = styled.div`
  max-height: 350px;
  overflow-y: auto;
  word-break: break-all;
`;

export const DebugSection = styled.div`
  margin-bottom: 10px;
`;

export const SectionTitle = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: #8bc34a;
`;

export const ApiInfo = styled.div`
  padding: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const SampleData = styled.pre`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 6px;
  border-radius: 4px;
  overflow-x: auto;
  max-height: 150px;
  font-size: 11px;
  margin: 0;
`;

export const ErrorMessage = styled.div`
  color: #ff5252;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 6px;
  border-radius: 4px;
  margin-top: 8px;
`;

export const RetryInfo = styled.div`
  color: #ffb74d;
  font-size: 11px;
  margin-top: 4px;
`;

export const MockSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const SwitchLabel = styled.div`
  font-size: 11px;
  color: #ccc;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #555;
    transition: .3s;
    border-radius: 16px;
    
    &:before {
      position: absolute;
      content: "";
      height: 12px;
      width: 12px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .3s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #ff5252;
  }
  
  input:checked + span:before {
    transform: translateX(14px);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`; 