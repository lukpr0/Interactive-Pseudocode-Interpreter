import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import type { ExprTree } from "./ExprTree.js";

export default class DictPairTree implements Tree {
    key: ExprTree 
    value: ExprTree

    constructor(key: ExprTree, value: ExprTree) {
        this.key = key;
        this.value = value;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitDictPair(this);
    }

}