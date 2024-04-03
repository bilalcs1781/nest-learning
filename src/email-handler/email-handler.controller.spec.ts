import { Test, TestingModule } from '@nestjs/testing';
import { EmailHandlerController } from './email-handler.controller';

describe('EmailHandlerController', () => {
  let controller: EmailHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailHandlerController],
    }).compile();

    controller = module.get<EmailHandlerController>(EmailHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
