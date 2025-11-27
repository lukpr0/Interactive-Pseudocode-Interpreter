import Type from "../Type.js";
import { PseudoInteger, PseudoBoolean } from "./index.js";

export default class PseudoFloat {
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
    
    add(right: PseudoInteger | PseudoFloat): PseudoInteger | PseudoFloat {
        return new PseudoFloat(this.value + Number(right.value));
    }
    
    sub(right: PseudoInteger | PseudoFloat): PseudoInteger | PseudoFloat {
        return new PseudoFloat(this.value - Number(right.value))
    }

    mult(right: PseudoInteger | PseudoFloat): PseudoInteger | PseudoFloat {
        return new PseudoFloat(this.value * Number(right.value))
    }
    
    div(right: PseudoInteger | PseudoFloat): PseudoFloat {
        return new PseudoFloat(this.value / Number(right.value));
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

}