/* eslint-disable no-restricted-imports */
import _ from 'lodash';
import { createRouter } from 'src/create-router';
import { IUser } from 'src/domain-models/user';
import { searchUsersValdidator } from 'src/validators';

const users: IUser[] = [
  {
    name: 'Simon Verhoeven',
    age: 30,
  },
  {
    name: 'Simon Pegg',
    age: 52,
  },
  {
    name: 'Ben Verhoeven',
    age: 31,
  },
];

export const usersRouter = createRouter()
  .query('users', {
    async resolve() {
      return users;
    },
  })
  .query('searchUsers', {
    input: searchUsersValdidator,
    async resolve({ input }) {
      const searchResults = _.filter(users, (user) => {
        if (input.age) {
          if (input.age !== user.age) return false;
        }
        if (input.name) {
          if (!user.name?.toLowerCase().includes(input.name.toLowerCase())) return false;
        }
        return true;
      });

      return searchResults;
    },
  });
