import Slot from "../Slot.js";
import Type, { toSimpleString } from "../Type.js";
import type { Value } from "../Value.js";
import PseudoNil from "./PseudoNil.js";

export default class PseudoDict {

    type: Type.Dict = Type.Dict
    values: Map<string, Slot>
    keys: Map<string, Slot>

    constructor() {
        this.values = new Map();
        this.keys = new Map();
    }
    
    toString(): string {
        return `[${this.values.keys()
            .map(key => {
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
    
    getSlot(index: Value): Slot {
        const key = index.asKey();
        if (!this.hasKey(key)) {
            this.add(index, new PseudoNil())
        }
        const element = this.values.get(key)!;
        return element;
    }
    
    get(index: Value): Value {
        const key = index.asKey();
        const element = this.values.get(key);
        if (!element) {
            return new PseudoNil();
        }
        return element.value;
    }

    add(index: Value, value: Value) {
        const key = index.asKey();
        this.keys.set(key, new Slot(index));
        this.values.set(key, new Slot(value));
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