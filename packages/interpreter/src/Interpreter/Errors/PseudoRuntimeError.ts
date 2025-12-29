import type { Token } from "antlr4"

export default class PseudoRuntimeError extends Error {
    token: Token
    constructor(message: string, token: Token) {
        super(message);
        this.token = token;
    }
}