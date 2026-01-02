import type { Token } from "antlr4";
import type InfoTree from "./InfoTree.js";
import type IteratorTree from "./IteratorTree.js";
import type StatListTree from "./StatListTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class ForTree implements Tree, InfoTree {
    cond: IteratorTree 
    list: StatListTree
    location: NodeLocation;

    constructor(cond: IteratorTree, list: StatListTree, token: Token) {
        this.cond = cond;
        this.list = list;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFor(this);
    }
}