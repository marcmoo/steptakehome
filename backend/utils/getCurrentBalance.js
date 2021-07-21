import Store from '../Store';

export const getCurrentBalance = (amount, error) => {
  if (error !== null) {
    return Store.balance;
  }
  const newBalance = Store.balance - amount;
  if (newBalance >= 0) {
    Store.balance = newBalance;
    return newBalance;
  }
  return Store.balance;
};
