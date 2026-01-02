import type { Token } from "antlr4";
import { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { tokenToNodeLocation } from "./NodeLocations.js";
import type NodeLocation from "./NodeLocations.js";

export default class WhileTree implements Tree, InfoTree {

    cond: ExprTree;
    list: StatListTree;
    location: NodeLocation;

    constructor(cond: ExprTree, list: StatListTree, token: Token) {
        this.cond = cond;
        this.list = list
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitWhile(this);
    }
}