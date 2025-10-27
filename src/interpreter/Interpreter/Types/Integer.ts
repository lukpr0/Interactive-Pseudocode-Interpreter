import Type from "../Type.js";
import Float from "./Float.js";

export default class Integer {
    type: Type.Integer = Type.Integer;
    value: bigint;
    constructor(value: bigint) {
        this.value = value;
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

}