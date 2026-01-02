import type { Token } from "antlr4";
import type { AcessorTree } from "./AccessorTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class FullIdTree extends ExprTree implements Tree, InfoTree {

    name: Token
    accessors: AcessorTree[]
    location: NodeLocation;

    constructor(name: Token, accessors: AcessorTree[], token: Token) {
        super()
        this.name = name;
        this.accessors = accessors;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFullId(this);
    }

}