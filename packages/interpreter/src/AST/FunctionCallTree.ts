import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import { ExprTree } from "./ExprTree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";
import { tokenToNodeLocation } from "./NodeLocations.js";
import type NodeLocation from "./NodeLocations.js";

export default class FunctionCallTree extends ExprTree implements Tree, InfoTree {
    name: Token
    args: ExprTree[]
    location: NodeLocation;

    constructor(name: Token, args: ExprTree[], token: Token) {
        super()
        this.name = name;
        this.args = args;
        this.location = tokenToNodeLocation(token);
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFunctionCall(this);
    }


}