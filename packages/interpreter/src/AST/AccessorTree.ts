import type { Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

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

export class DotAccessorTree extends AcessorTree {

    name: Token

    constructor(name: Token) {
        super()
        this.name = name;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitDotName(this);
    }

}