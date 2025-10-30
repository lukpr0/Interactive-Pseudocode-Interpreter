import Type from "../Type.js";
import type { Value } from "../Value.js";

export default class Array {
    type: Type.Array = Type.Array
    elements: Value[]
    constructor () {
        this.elements = []
    }

    get(index: number): Value {
        const element = this.elements[index];
        if (element) {
            return element;
        } else {
            throw new Error(`No element with index ${index}`);
        }
    }

    set(index: number, value: Value) {
        const element = this.elements[index];
        if (element) {
            this.elements[index] = value;
        } else {
            throw new Error(`No element with index ${index}`);
        }
    }

    push(value: Value) {
        this.elements.push(value);
    }
}



