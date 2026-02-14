import type Iterable from "./Iterable.js";
import Type from "./Type.js";
import type PseudoDict from "./Types/PseudoDict.js";
import PseudoTuple from "./Types/PseudoTuple.js";
import type { Value } from "./Value.js";

export default class DictIterator implements Iterable<Value> {

    type: Type.Iterator = Type.Iterator;
    
    dict: PseudoDict;
    array: string[];
    index: number;


    constructor(dict: PseudoDict) {
        this.dict = dict;
        this.array = dict.keys.keys().toArray();
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.array.length;
    }

    next(): Value {
        const keyStr = this.array[this.index]!;
        const key = this.dict.keys.get(keyStr)!;
        const value = this.dict.values.get(keyStr)!;
        const tuple = new PseudoTuple()
        tuple.value.push(key)
        tuple.value.push(value)
        this.index += 1;
        return tuple;
    }

    toString(): string {
        return this.dict.toString()
    }

    toDebugString(): string {
        return `Iterator { ${this.dict.toDebugString()} }`
    }


    asKey(): string {
        throw new Error("Method not implemented.")
    }

}