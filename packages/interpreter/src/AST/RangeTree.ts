import type { Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class RangeTree implements Tree, InfoTree {

    from: ExprTree
    to: ExprTree
    inclusive: boolean
    location: NodeLocation;

    constructor(from: ExprTree, to: ExprTree, inclusive: boolean, token: Token) {
        this.from = from;
        this.to = to;
        this.inclusive = inclusive;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitRange(this);
    }

}