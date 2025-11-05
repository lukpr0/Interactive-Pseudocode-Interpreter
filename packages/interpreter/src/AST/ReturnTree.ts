import type { ExprTree } from "./ExprTree";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

export default class ReturnTree implements Tree {
    value: ExprTree

    constructor(value: ExprTree) {
        this.value = value;
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitReturn(this);
    }
}