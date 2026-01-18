import Slot from "../Slot"
import Type from "../Type"
import type { Value } from "../Value"

export default class PseudoArray {
    type: Type.Set = Type.Set
    value: Map<string, Slot> 
    constructor () {
        this.value = new Map();
    }

    toString(): string {
        return `{${this.value.entries().map(([_, slot]) => {
            switch (slot.value.type) {
                case Type.Array:
                    return "Array"
                case Type.Object:
                    return "Object"
                default:
                    return slot.value.toString()
            }
        })
        .toArray()
        .join(", ")}}`
    }

    toDebugString(): string {
        return `Array { value: ${this.value} }`
    }

    insert(value: Value) {
        this.value.set('' , new Slot(value));
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.Set,
            value: this.value.keys().toArray().sort()
        });
    }

}
