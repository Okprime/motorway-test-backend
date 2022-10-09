import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetVehicleStateDto } from './dto/get-vehicle-state.dto';
import { GetVehicleStateService } from './get-vehicle-state.service';

@Controller('get-vehicle-state')
export class GetVehicleStateController {
  constructor(
    private readonly getVehicleStateService: GetVehicleStateService,
  ) {}

  @Get(':vehicleId')
  async getVehicleState(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() getVehicleStateDto: GetVehicleStateDto,
  ) {
    const { timestamp } = getVehicleStateDto;
    await this.isDate(timestamp);
    return this.getVehicleStateService.getVehicleState(
      vehicleId,
      getVehicleStateDto,
    );
  }

  isDate(timestamp) {
    const isValidTimestamp = new Date(timestamp).getTime() > 0;
    if (isValidTimestamp === false) {
      throw new BadRequestException('Invalid timestamp');
    }
  }
}
