import type { Token } from "antlr4";
import { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";

export default class ArrayTree extends ExprTree implements Tree, InfoTree {
    elements: ExprTree[]
    infoToken: Token;

    constructor(elements: ExprTree[], token: Token) {
        super();
        this.elements = elements;
        this.infoToken = token;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitArray(this);
    }
}