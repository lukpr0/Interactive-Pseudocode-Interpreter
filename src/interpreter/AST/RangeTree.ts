import type { ExprTree } from "./ExprTree";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

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