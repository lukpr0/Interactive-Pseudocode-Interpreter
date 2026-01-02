import type { Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class RepeatUntilTree implements Tree, InfoTree {

    cond: ExprTree;
    list: StatListTree;
    location: NodeLocation;

    constructor(cond: ExprTree, list: StatListTree, token: Token) {
        this.cond = cond;
        this.list = list;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitRepeat(this);
    }

}