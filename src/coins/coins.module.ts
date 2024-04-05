import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coin, CoinSchema } from 'src/schemas/coin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {}
