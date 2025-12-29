import type Type from "../Type.js";
import { typeToString } from "../Type.js";

export class BuiltInTypeError extends Error {
    constructor(expected: Type[], got: Type) {
        const expectedTypes = expected
            .map(type => typeToString(type))
            .join(' | ');
        super(`expected ${expectedTypes} got ${typeToString(got)} instead`)
        this.name = "BuiltInTypeError";
        Object.setPrototypeOf(this, BuiltInTypeError.prototype);
    }
}