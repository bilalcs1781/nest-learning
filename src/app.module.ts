import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bilal:usman178@atlascluster.zky85co.mongodb.net/nest-learning',
    ),
    UserModule,
  ],
})
export class AppModule {}
