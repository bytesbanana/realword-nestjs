import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [],
    }).compile();

    controller = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should be define', () => {
      expect(controller).toBeDefined();
    });
  });
});
