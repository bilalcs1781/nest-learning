import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  message: string;

  @Prop()
  username: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
