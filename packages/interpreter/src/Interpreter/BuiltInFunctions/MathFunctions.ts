import Type from "../Type.js"
import { PseudoFloat, PseudoInteger} from "../Types/index.js"
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
        return new PseudoInteger(BigInt(value));
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
        return new PseudoInteger(BigInt(value));
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
        return new PseudoFloat(value);
    }
}

export class PowFunction extends BuiltInFunction {
    constructor() {
        super(2, 'pow')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Integer && args[0]?.type != Type.Float) {
            throw new Error(`Argument must be of type integer or float, found ${args[0]?.type}`)
        }
        if (args[1]?.type != Type.Integer && args[1]?.type != Type.Float) {
            throw new Error(`Argument must be of type integer or float, found ${args[1]?.type}`)
        }
        if (args[0].type == Type.Integer && args[1].type == Type.Integer) {
            return new PseudoInteger(BigInt(args[0].value ** args[1].value))
        }
        return new PseudoFloat(Number(args[0].value) ** Number(args[1].value))
    }
}