import type { Token } from "antlr4";
import type Tree from "./Tree";
import type Visitor from "./Visitor";
import type RangeTree from "./RangeTree";
import type { Iterable } from "../Interpreter/Iterable";
import type Type from "../Interpreter/Type";
import type { Value } from "../Interpreter/Value";

export default class IteratorTree implements Tree {

    id: Token
    iterator: RangeTree

    constructor(id: Token, iterator: RangeTree) {
        this.id = id;
        this.iterator = iterator;
    }

    accept<T>(visitor: Visitor<T>): T {
        return visitor.visitIterator(this);
    }

}

