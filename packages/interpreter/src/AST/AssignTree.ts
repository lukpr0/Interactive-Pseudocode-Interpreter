import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type { ExprTree } from "./ExprTree.js";
import type FullIdTree from "./FullIdTree.js";
import type InfoTree from "./InfoTree.js";
import type { Token } from "antlr4";



export default class AssignTree implements Tree, InfoTree {
    id: FullIdTree;
    expr: ExprTree;
    infoToken: Token;
    constructor(id: FullIdTree, expr: ExprTree, token: Token) {
        this.id = id;
        this.expr = expr;
        this.infoToken = token;
    }

    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitAssign(this);
    }
}
