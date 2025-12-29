import type { Token } from "antlr4";
import PseudoRuntimeError from "./PseudoRuntimeError.js";
import type Type from "../Type.js";
import { typeToString } from "../Type.js";

export class PseudoTypeError extends PseudoRuntimeError {
    constructor(message: string, token: Token) {
        super(message, token)
        this.name = "TypeError";
        Object.setPrototypeOf(this, PseudoTypeError.prototype);
    }
}

export class UnexpectedTypeError extends PseudoTypeError {
    constructor(expected: Type[], got: Type, token: Token) {
        const expectedTypes = expected
            .map(type => typeToString(type))
            .join(' | ');
        super(`expected ${expectedTypes} got ${typeToString(got)} instead`, token);
    }
}
