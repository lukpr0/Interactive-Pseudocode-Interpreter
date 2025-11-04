import Type from "../Type.js";
import Float from "./Float.js";
import Boolean from "./Boolean.js";

export default class Integer {
    type: Type.Integer = Type.Integer;
    value: bigint;
    constructor(value: bigint) {
        this.value = value;
    }

    toDebugString(): string {
        return `Integer { value: ${this.value} }`
    }
    
    toString(): string {
        return this.value.toString()
    }

    add(right: Integer | Float): Integer | Float {
        if (right instanceof Integer) {
            return new Integer(this.value + right.value);
        } else {
            return new Float(Number(this.value) + right.value)
        }
    }
    
    sub(right: Integer | Float): Integer | Float {
        if (right instanceof Integer) {
            return new Integer(this.value - right.value);
        } else {
            return new Float(Number(this.value) - right.value)
        }
    }

    mult(right: Integer | Float): Integer | Float {
        if (right instanceof Integer) {
            return new Integer(this.value * right.value);
        } else {
            return new Float(Number(this.value) * right.value)
        }
    }
    
    div(right: Integer | Float): Float {
        return new Float(Number(this.value) / Number(right.value));
    }

    intDiv(right: Integer): Integer {
        return new Integer(this.value / right.value);
    }

    mod(right: Integer): Integer {
        return new Integer(this.value % right.value);
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