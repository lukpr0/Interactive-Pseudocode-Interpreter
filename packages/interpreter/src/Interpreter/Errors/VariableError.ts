import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";

export class VariableError extends PseudoRuntimeError {
    constructor(token: Token) {
        super(`Variable ${token.text} does not exist`, token)
        this.name = "VariableError";
        Object.setPrototypeOf(this, VariableError.prototype);
    }
}