import { BinaryOperationTree, ExprTree, type ArrayTree, type AssignTree, type BreakTree, type ContinueTree, type DotAccessorTree, type ForTree, type FullIdTree, type FunctionCallTree, type FunctionTree, type IfTree, type IndexAccessorTree, type IteratorTree, type KeyValueTree, type ObjectTree, type ProgramTree, type RangeTree, type RepeatUntilTree, type ReturnTree, type StatListTree, UnaryOperationTree, type Visitor, type WhileTree } from "@interactive-pseudo/interpreter";
import { PseudoLexer } from '@interactive-pseudo/parser'

export class LatexVisitor implements Visitor<string> {

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
        let result = `\\usepackage{algorithm}\n`
        result += `\\usepackage{algpseudocode}\n`
        result += `\\begin{algorithm}\n`
        result += `\\begin{algorithmic}[1]\n`
        result += '\\caption{Algorithm Name}\\label{labelname}\n'
        result += program.children.map(stat => stat.accept(this)).join('\n')
        result += `\\end{algorithmic}\n`
        result += `\\end{algorithm}`
        return result
    }
    visitAssign(assign: AssignTree): string {
        return `\\State $${assign.id.accept(this)} \\gets ${assign.expr.accept(this)}$`
    }
    visitExpr(expr: ExprTree): string {
        if (expr instanceof BinaryOperationTree) {
            return expr.accept(this);
        } else if (expr instanceof UnaryOperationTree) {
            return expr.accept(this);
        }
        throw new Error("Unexpected Tree type")
    }

    getOperator(operator: number): string {
        switch (operator) {
            case PseudoLexer.LESSTHAN:
                return '<'
            case PseudoLexer.LESSEQUAL:
                return '\\le'
            case PseudoLexer.GREATERTHAN:
                return '>'
            case PseudoLexer.GREATEREQUAL:
                return '\\ge'
            case PseudoLexer.EQUALS:
                return '='
            case PseudoLexer.NOTEQUAL:
                return '\\ne'
            case PseudoLexer.PLUS:
                return '+'
            case PseudoLexer.MINUS:
                return '-'
            case PseudoLexer.STAR:
                return '\\cdot'
            case PseudoLexer.MOD:
                return '\\space mod \\space'
            case PseudoLexer.AND:
                return '\\land'
            case PseudoLexer.OR:
                return '\\lor'
            default:
                return '??'
        }
    }

    visitBinary(expr: BinaryOperationTree): string {
        switch (expr.operator.type) {
            case PseudoLexer.LBRACK:
                return `${expr.left.accept(this)}[${expr.right.accept(this)}]`
            case PseudoLexer.DOT:
                return `${expr.left.accept(this)}.${expr.right.accept(this)}`
            case PseudoLexer.SLASH:
                return `\\frac{${expr.left.accept(this)}}{${expr.right.accept(this)}}`
            case PseudoLexer.DIV:
                return `\\lfloor \\frac{${expr.left.accept(this)}}{${expr.right.accept(this)}} \\rfloor`
            default:
                return `${expr.left.accept(this)} ${this.getOperator(expr.operator.type)} ${expr.right.accept(this)}`
        }
    }
    visitUnary(expr: UnaryOperationTree): string {
        let operand = expr.operand instanceof ExprTree
            ? expr.operand.accept(this) 
            : expr.operand.text
        if (expr.operand instanceof ExprTree) {
            console.log(expr.operand.accept(this))
        }
        if (expr.operator) {
            let operator;
            switch (expr.operator.type) {
                case PseudoLexer.MINUS:
                    operator = '-'
                    break
                case PseudoLexer.NOT:
                    operator = '\\lnot'
                    break
                default:
                    operator = ''
            }
            return `${expr.operator.text} ${operand}`
        } else {
            return `${operand}`
        }
    }
    visitStatlist(expr: StatListTree): string {
        let stats = expr.stats.map(stat => stat instanceof ExprTree ? `\\State ${stat.accept(this)}` : stat.accept(this))
        let result = stats.join('\n')
        return result
    }
    visitWhile(expr: WhileTree): string {
        let result = `\\While{$${expr.cond.accept(this)}$}\n`;
        result += expr.list.accept(this) + '\n';
        result += `\\EndWhile`;
        return result;
    }
    visitRepeat(expr: RepeatUntilTree): string {
        let result = '\\Repeat\n'
        result += expr.list.accept(this) + '\n';
        result += `\\Until{$${expr.cond.accept(this)}$}`
        return result
    }
    visitIf(expr: IfTree): string {
        const conditions = expr.conditions.map(cond => cond.accept(this))
        const lists = expr.lists.map(list => list.accept(this));
        let result = `\\If{$${conditions[0]}$}\n`;
        result += lists[0];

        for (let i = 1; i < conditions.length; i++) {
            result += `\\ElsIf{$${conditions[i]}$}\n`, 
            result += lists[i]
        }
        if (lists.length > conditions.length) {
            result += '\\Else\n';
            result += lists[lists.length-1] + '\n';
        }
        result += '\\EndIf'
        return result
    }
    visitFor(expr: ForTree): string {
        let result = `\\For{${expr.cond.accept(this)}}\n`;
        result += expr.list.accept(this) + '\n';
        result += '\\EndFor'
        return result;
    }
    visitIterator(expr: IteratorTree): string {
        return `${expr.id.text} $\\in ${expr.iterator.accept(this)}$`
    }
    visitRange(expr: RangeTree): string {
        return `${expr.from.accept(this)}$ ... $${expr.to.accept(this)} `
    }
    visitFunction(expr: FunctionTree): string {
        const name = expr.name.text
        const args = expr.args.map(arg => `${arg.text}`).join(", ")
        const body = expr.stats.accept(this)
        let result = `\\Function{${name}}{${args}}\n`;
        result += body + '\n'
        result += '\\EndFunction'
        return result
    }
    visitFunctionCall(expr: FunctionCallTree): string {
        this.functions.add(expr.name.text)
        const args = expr.args.map(arg => `$${arg.accept(this)}$`).join(", ")
        return ` $${expr.name.text}(${args})$ `
    }
    visitArray(expr: ArrayTree): string {
        const values = expr.elements.map(element => `$${element.accept(this)}$`).join(", ")
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
        return `\\{${elements}\\}`
    }
    visitKeyValue(expr: KeyValueTree): string {
        return `${expr.key.text}: ${expr.value.accept(this)}`
    }
    visitReturn(expr: ReturnTree): string {
        return `\\State return $${expr.value.accept(this)}$`
    }
    visitBreak(expr: BreakTree): string {
        return `\\State break`
    }
    visitContinue(expr: ContinueTree): string {
        return `\\State continue`
    }

}