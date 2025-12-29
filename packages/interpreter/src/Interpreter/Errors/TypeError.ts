import type { Token } from "antlr4";
import PseudoRuntimeError from "./PseudoRuntimeError.js";
import type Type from "../Type.js";
import { typeToString } from "../Type.js";

export default class PseudoTypeError extends PseudoRuntimeError {
    constructor(expected: Type[], got: Type, token: Token) {
        const expectedTypes = expected
            .map(type => typeToString(type))
            .join(' | ');
        super(`expected ${expectedTypes} got ${typeToString(got)} instead`, token);
        this.name = "TypeError";
        Object.setPrototypeOf(this, PseudoTypeError.prototype);
    }
}