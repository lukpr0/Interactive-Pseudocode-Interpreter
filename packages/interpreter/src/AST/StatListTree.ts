import type Tree from "./Tree";
import type Visitor from "./Visitor";

export default class StatListTree implements Tree {

    stats: Tree[]
    returnable: boolean;
    functionRoot: boolean;

    constructor(stats: Tree[]) {
        this.stats = stats;
        this.returnable = false;
        this.functionRoot = false;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitStatlist(this);
    }
    
}