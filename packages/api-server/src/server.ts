import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './app-router';
import { log } from './utils/logger';

const apiPort = 4000;
const wsPort = 4001;

const createContext = () => null;

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.get('/', (req, res) => {
    res.send('Hello from api-server');
  });

  const expressServer = app.listen(apiPort, () => {
    log.info(`api-server listening at http://localhost:${apiPort}`);
  });

  // Create WebSocket

  const wss = new ws.Server({
    port: wsPort,
  });
  const handler = applyWSSHandler({ wss, router: appRouter, createContext });

  wss.on('connection', (ws) => {
    log.info(`Connection (${wss.clients.size})`);

    ws.once('close', () => {
      log.info(`Connection (${wss.clients.size})`);
    });
  });

  log.info(`WebSocket Server listening on ws://localhost:${wsPort}`);

  process.on('SIGINT', () => {
    log.info('Got SIGINT. Press Control-C to exit.');
    handler.broadcastReconnectNotification();
    wss.close();
    expressServer.close();
  });
};
