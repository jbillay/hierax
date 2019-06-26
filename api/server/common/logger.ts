import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, prettyPrint } = format;

const log = createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(
    label({ label: process.env.APP_ID }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [new transports.Console()],
});

export default log;
