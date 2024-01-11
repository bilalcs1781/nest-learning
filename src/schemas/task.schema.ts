import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
