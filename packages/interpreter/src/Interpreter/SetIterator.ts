import type Iterable from "./Iterable.js";
import type Slot from "./Slot.js";
import Type from "./Type.js";
import type PseudoSet from "./Types/PseudoSet.js";
import type { Value } from "./Value.js";

export default class SetIterator implements Iterable<Value> {

    type: Type.Iterator = Type.Iterator;
    
    set: PseudoSet;
    array: Slot[];
    index: number;


    constructor(set: PseudoSet) {
        this.set = set;
        this.array = set.values.values().toArray();
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.array.length;
    }

    next(): Value {
        const value = this.array[this.index]!.value;
        this.index += 1;
        return value;
    }

    toString(): string {
        return this.set.toString()
    }

    toDebugString(): string {
        return `Iterator { ${this.set.toDebugString()} }`
    }


    asKey(): string {
        throw new Error("Method not implemented.")
    }

}