import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";
import type NodeLocation from "../../AST/NodeLocations.js";

export class InternalError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "InternalError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class LocatedInternalError extends PseudoRuntimeError {
    constructor(message: string, location: NodeLocation) {
        super(message, location)
        this.name = "InternalError";
    }
}