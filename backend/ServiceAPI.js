import {getErrorMessage, getRandomCodeString, getCurrentBalance} from './utils';
import Response from './Response';

class ServiceAPI {
  getCode = amount => {
    // this is simulating get data from the database.
    const errorMessage = getErrorMessage(amount);
    const generatedCode = getRandomCodeString(9999, errorMessage);
    const updatedBalance = getCurrentBalance(amount, errorMessage);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = new Response(
          updatedBalance,
          generatedCode,
          errorMessage,
        );
        setTimeout(() => {
          const {code, balance, error} = response;
          if (error !== null) {
            reject(new Error(error));
          } else {
            resolve({code, balance, error: null});
          }
        }, 1000);
      }, 1000);
    });
  };
}

export default ServiceAPI;
