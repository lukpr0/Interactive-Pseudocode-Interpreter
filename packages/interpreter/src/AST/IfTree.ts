import type { Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class IfTree implements Tree, InfoTree {

    conditions: ExprTree[]
    lists: StatListTree[]
    infoToken: Token;

    constructor(conditions: ExprTree[], lists: StatListTree[], token: Token) {
        this.conditions = conditions;
        this.lists = lists;
        this.infoToken = token
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIf(this);
    }

}