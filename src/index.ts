import express from 'express';
import config from './config';
import Db from './models/db';
import getController from './controllers/findsecondminimum';
import Logger from './utils/logger';

const logger = new Logger('app');
async function main() {
  await Db.init();
  const server = express()
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(express.json())
    .use('/api/v1/second-minimum', getController())
    .listen(config.port, () => {
      logger.log(`server running on http://localhost:${config.port}`);
      const stopServer = () => {
        logger.log('shutting.down');
        server.close();
      };
      process.once('SIGINT', stopServer);
      process.once('SIGTERM', stopServer);
    });
}

main().catch((err) => logger.error('app.init.failed', err));
