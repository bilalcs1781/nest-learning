import { Test, TestingModule } from '@nestjs/testing';
import { EmailHandlerService } from './email-handler.service';

describe('EmailHandlerService', () => {
  let service: EmailHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailHandlerService],
    }).compile();

    service = module.get<EmailHandlerService>(EmailHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
