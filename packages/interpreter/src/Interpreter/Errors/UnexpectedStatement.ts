import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError.js";
import type NodeLocation from "../../AST/NodeLocations.js";

export class UnexpectedStatementError extends PseudoRuntimeError {
    constructor(token: Token, location: NodeLocation) {
        super(`In the current context '${token.text}' is not possible`, location)
    }
}