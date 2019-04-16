import * as winston from 'winston'

import { Inject } from '../common'
import { isDev } from '../utilities'

@Inject
export class Logger {

  private _logger

  constructor() {
    this._logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'core' },
      transports: [
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' })
      ]
    })

    if (isDev()) {
      this._logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }))
    }
  }

  public log(level, msg, ...splat): void { this._logger.log(level, msg, ...splat) }
  public info(msg, ...splat): void { this._logger.info(msg, ...splat) }
  public warn(msg, ...splat): void { this._logger.warn(msg, ...splat) }
  public error(msg, ...splat): void { this._logger.error(msg, ...splat) }

}
