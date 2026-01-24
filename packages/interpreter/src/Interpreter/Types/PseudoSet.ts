import Slot from "../Slot"
import Type from "../Type"
import type { Value } from "../Value"
import PseudoBoolean from "./PseudoBoolean"

export default class PseudoSet {
    type: Type.Set = Type.Set
    value: Map<string, Slot> 
    constructor () {
        this.value = new Map();
    }

    toString(): string {
        return `{${this.value.entries().map(([_, slot]) => {
            switch (slot.value.type) {
                case Type.Array:
                    return "Array"
                case Type.Object:
                    return "Object"
                case Type.Set:
                    return "Set"
                default:
                    return slot.value.toString()
            }
        })
        .toArray()
        .join(", ")}}`
    }

    toDebugString(): string {
        return `Set { value: ${this.value.keys().toArray().join(', ')} }`
    }

    insert(value: Value) {
        this.value.set(value.asKey() , new Slot(value));
    }

    contains(value: Value): PseudoBoolean {
        const contains = this.value.has(value.asKey());
        return new PseudoBoolean(contains);
    }

    intersect(other: PseudoSet): PseudoSet {
        const intersection = new PseudoSet();
        for (let [key, slot] of this.value.entries()) {
            if (other.contains(slot.value).value) {
                intersection.insert(slot.value)
            }
        }
        return intersection;
    }
    
    union(other: PseudoSet): PseudoSet {
        const union = new PseudoSet();
        for (let [key, slot] of this.value.entries()) {
            union.insert(slot.value)
        }
        for (let [key, slot] of other.value.entries()) {
            union.insert(slot.value)
        }
        return union;
    }
    
    difference(other: PseudoSet): PseudoSet {
        const difference = new PseudoSet();
        for (let [key, slot] of this.value.entries()) {
            if (!other.contains(slot.value).value) {
                difference.insert(slot.value)
            }
        }
        return difference;
    }

    asKey(): string {
        return JSON.stringify({
            type: Type.Set,
            value: this.value.keys().toArray().sort()
        });
    }

}
