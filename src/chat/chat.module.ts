import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { EventsGateway } from 'src/events/events.gateway';
import { ChatSchema } from './message.schema/message.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }])],
  providers: [EventsGateway, ChatService],
  exports: [ChatService], // Make sure to export ChatService
})
export class ChatModule {}
