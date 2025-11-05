import type { Value } from './Value.js';

export default class Slot {
    value: Value

    constructor(value: Value) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString()
    }
}