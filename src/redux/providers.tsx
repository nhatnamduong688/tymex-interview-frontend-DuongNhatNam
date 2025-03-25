import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface ReduxProvidersProps {
  children: ReactNode;
}

export const ReduxProviders = ({ children }: ReduxProvidersProps) => {
  return <Provider store={store}>{children}</Provider>;
}; 