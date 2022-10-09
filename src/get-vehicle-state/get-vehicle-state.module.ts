import { Module } from '@nestjs/common';
import { GetVehicleStateService } from './get-vehicle-state.service';
import { GetVehicleStateController } from './get-vehicle-state.controller';
import { DataBaseModule } from '../database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [GetVehicleStateController],
  providers: [GetVehicleStateService],
})
export class GetVehicleStateModule {}
