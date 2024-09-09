import { memoryUsage } from "process";
import config from "../config/config";
import os from "os";

export default {

    getSystemHealth: ()=> {
        return{
            cpuUsage: os.loadavg(),
            totalMemory: `${os.totalmem() / 1024 / 1024 } MB`,
            freeMemory: `${os.freemem() / 1024 / 1024} MB`,
            hostname: os.hostname() 
        }
    },

    getApplicationHealth: ()=> {
        return {
            environment: config.ENV,
            uptime: `${process.uptime().toFixed(2)}`,
            memoryUsage: {
                heapTotal: `${memoryUsage().heapTotal / 1024 / 1024} MB`,
                heapUsed: `${memoryUsage().heapUsed / 1024 / 1024} MB`
            } 
        }
    }
}