import type Tree from "./Tree";
import type Visitor from "./Visitor";

export default class BreakTree implements Tree {
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitBreak(this);
    }
}
