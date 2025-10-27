import type Tree from "./Tree";
import type Visitor from "./Visitor";

export default class StatListTree implements Tree {

    stats: Tree[]

    constructor(stats: Tree[]) {
        this.stats = stats;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitStatlist(this);
    }
    
}