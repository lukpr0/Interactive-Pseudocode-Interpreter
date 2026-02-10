import Slot from "../Slot.js";
import Type from "../Type.js";
import type { Value } from "../Value.js";

export default class PseudoObject {

    type: Type.Object = Type.Object
    values: Map<string, Slot>

    constructor() {
        this.values = new Map();
    }
    
    toString(): string {
        return this.values.toString()
    }

    toDebugString(): string {
        return `Object { value: ${this.values} }`
    }
    
    get(index: string): Slot{
        const element = this.values.get(index);
        if (element) {
            return element;
        } else {
            throw new Error(`No element with key ${index}`);
        }
    }

    set(index: string, value: Value) {
        this.values.set(index, new Slot(value));
    }

    hasKey(index: string): boolean {
        return this.values.has(index);
    }
    
    asKey(): string {
        return JSON.stringify({
            type: Type.Object,
            value: this.values.entries().map(([key, value]) => `${key}:${value.value.asKey()}`)
        })
    }

}