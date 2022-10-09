import { Test, TestingModule } from '@nestjs/testing';
import { GetVehicleStateService } from './get-vehicle-state.service';

describe('GetVehicleStateService', () => {
  let service: GetVehicleStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetVehicleStateService,
        {
          provide: GetVehicleStateService,
          useValue: {
            getVehicleState: jest.fn(),
            isFutureDate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetVehicleStateService>(GetVehicleStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get-vehicle-state', () => {
    it('should return an object containing a vehicle information and its state', async () => {
      const body = {
        timestamp: '2022-09-11T09:11:45.000Z',
      };
      const vehicleId = 3;

      const result = {
        vehicleId: 3,
        state: 'sold',
        timestamp: '2022-09-11T09:11:45.000Z',
        id: 3,
        make: 'VW',
        model: 'GOLF',
      };

      jest
        .spyOn(service, 'getVehicleState')
        .mockImplementation(async () => result);

      jest.enableAutomock();

      const response = await service.getVehicleState(vehicleId, body);
      expect(response).toEqual(result);
    });

    it('should throw an error if the record is not found in the database', async () => {
      const body = {
        timestamp: '2022-09-11T09:11:45.000Z',
      };
      const vehicleId = 6;

      const result = {
        statusCode: 404,
        message: 'Record not found',
        error: 'Not Found',
      };
      jest
        .spyOn(service, 'getVehicleState')
        .mockImplementation(async () => result);

      jest.enableAutomock();

      const response = await service.getVehicleState(vehicleId, body);
      expect(response).toEqual(result);
    });

    it('should throw an error if the timestamp is is beyond the vehicle state in the database', async () => {
      const timestamp = '2022-09-29 09:11:45+00';

      const result = {
        statusCode: 404,
        message: 'Date not reached',
        error: 'Not Found',
      };
      jest
        .spyOn(service, 'isFutureDate')
        .mockImplementation(async () => result as any);

      jest.enableAutomock();

      const response = await service.isFutureDate(timestamp);
      expect(response).toEqual(result);
    });
  });
});
