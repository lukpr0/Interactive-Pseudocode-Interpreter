import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type { ExprTree } from "./ExprTree.js";
import type Visitor from "./Visitor.js";

export default class FunctionCallTree implements Tree {
    name: Token
    args: ExprTree[]

    constructor(name: Token, args: ExprTree[]) {
        this.name = name;
        this.args = args;
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFunctionCall(this);
    }


}