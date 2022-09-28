class HttpError extends Error {
  status;
  message;

  /**
   *
   * @param {number} status
   * @param {string} message
   */
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = { HttpError };
