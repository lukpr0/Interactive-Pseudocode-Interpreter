import Type from "../Type.js";
import type { Value } from "../Value.js";
import { PseudoBoolean } from "./index.js";

export default class PseudoNil {

    type: Type.Nil = Type.Nil

    constructor() {}
    
    toString(): string {
        return 'nil'; 
    }

    toDebugString(): string {
        return 'nil';
    }

    equals(right: Value): PseudoBoolean {
        if (right.type == Type.Nil) {
            return new PseudoBoolean(true)
        } else {
            return new PseudoBoolean(false)
        }
    }

    notEquals(right: Value): PseudoBoolean {
        if (right.type != Type.Nil) {
            return new PseudoBoolean(true)
        } else {
            return new PseudoBoolean(false)
        }
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.Nil,
        });
    }
}