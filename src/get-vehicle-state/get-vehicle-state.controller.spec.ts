import { Test, TestingModule } from '@nestjs/testing';
import { GetVehicleStateController } from './get-vehicle-state.controller';
import { GetVehicleStateService } from './get-vehicle-state.service';

describe('GetVehicleStateController', () => {
  let controller: GetVehicleStateController;
  let service: GetVehicleStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetVehicleStateController],
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

    controller = module.get<GetVehicleStateController>(
      GetVehicleStateController,
    );
    service = module.get<GetVehicleStateService>(GetVehicleStateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get-vehicle-state', () => {
    it('should return an object containing a vehicle information and its state', async () => {
      const body = {
        timestamp: '2022-09-11 09:11:45+00',
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
        .mockImplementation(async () => result as any);

      jest.enableAutomock();

      const response = await controller.getVehicleState(vehicleId, body);
      expect(response).toEqual(result);
    });

    it('should throw an error if an invlaid timestamp is passed', async () => {
      const timestamp = '2022-09-1109:11:45+00';

      const result = {
        statusCode: 400,
        message: 'Invalid timestamp',
        error: 'Bad Request',
      };

      jest
        .spyOn(controller, 'isDate')
        .mockImplementation(async () => result as any);

      jest.enableAutomock();

      const response = await controller.isDate(timestamp);
      expect(response).toEqual(result);
    });
  });
});
