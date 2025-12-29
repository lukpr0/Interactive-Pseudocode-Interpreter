import type { Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class RepeatUntilTree implements Tree, InfoTree {

    cond: ExprTree;
    list: StatListTree;
    infoToken: Token;

    constructor(cond: ExprTree, list: StatListTree, token: Token) {
        this.cond = cond;
        this.list = list;
        this.infoToken = token;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitRepeat(this);
    }

}