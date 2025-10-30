import type { ExprTree } from "./ExprTree";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

export abstract class AcessorTree implements Tree {
    abstract accept<T>(visitor: Visitor<T>): T;
}

export class IndexAccessorTree extends AcessorTree {

    index: ExprTree;

    constructor(index: ExprTree) {
        super()
        this.index = index;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIndex(this);
    }

}