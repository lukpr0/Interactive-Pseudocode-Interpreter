import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export class ProgramTree implements Tree {
    children: Tree[];
    constructor(children: Tree[]) {
        this.children = children;
    }

    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitProgram(this);
    }

}