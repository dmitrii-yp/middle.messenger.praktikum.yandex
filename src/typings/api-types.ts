export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface APIError {
  reason: string;
}

export interface PasswordUpdate {
  oldPassword: string;
  newPassword: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface AddingUserToChat {
  chatId: number;
  users: number[];
}
