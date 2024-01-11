import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bilal:usman178@atlascluster.zky85co.mongodb.net/nest-learning',
    ),
    UserModule,
    TaskModule,
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
