import type { AssignTree } from "./AssignTree.js";
import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export class ProgramTree implements Tree {
    children: Tree[];
    constructor() {
        this.children = [];
    }

    public accept<T>(visitor: Visitor<T>): T {
        return visitor.visitProgram(this);
    }

    public addChild(tree: Tree) {
        this.children.push(tree)
    }

}