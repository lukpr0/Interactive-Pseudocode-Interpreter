import type { Token } from "antlr4"
import type NodeLocation from "../../AST/NodeLocations";

export class PseudoRuntimeError extends Error {
    location: NodeLocation 
    constructor(message: string, location: NodeLocation) {
        super(`${message} at line ${location.line}:${location.column}`);
        this.location = location;
        this.name = 'PseudoRuntimeError';
        Object.setPrototypeOf(this, new.target.prototype)
    }
}