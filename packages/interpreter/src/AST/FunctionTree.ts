import type { Token } from "antlr4";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";
import StatListTree from "./StatListTree.js";

export default class FunctionTree implements Tree {

    name: Token
    args: Token[]
    stats: StatListTree

    constructor(name: Token, args: Token[], stats: StatListTree) {
        this.name = name;
        this.args = args;
        this.stats = stats 
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitFunction(this);
    }

}