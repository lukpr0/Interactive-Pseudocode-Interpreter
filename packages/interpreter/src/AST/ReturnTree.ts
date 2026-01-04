import type { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class ReturnTree implements Tree {
    value: ExprTree | null

    constructor(value: ExprTree | null) {
        this.value = value;
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitReturn(this);
    }
}