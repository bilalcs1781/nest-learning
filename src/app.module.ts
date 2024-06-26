import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { EmailHandlerModule } from './email-handler/email-handler.module';
import { EventsModule } from './events/events.module';
import { CoinsModule } from './coins/coins.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://bilal:usman178@atlascluster.zky85co.mongodb.net/nest-learning',
    ),
    UserModule,
    TaskModule,
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    EmailHandlerModule,

    EventsModule,

    CoinsModule,

    ChatModule,
  ],
  controllers: [],
})
export class AppModule {}
