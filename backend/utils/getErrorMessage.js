import Store from '../Store';
import {getRandomInt} from './getRandomInt';

/**
 * bonus question:
 * 1. what happens if the server fails randomly? let's simulate it
 * answer: I had simulated it by creating a random number from 0,... to 4, when the random number is 0 (20% possibility), it will return Failed Get Code error.
 */

export const getErrorMessage = amount => {
  const failedInt = getRandomInt(4);
  if (failedInt === 0) {
    return 'Error: Failed Get Code';
  }
  if (amount > Store.balance) {
    // if user pressed a button withdraw amount is more than balance right now, it will response the error message of 'not enough money'
    return 'Error: Not Enough Money';
  }
  return null;
};
