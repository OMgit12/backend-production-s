import util from 'util'
import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'
import  config  from '../config/config'
import  {EApplicationEnviroment}  from '../constant/application'
import { FileTransportInstance } from 'winston/lib/winston/transports'
import path from 'path'



const consoleLogFormat = format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta = {} } = info

    const customLevel = (level.toUpperCase())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customTimestamp = (timestamp as string)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${('META')} ${customMeta}\n`

    return customLog
})

const consoleTransport = (): ConsoleTransportInstance[] => {
    if (config.ENV === EApplicationEnviroment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

const fileLogFormat = format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})


const FileTransport = (): FileTransportInstance[] => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}


export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport(), ...FileTransport()]
})

