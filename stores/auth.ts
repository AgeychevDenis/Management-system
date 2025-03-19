import { defineStore } from 'pinia';
import type { AuthState, User } from '~/types';
import md5 from 'md5';

const users: User[] = [
  {
    name: 'David',
    surname: 'Jones',
    credentials: {
      username: 'david.jones@creds.com',
      passphrase: '52ccca432ab28afd90969084c061b23c',
    },
    active: true,
    "_comment": "Пользователь David Jones с логином david.jones@creds.com и паролем '8u3&s-1uda'"
  },
  {
    name: 'Samantha',
    surname: 'Robertson',
    credentials: {
      username: 'sam.robertson@creds.com',
      passphrase: 'cefdd8f05b00320c8ff42f8734f96633',
    },
    active: true,
    "_comment": "Пользователь Samantha Robertson с логином sam.robertson@creds.com и паролем '0k91sa639'"
  },
  {
    name: 'Nicholas',
    surname: 'Crew',
    credentials: {
      username: 'nic.crew@creds.com',
      passphrase: '23c2b519b1e2cd4bbaf5f68f58024785',
    },
    active: false,
    "_comment": "Пользователь Nicholas Crew с логином nic.crew@creds.com и паролем '1atr48asf03'"
  },
];

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    async login(username: string, password: string) {
      const hashedPassword = md5(password);
      const foundUser = users.find(
        (user) => user.credentials.username === username && user.credentials.passphrase === hashedPassword
      );

      if (foundUser && foundUser.active) {
        this.user = {
          name: foundUser.name,
          surname: foundUser.surname,
          username: foundUser.credentials.username,
        };
        this.isAuthenticated = true;
        return true;
      }

      return false;
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      navigateTo('/login');
    },
  },

  persist: true,
});
