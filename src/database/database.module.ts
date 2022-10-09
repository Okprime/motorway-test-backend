import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

const dataBaseProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'user',
    host: 'localhost',
    database: 'motorway',
    password: 'password',
    port: 5432,
  }),
};

@Module({
  providers: [dataBaseProvider],
  exports: [dataBaseProvider],
})
export class DataBaseModule {}
