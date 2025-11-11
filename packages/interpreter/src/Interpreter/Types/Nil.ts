import Type from "../Type.js";
import type { Value } from "../Value.js";
import Boolean from "./Boolean.js";

export default class Object {

    type: Type.Nil = Type.Nil

    constructor() {}
    
    toString(): string {
        return 'nil'; 
    }

    toDebugString(): string {
        return 'nil';
    }

    equals(right: Value): Boolean {
        if (right.type == Type.Nil) {
            return new Boolean(true)
        } else {
            return new Boolean(false)
        }
    }

    notEquals(right: Value): Boolean {
        if (right.type != Type.Nil) {
            return new Boolean(true)
        } else {
            return new Boolean(false)
        }
    }
}