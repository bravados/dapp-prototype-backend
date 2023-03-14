import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaConnection {
  static client?: PrismaClient;

  static getClient() {
    if (!this.client) {
      const prisma = new PrismaClient({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          {
            emit: 'event',
            level: 'error',
          },
          {
            emit: 'event',
            level: 'info',
          },
          {
            emit: 'event',
            level: 'warn',
          },
        ],
      });

      prisma.$on('query', (e) => {
        Logger.debug(`Query: ${e.query}`);
        Logger.debug(`Params: ${e.params}`);
        Logger.debug(`Duration: ${e.duration} ms`);
      });

      prisma.$on('error', (e) =>
        Logger.error(`Message: ${e.message} - Target: ${e.target}`),
      );

      prisma.$on('info', (e) =>
        Logger.log(`Message: ${e.message} - Target: ${e.target}`),
      );

      prisma.$on('warn', (e) =>
        Logger.warn(`Message: ${e.message} - Target: ${e.target}`),
      );

      this.client = prisma;
    }

    return this.client;
  }
}
