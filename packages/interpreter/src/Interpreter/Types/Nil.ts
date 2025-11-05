import Type from "../Type.js";

export default class Object {

    type: Type.Nil = Type.Nil

    constructor() {}
    
    toString(): string {
        return 'nil'; 
    }

    toDebugString(): string {
        return 'nil';
    }

}