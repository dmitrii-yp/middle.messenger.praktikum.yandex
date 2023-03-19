import Handlebars from 'handlebars';
import { Message } from '../typings/api-types';

export const registerHelpers = () => {
  Handlebars.registerHelper('isEqual', (a: any, b: any) => a === b);

  Handlebars.registerHelper(
    'isAnyObjectPropertyTrue',
    (obj: Record<string, string>) => {
      if (typeof obj !== 'object') {
        return false;
      }
      return Object.values(obj).some((value) => value);
    }
  );

  Handlebars.registerHelper(
    'getActiveChatMessages',
    (messages: Message[], activeChatId: number) => {
      const targetMessages = messages[activeChatId];
      if (!targetMessages) {
        return [];
      }
      return targetMessages;
    }
  );

  Handlebars.registerHelper('isMyMessage', (message: Message, myId: number) => {
    console.log(message, myId);

    return message.user_id === myId;
  });

  Handlebars.registerHelper('log', (data: string) => {
    console.log(data);
  });


};
