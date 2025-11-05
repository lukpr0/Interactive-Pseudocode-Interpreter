import type { ExprTree } from "./ExprTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class IfTree implements Tree {

    conditions: ExprTree[]
    lists: StatListTree[]

    constructor(conditions: ExprTree[], lists: StatListTree[]) {
        this.conditions = conditions;
        this.lists = lists;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIf(this);
    }

}