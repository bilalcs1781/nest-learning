import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type COinDocument = HydratedDocument<Coin>;

@Schema({ timestamps: true }) // Enable automatic timestamps
export class Coin {
  @Prop({ required: true })
  name: string;

  @Prop()
  chain: string;
  @Prop()
  price: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
