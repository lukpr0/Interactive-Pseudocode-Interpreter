import { Token } from "antlr4";
import type { AssignTree } from "./AssignTree.js";
import { type ExprTree, BinaryOperationTree, UnaryOperationTree } from "./ExprTree.js";
import type { ProgramTree } from "./ProgramTree.js";
import type Visitor from "./Visitor.js";
import type WhileTree from "./WhileTree.js";
import type StatListTree from "./StatListTree.js";
import type RepeatUntilTree from "./RepeatUntil.js";
import type IfTree from "./IfTree.js";
import type ForTree from "./ForTree.js";
import type RangeTree from "./RangeTree.js";
import type IteratorTree from "./IteratorTree.js";
import type FunctionTree from "./FunctionTree.js";
import type FunctionCallTree from "./FunctionCallTree.js";
import type ArrayTree from "./ArrayTree.js";
import type FullIdTree from "./FullIdTree.js";
import type { DotAccessorTree, IndexAccessorTree } from "./AccessorTree.js";
import type KeyValueTree from "./KeyValueTree.js";
import type ObjectTree from "./ObjectTree.js";
import type BreakTree from "./BreakTree.js";
import type ReturnTree from "./ReturnTree.js";

export default class ASTPrinter implements Visitor<string> {

    constructor() {}

    visitProgram(program: ProgramTree): string {
        return `(program ${program.children.map(child => {
            return child.accept(this);
        }).join(" ")})`;
    }
    visitAssign(assign: AssignTree): string {
        return `(:= ${assign.id.accept(this)} ${assign.expr.accept(this)})`
    }
    visitExpr(expr: ExprTree): string {
        if (expr instanceof BinaryOperationTree) {
            return this.visitBinary(expr)
        } else if (expr instanceof UnaryOperationTree) {
            return this.visitUnary(expr)
        } else return "ERROR"
    }
    visitBinary(expr: BinaryOperationTree): string {
        const left = expr.left.accept(this);
        const right = expr.right.accept(this);
        const op = expr.operator.text;
        return `(${op} ${left} ${right})`;
    }
    visitUnary(expr: UnaryOperationTree): string {
        let operand;
        if (expr.operand instanceof Token) {
            operand = expr.operand.text;
        } else {
            operand = expr.operand.accept(this)
        }
        if (expr.operator) {
            return `(${expr.operator.text} ${operand})`
        } else  {
            return operand
        }
    }

    visitStatlist(expr: StatListTree): string {
        const statlist = expr.stats
            .map(stat => stat
                .accept(this))
            .join(" ");
        return `(${statlist})`;
    }

    visitWhile(expr: WhileTree): string {
        const cond = expr.cond.accept(this);
        const list = expr.list.accept(this);
        return `(while ${cond} (${list}))`;
    }

    visitRepeat(expr: RepeatUntilTree): string {
        const cond = expr.cond.accept(this);
        const list = expr.list.accept(this);
        return `(repeat ${cond} (${list}))`;
    }

    visitIf(expr: IfTree): string {
        const alts = []
        for (let i = 0; i < expr.conditions.length; i++) {
            const cond = expr.conditions[i];
            const list = expr.lists[i];
            const condString = cond?.accept(this);
            const listString = list?.accept(this);
            const string = `if ${condString} ${listString}`;
            alts.push(string);
        }

        if (expr.lists.length > expr.conditions.length) {
            const list = expr.lists[expr.lists.length-1]?.accept(this);
            alts.push(list);
        }

        return alts.join(" else ");
    }

    visitFor(expr: ForTree): string {
        const iter = expr.cond.accept(this)
        const list = expr.list.accept(this)
        return `(for ${iter} ${list})`
    }

    visitIterator(expr: IteratorTree): string {
        const id = expr.id;
        const iterated = expr.iterator.accept(this)
        return `(iter ${id.text} ${iterated})`
    }

    visitRange(expr: RangeTree): string {
        return `(range ${expr.from.accept(this)} ${expr.to.accept(this)} ${expr.inclusive ? 'inclusive' : ''})`
    }

    visitFunction(expr: FunctionTree): string {
        const name = expr.name.text;
        const args = expr.args.map(arg => arg.text).join(" ");
        const stats = expr.stats.accept(this);
        return `(function ${name} ${args} ${stats})`
    }

    visitFunctionCall(expr: FunctionCallTree): string {
        const name = expr.name.text;
        const args = expr.args.map(arg => arg.accept(this)).join(" ");
        return `(function ${name} ${args})`
    }

    visitArray(expr: ArrayTree): string {
        const elements = expr.elements.map(element => element.accept(this)).join(" ");
        return `(array ${elements})`
    }

    visitFullId(expr: FullIdTree): string {
        const accessors = expr.accessors.map(accessor => accessor.accept(this)).join(" ")
        return `(fullid ${expr.name.text} ${accessors})`
    }

    visitIndex(expr: IndexAccessorTree): string {
        return `[${expr.index.accept(this)}]`
    }

    visitDotName(expr: DotAccessorTree): string {
        return `.${expr.name.text}`;
    }

    visitKeyValue(expr: KeyValueTree): string {
        return `(key ${expr.key.text} ${expr.value.accept(this)})`
    }

    visitObject(expr: ObjectTree): string {
        const exprs = expr.elements.map(element => element.accept(this)).join(" ");
        return `(object ${exprs})`;
    }

    visitBreak(expr: BreakTree): string {
        return `break`;
    }

    visitReturn(expr: ReturnTree): string {
        return `(return ${expr.value.accept(this)})`;
    }

}