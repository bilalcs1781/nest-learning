import { Module } from '@nestjs/common';
import { EmailHandlerService } from './email-handler.service';
import { EmailHandlerController } from './email-handler.controller';

@Module({
  providers: [EmailHandlerService],
  controllers: [EmailHandlerController],
  exports: [EmailHandlerService],
})
export class EmailHandlerModule {}
