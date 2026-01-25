import Slot from "../Slot.js";
import Type from "../Type.js";

export default class PseudoTuple {
    type: Type.Tuple = Type.Tuple;
    value: Slot[]
    constructor () {
        this.value = []
    }

    toString(): string {
        return `(${this.value.map(slot => {
            switch (slot.value.type) {
                case Type.Array:
                    return "Array"
                case Type.Object:
                    return "Object"
                default:
                    return slot.value.toString()
            }
        }).join(", ")})`
    }

    toDebugString(): string {
        return `Tuple { value: ${this.value} }`
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.Tuple,
            value: this.value.map(v => v.value.asKey())
        }) 
    }

}
