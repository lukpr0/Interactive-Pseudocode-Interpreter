import Slot from "../Slot.js"
import Type, { asKey, toSimpleString } from "../Type.js"
import type { Value } from "../Value.js"
import PseudoBoolean from "./PseudoBoolean.js"

export default class PseudoSet {
    type: Type.Set = Type.Set
    values: Map<string, Slot> 
    constructor () {
        this.values = new Map();
    }

    toString(): string {
        return toSimpleString(this);
    }

    toDebugString(): string {
        return `Set { value: ${this.values.keys().toArray().join(', ')} }`
    }

    insert(value: Value) {
        this.values.set(value.asKey() , new Slot(value));
    }

    contains(value: Value): PseudoBoolean {
        const contains = this.values.has(value.asKey());
        return new PseudoBoolean(contains);
    }

    intersect(other: PseudoSet): PseudoSet {
        const intersection = new PseudoSet();
        for (let [key, slot] of this.values.entries()) {
            if (other.contains(slot.value).value) {
                intersection.insert(slot.value)
            }
        }
        return intersection;
    }
    
    union(other: PseudoSet): PseudoSet {
        const union = new PseudoSet();
        for (let [key, slot] of this.values.entries()) {
            union.insert(slot.value)
        }
        for (let [key, slot] of other.values.entries()) {
            union.insert(slot.value)
        }
        return union;
    }
    
    difference(other: PseudoSet): PseudoSet {
        const difference = new PseudoSet();
        for (let [key, slot] of this.values.entries()) {
            if (!other.contains(slot.value).value) {
                difference.insert(slot.value)
            }
        }
        return difference;
    }

    asKey(): string {
        return asKey(this);
    }

}
