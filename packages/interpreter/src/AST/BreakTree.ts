import type { Token } from "antlr4";
import type InfoTree from "./InfoTree.js";
import type NodeLocation from "./NodeLocations.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class BreakTree implements Tree, InfoTree {

    token: Token;
    location: NodeLocation;

    constructor(token: Token) {
        this.token = token;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitBreak(this);
    }
}
