import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type RangeTree from "./RangeTree.js";

export default class IteratorTree implements Tree {

    id: Token
    iterator: RangeTree

    constructor(id: Token, iterator: RangeTree) {
        this.id = id;
        this.iterator = iterator;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIterator(this);
    }

}

