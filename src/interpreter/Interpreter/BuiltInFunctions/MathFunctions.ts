import Type from "../Type.js"
import Float from "../Types/Float.js"
import Integer from "../Types/Integer.js"
import type { Value } from "../Value.js"
import BuiltInFunction from "./BuiltInFunction.js"

export class FloorFunction extends BuiltInFunction {
    constructor() {
        super(1, 'floor')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Integer && args[0]?.type != Type.Float) {
            throw new Error(`Argument must be of type integer or float, found ${args[0]?.type}`)
        }
        const value = Math.floor(Number(args[0].value));
        return new Integer(BigInt(value));
    }
}

export class CeilFunction extends BuiltInFunction {
    constructor() {
        super(1, 'floor')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Integer && args[0]?.type != Type.Float) {
            throw new Error(`Argument must be of type integer or float, found ${args[0]?.type}`)
        }
        const value = Math.ceil(Number(args[0].value));
        return new Integer(BigInt(value));
    }
}

export class SquarerootFunction extends BuiltInFunction {
    constructor() {
        super(1, 'sqrt')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Integer && args[0]?.type != Type.Float) {
            throw new Error(`Argument must be of type integer or float, found ${args[0]?.type}`)
        }
        const value = Math.sqrt(Number(args[0].value));
        return new Float(value);
    }
}