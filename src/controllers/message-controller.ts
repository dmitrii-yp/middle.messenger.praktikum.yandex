import WS, { WSEvents } from '../core/ws';
import Store from '../core/store';

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

class MessagesController {
  private sockets: Map<number, WS> = new Map();

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = Store.getState().user.id;

    const ws = new WS(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    this.sockets.set(chatId, ws);

    await ws.connect();

    this.subscribe(ws, chatId);
    this.fetchOldMessages(chatId);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (Store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    Store.set(`messages.${id}`, messagesToAdd);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WS, id: number) {
    transport.on(WSEvents.Message, (message) =>
      this.onMessage(id, message)
    );
    transport.on(WSEvents.Close, () => this.onClose(id));
  }
}

const controller = new MessagesController();

// @ts-ignore
window.messagesController = controller;

export default controller;
