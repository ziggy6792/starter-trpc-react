import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import { useTrpcClient } from './hooks/use-trpc-client';
import ErrorWrapper from './error-wrapper';

const client = new QueryClient();

const App = () => {
  const trpcClient = useTrpcClient();

  return (
    <ErrorWrapper>
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}></QueryClientProvider>
      </trpc.Provider>
    </ErrorWrapper>
  );
};

export default App;
