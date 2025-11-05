import Slot from "../Slot.js";
import Type from "../Type.js";
import type { Value } from "../Value.js";

export default class Array {
    type: Type.Array = Type.Array
    value: Slot[]
    constructor () {
        this.value = []
    }

    toString(): string {
        return `[${this.value.map(slot => {
            switch (slot.value.type) {
                case Type.Array:
                    return "Array"
                case Type.Object:
                    return "Object"
                default:
                    return slot.value.toString()
            }
        }).join(", ")}]`
    }

    toDebugString(): string {
        return `Array { value: ${this.value} }`
    }

    get(index: number): Value{
        const element = this.value[index];
        if (element) {
            return element.value;
        } else {
            throw new Error(`No element with index ${index}`);
        }
    }

    getSlot(index: number): Slot {
        const element = this.value[index];
        if (element) {
            return element;
        } else {
            throw new Error(`No element with index ${index}`);
        }
    }

    set(index: number, value: Value) {
        const element = this.value[index];
        if (element) {
            this.value[index] = new Slot(value);
        } else {
            throw new Error(`No element with index ${index}`);
        }
    }

    push(value: Value) {
        this.value.push(new Slot(value));
    }
}



