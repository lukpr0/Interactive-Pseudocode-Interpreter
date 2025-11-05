import type { Token } from "antlr4";
import type { AcessorTree } from "./AccessorTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { ExprTree } from "./ExprTree.js";

export default class FullIdTree extends ExprTree implements Tree {

    name: Token
    accessors: AcessorTree[]

    constructor(name: Token, accessors: AcessorTree[]) {
        super()
        this.name = name;
        this.accessors = accessors;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFullId(this);
    }

}