/* eslint-disable @typescript-eslint/no-unused-vars */
import result from 'config';
import util from 'util';
import app from './app';
import SafeMongooseConnection from './lib/safe-mongoose-connection';
import logger from './logger';

result();

const PORT = process.env.PORT || 3000;

let debugCallback = null;
if (process.env.NODE_ENV === 'development') {
  debugCallback = (collectionName: string, method: string, query: unknown, doc: string): void => {
    const message = `${collectionName}.${method}(${util.inspect(query, {
      colors: true,
      depth: null,
    })})`;
    logger.log({
      level: 'silly',
      message,
      consoleLoggerOptions: { label: 'MONGO' },
    });
  };
}

const safeMongooseConnection = new SafeMongooseConnection({
  mongoUrl: process.env.MONGO_URL,
  debugCallback,
  onStartConnection: (mongoUrl) => logger.info(`Connecting to MongoDB at ${mongoUrl}`),
  onConnectionError: (error, mongoUrl) =>
    logger.log({
      level: 'error',
      message: `Could not connect to MongoDB at ${mongoUrl}`,
      error,
    }),
  onConnectionRetry: (mongoUrl) => logger.info(`Retrying to MongoDB at ${mongoUrl}`),
});

const serve = () =>
  app.listen(PORT, () => {
    logger.debug(`🌏 Express server started at http://localhost:${PORT}`);

    if (process.env.NODE_ENV === 'development') {
      // This route is only present in development mode
      logger.debug(`⚙️  Swagger UI hosted at http://localhost:${PORT}/dev/api-docs`);
    }
  });

if (process.env.MONGO_URL == null) {
  logger.error('MONGO_URL not specified in environment');
  process.exit(1);
} else {
  safeMongooseConnection.connect((mongoUrl) => {
    logger.info(`Connected to MongoDB at ${mongoUrl}`);
    serve();
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  console.log('\n'); /* eslint-disable-line */
  logger.info('Gracefully shutting down');
  logger.info('Closing the MongoDB connection');
  safeMongooseConnection.close((err) => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err,
      });
    } else {
      logger.info('Mongo connection closed successfully');
    }
    process.exit(0);
  }, true);
});
