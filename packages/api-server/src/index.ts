/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { setupServer } from './server';
import { appRouter } from './app-router';

export type AppRouter = typeof appRouter;

setupServer();
