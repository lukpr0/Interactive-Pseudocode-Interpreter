import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { ExprTree } from "./ExprTree.js";
import type KeyValueTree from "./KeyValueTree.js";
import type InfoTree from "./InfoTree.js";
import type { Token } from "antlr4";
import { tokenToNodeLocation } from "./NodeLocations.js";
import type NodeLocation from "./NodeLocations.js";

export default class ObjectTree extends ExprTree implements Tree, InfoTree {

    elements: KeyValueTree[]
    location: NodeLocation;

    constructor(elements: KeyValueTree[], token: Token) {
        super();
        this.elements = elements;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitObject(this);
    }

}