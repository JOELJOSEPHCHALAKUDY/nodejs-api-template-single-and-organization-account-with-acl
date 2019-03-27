module.exports.HttpError = class HttpError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status || 500;
    this.errors = errors || {};
  }
};