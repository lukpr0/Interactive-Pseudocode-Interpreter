import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import { ExprTree } from "./ExprTree.js";
import type Visitor from "./Visitor.js";

export default class FunctionCallTree extends ExprTree implements Tree {
    name: Token
    args: ExprTree[]

    constructor(name: Token, args: ExprTree[]) {
        super()
        this.name = name;
        this.args = args;
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFunctionCall(this);
    }


}