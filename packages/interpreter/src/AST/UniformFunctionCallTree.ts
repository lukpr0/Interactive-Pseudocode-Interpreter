import { ExprTree } from "./ExprTree";
import type Tree from "./Tree";
import type Visitor from "./Visitor";
import type FunctionCallTree from "./FunctionCallTree";

export default class UniformFunctionCallTree extends ExprTree implements Tree {
    object: ExprTree;
    functionCall: FunctionCallTree;

    constructor(object: ExprTree, functionCall: FunctionCallTree) {
        super();
        this.object = object;
        this.functionCall = functionCall;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitUniformFunctionCall(this);
    }
}