import type { Token } from "antlr4";

export default interface NodeLocation {
    line: number;
    column: number;
    from: number;
    to: number;
}

export function tokenToNodeLocation(token: Token): NodeLocation {
    return {
        line: token.line,
        column: token.column,
        from: token.start,
        to: token.stop,
    }
}