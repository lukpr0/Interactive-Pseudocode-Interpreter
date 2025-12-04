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
            throw new Error(`Argument must be of type string, found ${args[0]?.type}`)
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
            throw new Error(`Argument must be of type string, found ${args[0]?.type}`)
        }

        const value = String.fromCodePoint(Number(args[0].value))
        return new PseudoString(value) 
    }

}