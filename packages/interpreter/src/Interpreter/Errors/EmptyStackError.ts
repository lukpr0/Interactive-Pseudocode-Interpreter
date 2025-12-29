import type { Token } from "antlr4";
import PseudoRuntimeError from "./PseudoRuntimeError.js";

export default class EmptyStackError extends PseudoRuntimeError {

    constructor(token: Token) {
        super("value is unexpectedly undefined", token)
        this.name = "EmptyStackError";
        Object.setPrototypeOf(this, EmptyStackError.prototype);
    }
}