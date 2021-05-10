const {
  ERROR_CODE_NOT_FOUND_404,
  ERROR_CODE_CAST_ERROR_400,
  ERROR_CODE_INTERNAL_SERVER_500,
  ERROR_CODE_FORBIDDEN_403,
} = require('../utils/constants');

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static castError(res, msg) {
    // return ApiError(ERROR_CODE_CAST_ERROR_400, msg);
    return res.status(ERROR_CODE_CAST_ERROR_400).json({ message: msg });
  }

  static validationError(res, msg) {
    return res.status(ERROR_CODE_CAST_ERROR_400).json({ message: msg });
  }

  static forbidden(res, msg) {
    return res.status(ERROR_CODE_FORBIDDEN_403).json({ message: msg });
  }

  static notFound(res, msg) {
    return res.status(ERROR_CODE_NOT_FOUND_404).json({ message: msg });
  }

  static internalServerError(msg) {
    return new ApiError(ERROR_CODE_INTERNAL_SERVER_500, msg);
  }
}

module.exports = ApiError;

/*
https://www.youtube.com/watch?v=DyqVqaf1KnA
*/
