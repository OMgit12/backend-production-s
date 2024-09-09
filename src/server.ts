import app from './app';
import config from './config/config';
import { initRateLimiter } from './config/ratelimiter';
import databaseservice from './service/databaseservice';
import logger from './util/logger';
import mongoose from 'mongoose';


const server = app.listen(config.PORT);

(async () => {
  try {

    // database connection 
    const connection = await databaseservice.connection()
    logger.info(`DATABASE_CONNECTED`, { meta: connection })

    // initRateLimiter(connection)
    // logger.info(`RATE_LIMITER_INIT`)

    const connectToDatabase = async () => {
      const mongooseConnection = await mongoose.connect(config.DATABASE_URL as string)
      initRateLimiter(mongooseConnection.connection) // Pass the correct connection object here
    }
    
    connectToDatabase()


    logger.info(`APPLICATION_STARTED`, {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL,
      },
    });
  } catch (error) {
    logger.error(`APPLICATION_ERROR`, { meta: error });

    
    server.close((error) => {
      if (error) {
        logger.error('APPLICATION_ERROR');
      }

      process.exit(1);
    });
  }
})();