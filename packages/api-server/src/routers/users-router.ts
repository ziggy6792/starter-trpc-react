/* eslint-disable no-restricted-imports */
import { createRouter } from 'src/create-router';
import { IUser } from 'src/domain-models/user';

const users: IUser[] = [
  {
    name: 'Simon',
    age: 30,
  },
  {
    name: 'Ben',
    age: 31,
  },
];

export const historicalPriceRouter = createRouter().query('getHistoricalPrice', {
  // input: getHisoricalDataRequestValidator,
  async resolve() {
    return users;
  },
});
