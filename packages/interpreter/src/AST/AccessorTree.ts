import { CommonToken, Token } from "antlr4";
import type { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type NodeLocation from "./NodeLocations.js";

export abstract class AcessorTree implements Tree {
    abstract accept<T>(visitor: Visitor<T>): T;
}

export class IndexAccessorTree extends AcessorTree {

    index: ExprTree;
    location: NodeLocation;
    token: Token;

    constructor(index: ExprTree, token: Token, location: NodeLocation) {
        super()
        this.index = index;
        this.location = location;
        this.token = token
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIndex(this);
    }

}

export class DotAccessorTree extends AcessorTree {

    name: Token
    location: NodeLocation
    token: Token;

    constructor(name: Token, token: Token, location: NodeLocation) {
        super()
        this.name = name;
        this.location = location;
        this.token = token
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitDotName(this);
    }

}