import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { GetVehicleStateDto } from './dto/get-vehicle-state.dto';

@Injectable()
export class GetVehicleStateService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {}

  async getVehicleState(vehicleId, getVehicleStateDto: GetVehicleStateDto) {
    const { timestamp } = getVehicleStateDto;
    // check if the timestamp passed is beyond the vehicle state in the database
    await this.isFutureDate(timestamp);
    const res = await this.connection.query(
      `SELECT * FROM "stateLogs" AS stateLogs

      INNER JOIN "vehicles" ON stateLogs."vehicleId" = vehicles.id
      
      WHERE "vehicleId" = ${vehicleId} AND "timestamp" <= '${timestamp}'
      
      ORDER BY "timestamp" DESC
      
      LIMIT 1`,
    );

    // check if the record is found in the database
    if (res.rows.length === 0) {
      throw new NotFoundException('Record not found');
    }
    return res.rows[0];
  }

  async isFutureDate(timestamp) {
    const res = await this.connection.query(
      `SELECT COUNT (*) FROM "stateLogs" AS stateLogs
      WHERE "timestamp" >= '${timestamp}'`,
    );

    if (+res.rows[0].count === 0) {
      throw new NotFoundException('Date not reached');
    }
  }
}
