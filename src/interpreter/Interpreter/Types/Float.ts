import Type from "../Type.js";
import Integer from "./Integer.js";

export default class Float {
    type: Type.Float = Type.Float;
    value: number;
    constructor(value: number) {
        this.value = value
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

}