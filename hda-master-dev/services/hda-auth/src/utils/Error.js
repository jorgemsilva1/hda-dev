const { logRouteError, logCrashError } = require("./Log");

function setErrorMessage(code) {
  switch (code) {
    case 400:
      return "ERR_BAD_REQUEST";
    case 401:
      return "ERR_UNAUTHORIZED";
    case 403:
      return "ERR_FORBIDDEN";
    case 404:
      return "ERR_NOT_FOUND";
    default:
      return "ERR_SERVER";
  }
}

module.exports = function sendError(res, code = 500, msg = "An error occurred") {
  logRouteError(`${code}\n${msg}`);
  if (res) {
    res.status(code).json({
      message: setErrorMessage(code)
    });
  }
}

module.exports = function throwError(msg = "An error occurred") {
  logCrashError(msg);
  throw new Error(msg);
}
