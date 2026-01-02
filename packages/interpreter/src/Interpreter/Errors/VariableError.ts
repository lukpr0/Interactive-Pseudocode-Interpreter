import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";
import type NodeLocation from "../../AST/NodeLocations.js";

export class VariableError extends PseudoRuntimeError {
    constructor(token: Token, location: NodeLocation) {
        super(`Variable ${token.text} does not exist`, location)
        this.name = "VariableError";
    }
}