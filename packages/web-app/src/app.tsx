import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import { useTrpcClient } from './hooks/use-trpc-client';
import ErrorWrapper from './error-wrapper';

const client = new QueryClient();

const defaultSearch = {
  lastName: 'ver',
};

const Users: React.FC = () => {
  const { data: users } = trpc.useQuery(['searchUsers', defaultSearch], { suspense: true });
  // const { data: users } = trpc.useQuery(['helloWorld', defaultSearch], { suspense: true });

  return (
    <div>
      {users?.map(({ lastName, age, dob }) => (
        <>
          <div>Name: {lastName}</div> <div>Age: {age}</div> <div>Age: {dob.toISOString()}</div>
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
