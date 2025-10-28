import type { ExprTree } from "./ExprTree";
import type StatListTree from "./StatListTree";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

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