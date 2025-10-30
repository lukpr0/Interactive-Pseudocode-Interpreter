import { ExprTree } from "./ExprTree.js";
import type Tree from "./Tree";
import type Visitor from "./Visitor";

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