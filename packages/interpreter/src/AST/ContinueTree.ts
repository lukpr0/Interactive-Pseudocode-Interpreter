import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class ContinueTree implements Tree, InfoTree {

    token: Token;
    location: NodeLocation;

    constructor(token: Token) {
        this.token = token;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitContinue(this);
    }
}