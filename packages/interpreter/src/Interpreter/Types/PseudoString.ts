import Type from "../Type.js";
import type PseudoFloat from "./PseudoFloat.js";
import type PseudoInteger from "./PseudoInteger.js";
import PseudoBoolean from "./PseudoBoolean.js";
import type PseudoArray from "./PseudoArray.js";
import type PseudoObject from "./PseudoObject.js";
import type PseudoDict from "./PseudoDict.js";
import type PseudoSet from "./PseudoSet.js";
import type PseudoTuple from "./PseudoTuple.js";

export default class PseudoString {
    type: Type.String = Type.String;
    value: string;
    constructor(value: string) {
        this.value = value;
    }

    toDebugString(): string {
        return `Integer { value: ${this.value} }`
    }
    
    toString(): string {
        return this.value;
    }

    add(right: PseudoInteger | PseudoFloat | PseudoString | PseudoBoolean | PseudoArray | PseudoObject | PseudoSet | PseudoDict | PseudoTuple ): PseudoString {
        return new PseudoString(this.value + right.toString());
    }
    
    get(right: number): PseudoString {
        let char = this.value.at(right)
        if (char) {
            return new PseudoString(char);
        }
        throw new Error(`index ${right} out of bound for ${this.value}`);
    }

    equals(right: PseudoString): PseudoBoolean {
        return new PseudoBoolean(this.value == right.value);
    }
    
    notEqual(right: PseudoString): PseudoBoolean {
        return new PseudoBoolean(this.value != right.value);
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.String,
            value: this.value
        });
    }
}