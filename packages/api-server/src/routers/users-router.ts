/* eslint-disable no-restricted-imports */
import _ from 'lodash';
import { createRouter } from 'src/create-router';
import { IUser } from 'src/domain-models/user';
import { searchUsersValdidator } from 'src/validators';

const users: IUser[] = [
  {
    firstName: 'Simon',
    lastName: 'Verhoeven',
    age: 30,
    dob: new Date(),
  },
  {
    firstName: 'Simon',
    lastName: 'Pegg',
    age: 52,
    dob: new Date(),
  },
  {
    firstName: 'Ben',
    lastName: 'Verhoeven',
    age: 31,
    dob: new Date(),
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
        if (input.lastName) {
          if (!user.lastName?.toLowerCase().includes(input.lastName.toLowerCase())) return false;
        }
        return true;
      });

      return searchResults;
    },
  })
  .query('helloWorld', {
    input: searchUsersValdidator,
    async resolve({ input }) {
      const searchResults = _.filter(users, (user) => {
        if (input.age) {
          if (input.age !== user.age) return false;
        }
        if (input.lastName) {
          if (!user.lastName?.toLowerCase().includes(input.lastName.toLowerCase())) return false;
        }
        return true;
      });

      return searchResults;
    },
  });
