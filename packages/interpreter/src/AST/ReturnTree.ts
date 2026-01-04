import type { Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class ReturnTree implements Tree, InfoTree {
    value: ExprTree | null;
    token: Token
    location: NodeLocation;

    constructor(value: ExprTree | null, token: Token) {
        this.value = value;
        this.token = token;
        this.location = tokenToNodeLocation(token);
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitReturn(this);
    }
}