'use strict';

export default class Logger {
    static error(log, ...msg){
        if (log) console.error(...msg);
    }

    static log(log, ...msg){
        if (log) console.log(...msg);
    }
}
