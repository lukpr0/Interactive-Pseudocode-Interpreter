import { PseudoInteger } from "./Types/index.js";
import type Iterable from "./Iterable.js";
import Type from "./Type.js";

export default class Range implements Iterable<PseudoInteger> {

    type: Type.Iterator = Type.Iterator;

    from: bigint
    to: bigint
    inclusive: boolean
    current: bigint

    constructor(from: bigint, to: bigint, inclusive: boolean) {
        this.from = from;
        this.to = to;
        this.inclusive = inclusive;
        this.current = this.from - 1n;
    }

    hasNext(): boolean {
        if (this.inclusive) {
            return this.current < this.to;
        } else {
            return this.current < this.to - 1n;
        }
    }

    next(): PseudoInteger {
        this.current += 1n;
        return new PseudoInteger(this.current);
    }

    toString(): string {
        return `${this.from} .. ${this.to}`
    }

    toDebugString(): string {
        return `Range { ${this.from} .. ${this.to} }`
    }


    asKey(): string {
        throw new Error("Method not implemented.")
    }

}