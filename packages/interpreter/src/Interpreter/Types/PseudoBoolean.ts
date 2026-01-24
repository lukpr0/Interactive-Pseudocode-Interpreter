import Type from "../Type.js";

export default class PseudoBoolean {
    type: Type.Boolean = Type.Boolean;
    value: boolean;
    constructor (value: boolean) {
        this.value = value;
    }
    
    toString(): string {
        return this.value.toString()
    }

    toDebugString(): string {
        return `Boolean { value: ${this.value} }`
    }
    
    and(right: PseudoBoolean): PseudoBoolean {
        return new PseudoBoolean(this.value && right.value)
    }
    
    or(right: PseudoBoolean): PseudoBoolean {
        return new PseudoBoolean(this.value || right.value)
    }

    equals(right: PseudoBoolean): PseudoBoolean {
        return new PseudoBoolean(this.value == right.value)
    }
    
    notEqual(right: PseudoBoolean): PseudoBoolean {
        return new PseudoBoolean(this.value == right.value)
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.Boolean,
            value: this.value
        });
    }
}