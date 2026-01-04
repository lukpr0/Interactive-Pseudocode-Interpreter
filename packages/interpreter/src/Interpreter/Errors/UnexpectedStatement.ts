import type { Token } from "antlr4";
import { PseudoRuntimeError } from "./PseudoRuntimeError";
import type { NodeLocation } from "../../AST";

export class UnexpectedStatementError extends PseudoRuntimeError {
    constructor(token: Token, location: NodeLocation) {
        super(`In the current context '${token.text}' is not possible`, location)
    }
}