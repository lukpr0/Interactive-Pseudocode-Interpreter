import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import { ExprTree } from "./ExprTree.js";
import type Visitor from "./Visitor.js";
import type InfoTree from "./InfoTree.js";

export default class FunctionCallTree extends ExprTree implements Tree, InfoTree {
    name: Token
    args: ExprTree[]
    infoToken: Token;

    constructor(name: Token, args: ExprTree[], token: Token) {
        super()
        this.name = name;
        this.args = args;
        this.infoToken = token;
    }
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFunctionCall(this);
    }


}