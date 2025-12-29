import type { Token } from "antlr4";
import type { AcessorTree } from "./AccessorTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { ExprTree } from "./ExprTree.js";
import type InfoTree from "./InfoTree.js";

export default class FullIdTree extends ExprTree implements Tree, InfoTree {

    name: Token
    accessors: AcessorTree[]
    infoToken: Token;

    constructor(name: Token, accessors: AcessorTree[], token: Token) {
        super()
        this.name = name;
        this.accessors = accessors;
        this.infoToken = token;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFullId(this);
    }

}