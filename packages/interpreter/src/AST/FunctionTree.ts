import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import StatListTree from "./StatListTree.js";
import type InfoTree from "./InfoTree.js";
import type NodeLocation from "./NodeLocations.js";
import { tokenToNodeLocation } from "./NodeLocations.js";

export default class FunctionTree implements Tree, InfoTree {

    name: Token
    args: Token[]
    stats: StatListTree
    location: NodeLocation;

    constructor(name: Token, args: Token[], stats: StatListTree, token: Token) {
        this.name = name;
        this.args = args;
        this.stats = stats 
        this.location = tokenToNodeLocation(token);
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFunction(this);
    }

}