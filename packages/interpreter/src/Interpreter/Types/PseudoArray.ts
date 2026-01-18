import Slot from "../Slot.js";
import Type from "../Type.js";
import type { Value } from "../Value.js";

export default class PseudoArray {
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

    pop(): Value {
        const value = this.value.pop()?.value
        if (value) {
            return value;
        } else {
            throw new Error(`No element in Array`)
        }
    }

    dequeue(): Value {
        const value = this.value.shift()?.value
        if (value) {
            return value;
        } else {
            throw new Error(`No element in Array`)
        }
    }

    asKey(): string {
        return `[${this.value.map(v => v.value.asKey()).join(',')}]`
    }

}



