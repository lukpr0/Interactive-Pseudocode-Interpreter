import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";

/**
 * This error gets thrown when the interpreter fails to pop elements from the stack.
 * This should only happen due to a bug caused by incorrect parser implementation.
 */
export class EmptyStackError extends PseudoRuntimeError {
    constructor(token: Token) {
        super("value is unexpectedly undefined", token)
        this.name = "EmptyStackError";
        Object.setPrototypeOf(this, EmptyStackError.prototype);
    }
}