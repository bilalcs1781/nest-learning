import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private chatrooms = new Map<string, Set<string>>(); // Maps chatroom ID to a Set of userIds

  @SubscribeMessage('createChatroom')
  handleCreateChatroom(
    @MessageBody() data: { userId: string; partnerId: string },
    @ConnectedSocket() client: Socket,
  ): { chatroomId: string } {
    const chatroomId = this.generateChatroomId();
    this.chatrooms.set(chatroomId, new Set([data.userId, data.partnerId]));

    console.log(`Chatroom Created: ${chatroomId}`); // Log the chatroom ID
    client.join(chatroomId);
    console.log(chatroomId);
    return { chatroomId };
  }

  @SubscribeMessage('joinChatroom')
  handleJoinChatroom(
    @MessageBody() data: { userId: string; chatroomId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { userId, chatroomId } = data;
    const users = this.chatrooms.get(chatroomId);

    if (users && users.add(userId)) {
      // Ensure user is part of this chatroom
      client.join(chatroomId);
      this.server.to(chatroomId).emit('userJoined', { userId, chatroomId }); // Notify the room
    }
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: {
      chatroomId: string;
      senderId: string;
      message: string;
    },
  ): void {
    this.server.to(data.chatroomId).emit('message', {
      senderId: data.senderId,
      message: data.message,
    });
  }

  private generateChatroomId(): string {
    return [...Array(10)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  }
}
