import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import { ExprTree } from "./ExprTree.js";
import type KeyValueTree from "./KeyValueTree.js";

export default class ObjectTree extends ExprTree implements Tree {

    elements: KeyValueTree[]

    constructor(elements: KeyValueTree[]) {
        super();
        this.elements = elements;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitObject(this);
    }

}