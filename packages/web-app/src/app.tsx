import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import { useTrpcClient } from './hooks/use-trpc-client';
import ErrorWrapper from './error-wrapper';

const client = new QueryClient();

const defaultSearch = {
  name: 'Simon',
};

const Users: React.FC = () => {
  const { data: users } = trpc.useQuery(['searchUsers', defaultSearch], { suspense: true });

  return (
    <div>
      {users?.map(({ name, age }) => (
        <>
          <div>Name: {name}</div> <div>Age: {age}</div>
        </>
      ))}
    </div>
  );
};

const App = () => {
  const trpcClient = useTrpcClient();

  return (
    <ErrorWrapper>
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
          <Users />
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorWrapper>
  );
};

export default App;
