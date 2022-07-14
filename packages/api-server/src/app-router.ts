import superjson from 'superjson';
import { createRouter } from './create-router';
import { usersRouter } from './routers/users-router';

export const appRouter = createRouter().transformer(superjson).merge(usersRouter);
