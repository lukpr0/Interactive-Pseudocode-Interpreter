import Integer from "./Types/Integer.js";
import type { Iterable } from "./Iterable.js";
import Type from "./Type.js";

export default class Range implements Iterable<Integer> {

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

    next(): Integer {
        this.current += 1n;
        return new Integer(this.current);
    }

}