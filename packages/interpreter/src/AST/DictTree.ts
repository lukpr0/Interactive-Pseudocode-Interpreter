import type { Token } from "antlr4";
import { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";
import { tokenToNodeLocation } from "./NodeLocations.js";
import type NodeLocation from "./NodeLocations.js";
import type DictPairTree from "./DictPairTree.js";

export default class DictTree extends ExprTree implements Tree, InfoTree {
    elements: DictPairTree[]
    location: NodeLocation;

    constructor(elements: DictPairTree[], token: Token) {
        super();
        this.elements = elements;
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitDict(this);
    }
}