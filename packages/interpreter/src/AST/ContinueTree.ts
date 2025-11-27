import type Tree from "./Tree.js";
import type Visitor from "./Visitor.js";

export default class ContinueTree implements Tree {
    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitContinue(this);
    }
}