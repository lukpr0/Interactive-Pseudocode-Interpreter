
import type Iterable from "./Iterable.js";
import Type from "./Type.js";
import type PseudoArray from "./Types/PseudoArray.js";
import type { Value } from "./Value.js";

export default class ArrayIterator implements Iterable<Value> {

    type: Type.Iterator = Type.Iterator;
    
    array: PseudoArray;
    index: number;


    constructor(array: PseudoArray) {
        this.array = array;
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.array.value.length;
    }

    next(): Value {
        const value = this.array.get(this.index);
        this.index += 1;
        return value;
    }

    toString(): string {
        return this.array.toString()
    }

    toDebugString(): string {
        return `Iterator { ${this.array.toDebugString()} }`
    }


    asKey(): string {
        throw new Error("Method not implemented.")
    }

}