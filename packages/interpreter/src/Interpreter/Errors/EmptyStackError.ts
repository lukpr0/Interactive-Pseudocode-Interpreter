import { PseudoRuntimeError } from "./PseudoRuntimeError.js";
import type NodeLocation from "../../AST/NodeLocations.js";

/**
 * This error gets thrown when the interpreter fails to pop elements from the stack.
 * This should only happen due to a bug caused by incorrect parser implementation.
 */
export class EmptyStackError extends PseudoRuntimeError {
    constructor(location: NodeLocation) {
        super("value is unexpectedly undefined", location)
        this.name = "EmptyStackError";
    }
}