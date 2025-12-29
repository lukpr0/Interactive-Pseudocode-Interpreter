import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError";

export class InternalError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "InternalError";
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}

export class LocatedInternalError extends PseudoRuntimeError {
    constructor(message: string, token: Token) {
        super(message, token)
        this.name = "InternalError";
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}