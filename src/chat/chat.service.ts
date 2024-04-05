import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './message.schema/message.schema'; // Assuming Chat is correctly exported here

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async saveMessage(username: string, message: string): Promise<Chat> {
    const newMessage = new this.chatModel({ username, message });
    return await newMessage.save();
  }

  async getAllMessages(): Promise<Chat[]> {
    return await this.chatModel.find().exec();
  }
}
