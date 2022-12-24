import Block from '../../core/block';
import templateString from 'bundle-text:./sidebar.hbs';

const ChatsData = {
  data: [
    {
      name: 'Design Destroyer',
      message: 'В 2008 году художник Jon Rafman  начал собирать...',
      time: '17:12',
      messageCount: '1',
    },
    {
      name: 'Андрей',
      message: 'Изображение',
      time: '15:01',
      messageCount: '12',
    },
    {
      name: 'Илья',
      message: 'Друзья, у меня для вас особенный выпуск новостей. Заходите на мой канал.',
      time: '07:01',
      messageCount: '3',
    },
    {
      name: 'Вадим',
      message: 'Вы: круто',
      time: '05:55',
    },
    {
      name: 'тет-а-теты',
      message: 'И Human Interface Guidelines и Material...',
      time: '03:12',
    },
    {
      name: 'Киноклуб',
      message: 'Вы: стикер',
      time: '12:34',
    },
    {
      name: '1, 2, 3',
      message: 'Миллионы россиян ежедневно проводят десятки часов...',
      time: 'Sun',
    },
    {
      name: 'Day',
      message: 'Так увлёкся работой по курсу, что совсем...',
      time: 'Sat',
    },
    {
      name: 'Стас Рогозин',
      message: 'Можно и сегодня',
      time: 'Sat',
    },
    {
      name: 'Anton',
      message: 'Last message',
      time: 'Sat',
    }
  ],
};

type DataBit = {
  name: string;
  message: string;
  time: string;
  messageCount?: string;
};

interface ChatSideBarProps {
  data: DataBit[]
}

export class ChatSideBar extends Block {
  constructor(props: ChatSideBarProps) {
    super(props);
    this.setProps(ChatsData);
  }

  static get componentName() {
    return 'ChatSideBar';
  }

  render() {
    return templateString as unknown as string;
  }
}
