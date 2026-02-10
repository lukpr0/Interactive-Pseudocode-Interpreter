import { BuiltInTypeError } from "../Errors";
import Type from "../Type";
import { PseudoArray, PseudoDict } from "../Types";
import type { Value } from "../Value";
import BuiltInFunction from "./BuiltInFunction";

export class DictConstructor extends BuiltInFunction {
    constructor() {
        super(0, 'Dict')
    }

    eval(): Value {
        const dict = new PseudoDict()
        return dict;
    }
}

export class DictKeys extends BuiltInFunction {
    constructor() {
        super(1, 'keys')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Dict) {
            throw new BuiltInTypeError([Type.Integer, Type.Float], args[0]!.type)
        }
        const keys = new PseudoArray()
        const dict = args[0]
        for (const key of dict.keys.values()) {
            keys.push(key.value)
        }
        return keys;
    }
}

export class DictValues extends BuiltInFunction {
    constructor() {
        super(1, 'values')
    }

    eval(args: Value[]): Value {
        if (args[0]?.type != Type.Dict) {
            throw new BuiltInTypeError([Type.Integer, Type.Float], args[0]!.type)
        }
        const keys = new PseudoArray()
        const dict = args[0]
        for (const key of dict.values.values()) {
            keys.push(key.value)
        }
        return keys;
    }
}