const fs = require("fs");
const path = require("path");

const CRASH_ERROR_LOG_PATH = path.resolve(__dirname, "../../logs/crash.errorlog.txt");
const ROUTE_ERROR_LOG_PATH = path.resolve(__dirname, "../../logs/route.errorlog.txt");

module.exports = async function logCrashError(message) {
  fsWriteLog('Crash', message);
}

module.exports = async function logRouteError(message) {
  fsWriteLog('Route', message);
}

async function fsWriteLog(type, message) {
  try {
    await fs.appendFile(
      type === 'Crash' ? CRASH_ERROR_LOG_PATH : ROUTE_ERROR_LOG_PATH,
      `\n${new Date().toISOString()}\n${message}\n`,
      (err) => console.info("# Error log saved"));
    return true;
  } catch (e) {
    return false;
  }
}
