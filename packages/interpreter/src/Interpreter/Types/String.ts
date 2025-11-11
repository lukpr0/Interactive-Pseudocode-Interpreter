import Type from "../Type.js";
import type Float from "./Float.js";
import type Integer from "./Integer.js";
import Boolean from "./Boolean.js";
import type Array from "./Array.js";
import type Object from "./Object.js";

export default class String {
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

    add(right: Integer | Float | String | Boolean | Array | Object): String {
        return new String(this.value + right.toString());
    }
    
    get(right: number): String {
        let char = this.value.at(right)
        if (char) {
            return new String(char);
        }
        throw new Error(`index ${right} out of bound for ${this.value}`);
    }

    equals(right: String): Boolean {
        return new Boolean(this.value == right.value);
    }
    
    notEqual(right: String): Boolean {
        return new Boolean(this.value != right.value);
    }

}