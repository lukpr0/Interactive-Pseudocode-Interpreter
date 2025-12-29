import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";

export abstract class ExprTree implements Tree {
    public abstract accept<T>(visitor: Visitor<T>): T;
}

export class BinaryOperationTree extends ExprTree implements Tree, InfoTree {
    operator: Token;
    left: ExprTree;
    right: ExprTree;
    infoToken: Token;
    constructor(op: Token, left: ExprTree, right: ExprTree) {
        super();
        this.operator = op;
        this.left = left;
        this.right = right;
        this.infoToken = op;
    }
    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitBinary(this);
    }
}

export class UnaryOperationTree extends ExprTree implements Tree {
    operator: Token | null;
    operand: ExprTree | Token;
    constructor(op: Token | null, operand: ExprTree | Token) {
        super();
        this.operator = op;
        this.operand = operand;
    }
    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitUnary(this);
    }
}

