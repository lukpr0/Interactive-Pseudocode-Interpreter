import type { ExprTree } from "./ExprTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class RepeatUntilTree implements Tree {

    cond: ExprTree;
    list: StatListTree;

    constructor(cond: ExprTree, list: StatListTree) {
        this.cond = cond;
        this.list = list;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitRepeat(this);
    }

}