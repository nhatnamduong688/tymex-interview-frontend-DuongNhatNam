'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
