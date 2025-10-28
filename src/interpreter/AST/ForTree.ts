import type IteratorTree from "./IteratorTree";
import type StatListTree from "./StatListTree";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

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