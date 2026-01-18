import Type from "../Type.js";
import { PseudoFloat, PseudoBoolean } from "./index.js";

export default class PseudoInteger {
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

    add(right: PseudoInteger | PseudoFloat): PseudoInteger | PseudoFloat {
        if (right instanceof PseudoInteger) {
            return new PseudoInteger(this.value + right.value);
        } else {
            return new PseudoFloat(Number(this.value) + right.value)
        }
    }
    
    sub(right: PseudoInteger | PseudoFloat): PseudoInteger | PseudoFloat {
        if (right instanceof PseudoInteger) {
            return new PseudoInteger(this.value - right.value);
        } else {
            return new PseudoFloat(Number(this.value) - right.value)
        }
    }

    mult(right: PseudoInteger | PseudoFloat): PseudoInteger | PseudoFloat {
        if (right instanceof PseudoInteger) {
            return new PseudoInteger(this.value * right.value);
        } else {
            return new PseudoFloat(Number(this.value) * right.value)
        }
    }
    
    div(right: PseudoInteger | PseudoFloat): PseudoFloat {
        return new PseudoFloat(Number(this.value) / Number(right.value));
    }

    intDiv(right: PseudoInteger): PseudoInteger {
        return new PseudoInteger(this.value / right.value);
    }

    mod(right: PseudoInteger): PseudoInteger {
        return new PseudoInteger(this.value % right.value);
    }

    less(right: PseudoInteger | PseudoFloat) {
        return new PseudoBoolean(this.value < right.value);
    }

    lessEqual(right: PseudoInteger | PseudoFloat) {
        return new PseudoBoolean(this.value <= right.value);
    }
    
    greater(right: PseudoInteger | PseudoFloat) {
        return new PseudoBoolean(this.value > right.value);
    }

    greaterEqual(right: PseudoInteger | PseudoFloat) {
        return new PseudoBoolean(this.value >= right.value);
    }

    equals(right: PseudoInteger | PseudoFloat) {
        return new PseudoBoolean(this.value == right.value);
    }

    notEqual(right: PseudoInteger | PseudoFloat) {
        return new PseudoBoolean(this.value != right.value);
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.Integer,
            value: this.value.toString()
        });
    }

}