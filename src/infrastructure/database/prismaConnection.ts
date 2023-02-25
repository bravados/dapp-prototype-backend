import { PrismaClient } from '@prisma/client';

export class PrismaConnection {
  static client?: PrismaClient;

  static getClient() {
    if (!this.client) {
      this.client = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
    }

    return this.client;
  }
}
