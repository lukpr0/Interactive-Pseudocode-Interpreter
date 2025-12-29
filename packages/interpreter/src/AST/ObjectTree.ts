import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { ExprTree } from "./ExprTree.js";
import type KeyValueTree from "./KeyValueTree.js";
import type InfoTree from "./InfoTree.js";
import type { Token } from "antlr4";

export default class ObjectTree extends ExprTree implements Tree, InfoTree {

    elements: KeyValueTree[]
    infoToken: Token;

    constructor(elements: KeyValueTree[], token: Token) {
        super();
        this.elements = elements;
        this.infoToken = token;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitObject(this);
    }

}