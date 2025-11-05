import type { Token } from "antlr4";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

export abstract class ExprTree implements Tree {
    public abstract accept<T>(visitor: Visitor<T>): T;
}

export class BinaryOperationTree extends ExprTree implements Tree {
    operator: Token;
    left: ExprTree;
    right: ExprTree;
    constructor(op: Token, left: ExprTree, right: ExprTree) {
        super();
        this.operator = op;
        this.left = left;
        this.right = right;
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

