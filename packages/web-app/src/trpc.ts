import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@starter-trpc-react/api-server';

export const trpc = createReactQueryHooks<AppRouter>();
