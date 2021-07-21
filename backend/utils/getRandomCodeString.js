import Store from '../Store';
import {getRandomInt} from './getRandomInt';

export const getRandomCodeString = (max, error) => {
  if (error) {
    return Store.code;
  }
  const updatedCode = getRandomInt(max);
  let updatedCodeString = updatedCode.toString();
  if (updatedCode > 999) {
    // do nothing
  } else if (updatedCode > 99) {
    updatedCodeString = '0' + updatedCodeString;
  } else if (updatedCode > 9) {
    updatedCodeString = '00' + updatedCodeString;
  } else {
    updatedCodeString = '000' + updatedCodeString;
  }
  Store.code = updatedCodeString;
  return updatedCodeString;
};
