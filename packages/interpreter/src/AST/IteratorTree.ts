import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type RangeTree from "./RangeTree.js";
import type { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class IteratorTree implements Tree, InfoTree {

    id: Token
    iterator: RangeTree | ExprTree
    location: NodeLocation;

    constructor(id: Token, iterator: RangeTree | ExprTree, location: Token) {
        this.id = id;
        this.iterator = iterator;
        this.location = tokenToNodeLocation(location);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIterator(this);
    }

}

