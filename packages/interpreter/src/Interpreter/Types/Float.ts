import Type from "../Type.js";
import Integer from "./Integer.js";
import Boolean from "./Boolean.js";

export default class Float {
    type: Type.Float = Type.Float;
    value: number;
    constructor(value: number) {
        this.value = value
    }
    
    toString(): string {
        return this.value.toString()
    }
    toDebugString(): string {
        return `Float { value: ${this.value} }`
    }
    
    add(right: Integer | Float): Integer | Float {
        return new Float(this.value + Number(right.value));
    }
    
    sub(right: Integer | Float): Integer | Float {
        return new Float(this.value - Number(right.value))
    }

    mult(right: Integer | Float): Integer | Float {
        return new Float(this.value * Number(right.value))
    }
    
    div(right: Integer | Float): Float {
        return new Float(this.value / Number(right.value));
    }
    
    less(right: Integer | Float) {
        return new Boolean(this.value < right.value);
    }

    lessEqual(right: Integer | Float) {
        return new Boolean(this.value <= right.value);
    }
    
    greater(right: Integer | Float) {
        return new Boolean(this.value > right.value);
    }

    greaterEqual(right: Integer | Float) {
        return new Boolean(this.value >= right.value);
    }

    equals(right: Integer | Float) {
        return new Boolean(this.value == right.value);
    }

    notEqual(right: Integer | Float) {
        return new Boolean(this.value != right.value);
    }

}