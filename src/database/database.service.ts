import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import knex, { Knex } from 'knex';

import type { Env } from '../config/env.schema';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  readonly knex: Knex;

  constructor(config: ConfigService<Env, true>) {
    this.knex = knex({
      client: 'pg',
      connection: config.get('DB_URL', { infer: true }),
      pool: { min: 0, max: 10 },
    });
  }

  async onApplicationShutdown() {
    await this.knex.destroy();
  }
}
