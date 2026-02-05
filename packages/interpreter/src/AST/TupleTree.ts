import type { Token } from "antlr4";
import { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";
import { tokenToNodeLocation } from "./NodeLocations.js";
import type NodeLocation from "./NodeLocations.js";

export default class TupleTree extends ExprTree implements Tree, InfoTree {
    elements: ExprTree[]
    location: NodeLocation;

    constructor(elements: ExprTree[], token: Token) {
        super();
        this.elements = elements;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitTuple(this);
    }
}