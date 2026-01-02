import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";
import type Type from "../Type.js";
import { typeToString } from "../Type.js";
import type NodeLocation from "../../AST/NodeLocations.js";

export class PseudoTypeError extends PseudoRuntimeError {
    constructor(message: string, location: NodeLocation) {
        super(message, location)
        this.name = "TypeError";
    }
}

export class UnexpectedTypeError extends PseudoTypeError {
    constructor(expected: Type[], got: Type, location: NodeLocation) {
        const expectedTypes = expected
            .map(type => typeToString(type))
            .join(' | ');
        super(`expected ${expectedTypes} got ${typeToString(got)} instead`, location);
    }
}

export class IncompatibleTypesError extends PseudoTypeError {
    constructor(left: Type, right: Type, token: Token, location: NodeLocation) {
        super(`Incompatible types ${typeToString(left)}, ${typeToString(right)} for ${token.text}`, location)
    }
}