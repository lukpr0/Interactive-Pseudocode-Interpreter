import { BuiltInTypeError } from "../Errors/index.js";
import Type from "../Type.js";
import { PseudoInteger, PseudoString as PseudoString } from "../Types/index.js";
import type { Value } from "../Value.js";
import BuiltInFunction from "./BuiltInFunction.js";

export class CodepointFunction extends BuiltInFunction {

    constructor() {
        super(1, 'codepoint')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.String) {
            throw new BuiltInTypeError([Type.String], args[0]!.type)
        }
        const value = args[0].value.codePointAt(0)
        if (!value) {
            throw new Error("No codepoint for value")
        }
        return new PseudoInteger(BigInt(value))
    }

}

export class CharFunction extends BuiltInFunction {

    constructor() {
        super(1, 'char')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Integer) {
            throw new BuiltInTypeError([Type.Integer], args[0]!.type)
        }

        const value = String.fromCodePoint(Number(args[0].value))
        return new PseudoString(value) 
    }

}

export class SubstringFunction extends BuiltInFunction {

    constructor() {
        super(3, 'substring');
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.String) {
            throw new BuiltInTypeError([Type.String], args[0]!.type)
        }
        if (args[1]?.type != Type.Integer) {
            throw new BuiltInTypeError([Type.Integer], args[1]!.type)
        }
        if (args[2]?.type != Type.Integer) {
            throw new BuiltInTypeError([Type.Integer], args[2]!.type)
        }
        const start = Number(args[1].value);
        const end = Number(args[2].value);

        const result = args[0].value.substring(start, end);

        return new PseudoString(result);
    }

}