import { BinaryOperationTree, ExprTree, type ArrayTree, type AssignTree, type BreakTree, type ContinueTree, type DotAccessorTree, type ForTree, type FullIdTree, type FunctionCallTree, type FunctionTree, type IfTree, type IndexAccessorTree, type IteratorTree, type KeyValueTree, type ObjectTree, type ProgramTree, type RangeTree, type RepeatUntilTree, type ReturnTree, type StatListTree, UnaryOperationTree, type Visitor, type WhileTree } from "@interactive-pseudo/interpreter";
import { PseudoLexer } from '@interactive-pseudo/parser'

export class TypstVisitor implements Visitor<string> {

    functions: Set<string>
    tabs: number
    tab: string

    constructor(tab: string) {
        this.functions = new Set();
        this.tabs = 0
        this.tab = tab
    }

    private newlineTabs(): string {
        return '\n' + this.tab.repeat(this.tabs)
    }

    visitProgram(program: ProgramTree): string {
        let result = `#import "@preview/algorithmic:1.0.7"\n`
        result += `#import algorithmic: style-algorithm, algorithm-figure\n`
        result += `#show: style-algorithm\n`
        result += `#algorithm-figure(`
        this.tabs++;
        result += this.newlineTabs() + '"Algorithm Name",'
        result += this.newlineTabs() + 'vstroke: .5pt + luma(200),'
        result += this.newlineTabs() + `{`
        this.tabs++;
        result += this.newlineTabs() + `import algorithmic: *`
        const stats = program.children.map(stat => stat.accept(this)).join(this.newlineTabs())
        const functions = this.functions.entries().map(([_, value]) => `let ${value} = Fn.with("${value}")`).toArray().join(this.newlineTabs())
        result += `${this.newlineTabs()}${functions}${this.newlineTabs()}${stats}`
        this.tabs--;
        result += this.newlineTabs() + `}`
        this.tabs--;
        result += `${this.newlineTabs()})`
        return result
    }
    visitAssign(assign: AssignTree): string {
        return `Assign("${assign.id.accept(this)}", [$${assign.expr.accept(this)}$])`
    }
    visitExpr(expr: ExprTree): string {
        if (expr instanceof BinaryOperationTree) {
            return expr.accept(this);
        } else if (expr instanceof UnaryOperationTree) {
            return expr.accept(this);
        }
        throw new Error("Unexpected Tree type")
    }
    visitBinary(expr: BinaryOperationTree): string {
        switch (expr.operator.type) {
            case PseudoLexer.LBRACK:
                return `${expr.left.accept(this)}[${expr.right.accept(this)}]`
            case PseudoLexer.DOT:
                return `${expr.left.accept(this)}.${expr.right.accept(this)}`
            case PseudoLexer.SLASH:
                return `(${expr.left.accept(this)}) ${expr.operator.text} (${expr.right.accept(this)})`
            case PseudoLexer.DIV:
                return `floor(${expr.left.accept(this)} / ${expr.right.accept(this)})`
            default:
                return `${expr.left.accept(this)} ${expr.operator.text} ${expr.right.accept(this)}`
        }
    }
    visitUnary(expr: UnaryOperationTree): string {
        let operand = expr.operand instanceof ExprTree 
            ? expr.operand.accept(this) 
            : expr.operand.type == PseudoLexer.INT || expr.operand.type == PseudoLexer.FLOAT
            ? expr.operand.text 
            : `text("${expr.operand.text}")`
        if (expr.operator) {
            return `${expr.operator.text} ${operand}`
        } else {
            return `${operand}`
        }
    }
    visitStatlist(expr: StatListTree): string {
        this.tabs++;
        let stats = expr.stats.map(stat => stat.accept(this))
        let result = `{${this.newlineTabs()}${stats.join(this.newlineTabs())}`
        this.tabs--;
        result += `${this.newlineTabs()}}`
        return result
    }
    visitWhile(expr: WhileTree): string {
        let result = `While(`;
        this.tabs++;
        result += `${this.newlineTabs()}[$${expr.cond.accept(this)}$],${this.newlineTabs()}${expr.list.accept(this)}`;
        this.tabs--;
        result += `${this.newlineTabs()})`;
        return result;
    }
    visitRepeat(expr: RepeatUntilTree): string {
        throw new Error("Algorithmic does not support repeat until");
    }
    visitIf(expr: IfTree): string {
        this.tabs++;
        const conditions = expr.conditions.map(cond => cond.accept(this))
        const lists = expr.lists.map(list => list.accept(this))
        let ziped = []
        for (let i = 0; i < conditions.length; i++) {
            ziped.push(`$${conditions[i]}$`, `${lists[i]}`)
        }
        if (lists.length > conditions.length) {
            ziped.push(`${lists[lists.length-1]}`)
        }
        let result = `IfElseChain(${this.newlineTabs()}${ziped.join(","+this.newlineTabs())}`
        this.tabs--;
        result += this.newlineTabs() + ')'
        return result
    }
    visitFor(expr: ForTree): string {
        let result = `For(`;
        this.tabs++;
        result += `${expr.cond.accept(this)},${expr.list.accept(this)}`;
        this.tabs--;
        result += `${this.newlineTabs()})`;
        return result;
    }
    visitIterator(expr: IteratorTree): string {
        return `[${expr.id.text} $in ${expr.iterator.accept(this)}$]`
    }
    visitRange(expr: RangeTree): string {
        return `${expr.from.accept(this)}$ ... $${expr.to.accept(this)} `
    }
    visitFunction(expr: FunctionTree): string {
        let result = `Function(`;
        this.tabs++;
        const name = `"${expr.name.text}"`
        result += this.newlineTabs() + `${name},`
        const args = expr.args.map(arg => arg.text.length > 1 ? `text("${arg.text}")` : `$${arg.text}$`).join(", ")
        result += this.newlineTabs() + `(${args}),`
        const body = expr.stats.accept(this)
        result += body
        this.tabs--;
        result += `${this.newlineTabs()})`
        return result
    }
    visitFunctionCall(expr: FunctionCallTree): string {
        this.functions.add(expr.name.text)
        const args = expr.args.map(arg => `#[$${arg.accept(this)}$]`).join(", ")
        return ` $#${expr.name.text}[${args}].join()$ `
    }
    visitArray(expr: ArrayTree): string {
        const values = expr.elements.map(element => `#[$${element.accept(this)}$]`).join(", ")
        return `[${values}]`
    }
    visitFullId(expr: FullIdTree): string {
        const name = expr.name.text
        const accessors = expr.accessors.map(accessor => accessor.accept(this)).join("")
        return `${name}${accessors}`
    }
    visitIndex(expr: IndexAccessorTree): string {
        return `[$${expr.index.accept(this)}$]`
    }
    visitDotName(expr: DotAccessorTree): string {
        return `.${expr.name.text}`
    }
    visitObject(expr: ObjectTree): string {
        const elements = expr.elements.map(element => element.accept(this)).join(",")
        return `{${elements}}`
    }
    visitKeyValue(expr: KeyValueTree): string {
        return `${expr.key.text}: $${expr.value.accept(this)}$`
    }
    visitReturn(expr: ReturnTree): string {
        return `Return[$${expr.value.accept(this)}$]`
    }
    visitBreak(expr: BreakTree): string {
        return `Break()`
    }
    visitContinue(expr: ContinueTree): string {
        return `Continue()`
    }

}