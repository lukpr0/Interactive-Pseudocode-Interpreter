import Slot from "../Slot.js";
import Type, { asKey, toSimpleString } from "../Type.js";

export default class PseudoTuple {
    type: Type.Tuple = Type.Tuple;
    value: Slot[]
    constructor () {
        this.value = []
    }

    toString(): string {
        return toSimpleString(this);
    }

    toDebugString(): string {
        return `Tuple { value: ${this.value} }`
    }

    asKey(): string {
        return asKey(this);
    }

}
