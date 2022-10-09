import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './database/database.module';
import { GetVehicleStateModule } from './get-vehicle-state/get-vehicle-state.module';

@Module({
  imports: [DataBaseModule, GetVehicleStateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
