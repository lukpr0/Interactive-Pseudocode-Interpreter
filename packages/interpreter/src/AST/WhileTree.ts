import { ExprTree } from "./ExprTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class WhileTree implements Tree {

    cond: ExprTree;
    list: StatListTree;

    constructor(cond: ExprTree, list: StatListTree) {
        this.cond = cond;
        this.list = list
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitWhile(this);
    }
}