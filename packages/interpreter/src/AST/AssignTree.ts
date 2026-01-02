import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type { ExprTree } from "./ExprTree.js";
import type FullIdTree from "./FullIdTree.js";
import type InfoTree from "./InfoTree.js";
import type { Token } from "antlr4";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";



export default class AssignTree implements Tree, InfoTree {
    id: FullIdTree;
    expr: ExprTree;
    location: NodeLocation;
    constructor(id: FullIdTree, expr: ExprTree, token: Token) {
        this.id = id;
        this.expr = expr;
        this.location = tokenToNodeLocation(token);
    }

    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitAssign(this);
    }
}
