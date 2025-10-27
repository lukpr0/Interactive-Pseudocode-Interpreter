import { ExprTree } from "./ExprTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class WhileTree implements Tree {

    cond: ExprTree;
    children: StatListTree;

    constructor(cond: ExprTree, list: StatListTree) {
        this.cond = cond;
        this.children = list
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitWhile(this);
    }
}