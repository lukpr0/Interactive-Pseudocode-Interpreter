import type { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class RangeTree implements Tree {

    from: ExprTree
    to: ExprTree
    inclusive: boolean

    constructor(from: ExprTree, to: ExprTree, inclusive: boolean) {
        this.from = from;
        this.to = to;
        this.inclusive = inclusive;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitRange(this);
    }

}