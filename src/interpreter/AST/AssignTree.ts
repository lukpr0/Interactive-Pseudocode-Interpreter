import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type { ExprTree } from "./ExprTree.js";



export class AssignTree implements Tree {
    id: Token;
    expr: ExprTree;
    constructor(id: Token, expr: ExprTree) {
        this.id = id;
        this.expr = expr;
    }

    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitAssign(this);
    }
}
