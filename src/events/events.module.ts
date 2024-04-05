import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [ChatModule],

  providers: [EventsGateway],
})
export class EventsModule {}
