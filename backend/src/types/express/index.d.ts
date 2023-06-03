import * as express from 'express';

export class Context {
    constructor(public someContextVariable) {
    }

    log(message: string) {
        console.log(this.someContextVariable, { message });
    }
}

declare global {
    namespace Express {
        interface Request {
            context: Context
        }
    }
}