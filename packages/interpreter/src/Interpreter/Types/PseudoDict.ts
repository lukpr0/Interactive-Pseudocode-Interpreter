import Slot from "../Slot.js";
import Type, { toSimpleString } from "../Type.js";
import type { Value } from "../Value.js";

export default class PseudoDict {

    type: Type.Dict = Type.Dict
    values: Map<string, Slot>
    keys: Map<string, Slot>

    constructor() {
        this.values = new Map();
        this.keys = new Map();
    }
    
    toString(): string {
        return `[${this.values.keys().map(key => {
            const keyObj = this.keys.get(key)!.value;
            const value = this.values.get(key)!.value;
            const keyStr = toSimpleString(keyObj);
            const valueStr = toSimpleString(value);
            return `${keyStr}: ${valueStr}`;
        }).toArray()
        .join(", ")}]`
    }

    toDebugString(): string {
        return `Dict { value: ${this.values} }`
    }
    
    get(index: Value): Slot{
        const key = index.asKey();
        const element = this.values.get(key);
        if (element) {
            return element;
        } else {
            throw new Error(`No element with key ${index}`);
        }
    }

    add(index: Value, value: Value) {
        const key = index.asKey();
        this.values.set(key, new Slot(value));
        this.keys.set(key, new Slot(value));
    }

    hasKey(index: string): boolean {
        return this.values.has(index);
    }
    
    asKey(): string {
        return JSON.stringify({
            type: Type.Set,
            value: this.values.keys().toArray().sort(),
            keys: this.keys.keys().toArray().sort()
        });
    }

}