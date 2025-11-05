import type IteratorTree from "./IteratorTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class ForTree implements Tree {
    cond: IteratorTree 
    list: StatListTree

    constructor(cond: IteratorTree, list: StatListTree) {
        this.cond = cond;
        this.list = list;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFor(this);
    }
}