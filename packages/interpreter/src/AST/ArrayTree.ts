import { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class ArrayTree extends ExprTree implements Tree {
    elements: ExprTree[]

    constructor(elements: ExprTree[]) {
        super();
        this.elements = elements;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitArray(this);
    }
}