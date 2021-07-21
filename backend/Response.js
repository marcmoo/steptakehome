class Response {
  constructor(balance, code, error) {
    this.error = error;
    this.code = code;
    this.balance = balance;
  }
}

export default Response;
