import type LexprPartTree from "./LexprPartTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class LexprTree implements Tree {

    parts: LexprPartTree[]

    constructor(parts: LexprPartTree[]) {
        this.parts = parts;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitLexpr(this);
    }

}