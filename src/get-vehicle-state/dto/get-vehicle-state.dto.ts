import { IsDefined, IsString } from 'class-validator';

export class GetVehicleStateDto {
  @IsString()
  @IsDefined()
  timestamp: string;
}
