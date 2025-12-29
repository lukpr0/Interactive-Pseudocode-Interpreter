import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";
/**
 * This error gets thrown, when the interpreter finds things it doesn't expect.
 * Usually this happens after changes in the parser, not reflected in the interpreter.
 * This should only happen due to a bug caused by incorrect parser implementation.
 */
export class FeatureNotImplementedError extends PseudoRuntimeError {
    constructor(token: Token) {
        super("Feature not implemented", token)
        this.name = "FeatureNotImplementedError";
        Object.setPrototypeOf(this, FeatureNotImplementedError.prototype);
    }
}