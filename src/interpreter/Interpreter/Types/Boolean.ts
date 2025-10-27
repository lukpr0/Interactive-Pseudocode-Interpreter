import Type from "../Type.js";

export default class Boolean {
    type: Type.Boolean = Type.Boolean;
    value: boolean;
    constructor (value: boolean) {
        this.value = value;
    }
    
    and(right: Boolean): Boolean {
        return new Boolean(this.value && right.value)
    }
    
    or(right: Boolean): Boolean {
        return new Boolean(this.value || right.value)
    }

    equals(right: Boolean): Boolean {
        return new Boolean(this.value == right.value)
    }
    
    notEqual(right: Boolean): Boolean {
        return new Boolean(this.value == right.value)
    }

}