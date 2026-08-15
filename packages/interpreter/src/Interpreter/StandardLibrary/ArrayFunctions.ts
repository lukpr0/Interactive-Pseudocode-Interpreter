import Type from "../Type.js";
import type { Value } from "../Value.js";
import BuiltInFunction from "./BuiltInFunction.js";
import { PseudoArray, PseudoInteger, PseudoNil } from '../Types/index.js'
import { BuiltInTypeError } from "../Errors/BuiltInTypeError.js";
import { InternalError } from "../Errors/InternalError.js";

export class ArrayConstructor extends BuiltInFunction {

    constructor() {
        super(2, 'Array')
    }

    eval(args: Value[]): Value {
        const array = new PseudoArray()
        if (args[0]?.type != Type.Integer) {
            throw new BuiltInTypeError([Type.Integer], args[0]!.type)
        }
        for (let i = 0; i < args[0]!.value; i++) {
            array.push(args[1]!)
        }
        return array;
    }

}

export class LengthFunction extends BuiltInFunction {

    constructor() {
        super(1, 'len')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type == Type.Array || args[0]?.type == Type.String) {
            return new PseudoInteger(BigInt(args[0].value.length))
        } else if (args[0]?.type == Type.Set) {
            return new PseudoInteger(BigInt(args[0].values.size))
        } else if (args[0]?.type == Type.Dict) {
            return new PseudoInteger(BigInt(args[0].values.size))
        }
            throw new BuiltInTypeError([Type.Array, Type.String], args[0]!.type)
    }

}

export class PushFunction extends BuiltInFunction {
    constructor() {
        super(2, 'push')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Array) {
            throw new BuiltInTypeError([Type.Array], args[0]!.type)
        }
        if (args[1] === undefined) {
            throw new InternalError(`No value to push found`)
        }
        args[0].push(args[1])
        return new PseudoNil()
    }
}

export class PopFunction extends BuiltInFunction {
    constructor() {
        super(1, 'pop')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Array) {
            throw new BuiltInTypeError([Type.Array], args[0]!.type)
        }
        return args[0].pop()
    }
}

export class DequeueFunction extends BuiltInFunction {
    constructor() {
        super(1, 'dequeue');
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Array) {
            throw new BuiltInTypeError([Type.Array], args[0]!.type)
        }
        return args[0].dequeue()
    }
}