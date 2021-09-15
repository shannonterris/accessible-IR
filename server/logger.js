const { createLogger, transports, format } = require("winston");
const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.printf((info) => {
      return `${info.message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "activity.log" }),
  ],
});
exports.logger = logger;
