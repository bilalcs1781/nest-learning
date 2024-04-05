import { Injectable } from '@nestjs/common';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coin } from 'src/schemas/coin.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoinsService {
  constructor(@InjectModel(Coin.name) private coinModal: Model<Coin>) {}
  create(createCoinDto: CreateCoinDto) {
    const newCoin = new this.coinModal(createCoinDto);

    return newCoin.save();
  }

  findAll() {
    return this.coinModal.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} coin`;
  }

  async update(id: string, updateCoinDto: UpdateCoinDto) {
    console.log(id);
    const updatedCoin = await this.coinModal
      .findByIdAndUpdate(id, updateCoinDto, { new: true })
      .exec();
    return updatedCoin;
  }

  remove(id: string) {
    return this.coinModal.findByIdAndDelete(id);
  }
}
