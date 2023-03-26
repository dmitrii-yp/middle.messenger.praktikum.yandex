import WS, { WSEvents } from '../core/ws';
import Store from '../core/store';
import { Message} from '../typings/api-types';


class MessagesController {
  private sockets: Map<number, WS> = new Map();

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }
    const userId = Store.getState().user.data.id;

    const ws = new WS(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    this.sockets.set(chatId, ws);

    await ws.connect();

    this.subscribe(ws, chatId);
    this.fetchOldMessages(chatId);
  }

  sendMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`);
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

  private subscribe(transport: WS, chatId: number) {
    transport.on(WSEvents.Message, (message: Message) =>
      this.onMessage(chatId, message)
    );
    transport.on(WSEvents.Close, () => this.onClose(chatId));
  }
}

export default new MessagesController();

