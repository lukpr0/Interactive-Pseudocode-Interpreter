import { BinaryOperationTree, ExprTree, type ArrayTree, type AssignTree, type BreakTree, type ContinueTree, type DotAccessorTree, type ForTree, type FunctionCallTree, type FunctionTree, type IfTree, type IndexAccessorTree, type IteratorTree, type KeyValueTree, type ObjectTree, type ProgramTree, type RangeTree, type RepeatUntilTree, type ReturnTree, type StatListTree, UnaryOperationTree, type Visitor, type WhileTree, SetTree, LexprTree, LexprPartTree, TupleTree } from "@interactive-pseudo/interpreter";
import { PseudoLexer } from '@interactive-pseudo/parser'
import { MarkupGenerationVisitor } from "./markupGenerationVisitor.js";

export class LatexVisitor extends MarkupGenerationVisitor {

    constructor(headers: boolean) {
        super(headers)
    }

    visitProgram(program: ProgramTree): string {
        let result = ''
        if (this.headers) {
            result += `\\usepackage{algorithm}\n`
            result += `\\usepackage{algpseudocode}\n`
        }
        result += `\\begin{algorithm}\n`
        result += `\\begin{algorithmic}[1]\n`
        result += '\\caption{Algorithm Name}\\label{labelname}\n'
        result += program.children.map(stat => stat instanceof ExprTree ? `\\State $${stat.accept(this)}$`: stat.accept(this)).join('\n') + '\n'
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
                return '\\; mod \\;'
            case PseudoLexer.AND:
                return '\\land'
            case PseudoLexer.OR:
                return '\\lor'
            case PseudoLexer.IN:
                return '\\in'
            case PseudoLexer.INTERSECT:
                return '\\cap'
            case PseudoLexer.UNION:
                return '\\cup'
            case PseudoLexer.BACKSLASH:
                return '\\setminus'
            default:
                return '??'
        }
    }

    visitBinary(expr: BinaryOperationTree): string {
        const left = this.getTree(expr.left, expr.operator.type);
        const right = this.getTree(expr.right, expr.operator.type);
        switch (expr.operator.type) {
            case PseudoLexer.LBRACK:
                return `${left}[${right}]`
            case PseudoLexer.DOT:
                return `${left}.${right}`
            case PseudoLexer.SLASH:
                return `\\frac{${left}}{${right}}`
            case PseudoLexer.DIV:
                return `\\lfloor \\frac{${left}}{${right}} \\rfloor`
            default:
                return `${left} ${this.getOperator(expr.operator.type)} ${right}`
        }
    }
    visitUnary(expr: UnaryOperationTree): string {
        let operand = expr.operand instanceof ExprTree
            ? expr.operand.accept(this) 
            : expr.operand.text
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
            return `${operator} ${operand}`
        } else {
            return `${operand}`
        }
    }
    visitStatlist(expr: StatListTree): string {
        let stats = expr.stats.map(stat => stat instanceof ExprTree ? `\\State $${stat.accept(this)}$` : stat.accept(this))
        let result = stats.join('\n') + '\n'
        return result
    }
    visitWhile(expr: WhileTree): string {
        let result = `\\While{$${expr.cond.accept(this)}$}\n`;
        result += expr.list.accept(this);
        result += `\\EndWhile`;
        return result;
    }
    visitRepeat(expr: RepeatUntilTree): string {
        let result = '\\Repeat\n'
        result += expr.list.accept(this);
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
            result += lists[lists.length-1];
        }
        result += '\\EndIf'
        return result
    }
    visitFor(expr: ForTree): string {
        let result = `\\For{${expr.cond.accept(this)}}\n`;
        result += expr.list.accept(this);
        result += '\\EndFor'
        return result;
    }
    visitIterator(expr: IteratorTree): string {
        const id = expr.id.accept(this).replaceAll('_', '\\_')
        return `${id} $\\in ${expr.iterator.accept(this)}$`
    }
    visitRange(expr: RangeTree): string {
        return `${expr.from.accept(this)}$ ... $${expr.to.accept(this)} `
    }
    visitFunction(expr: FunctionTree): string {
        const name = expr.name.text.replaceAll('_', '\\_')
        const args = expr.args.map(arg => `${arg.text.replaceAll('_', '\\_')}`).join(", ")
        const body = expr.stats.accept(this)
        let result = `\\Function{${name}}{${args}}\n`;
        result += body
        result += '\\EndFunction'
        return result
    }
    visitFunctionCall(expr: FunctionCallTree): string {
        const args = expr.args.map(arg => `${arg.accept(this)}`).join(", ")
        return ` ${expr.name.text.replaceAll('_', '\\_')}(${args}) `
    }
    visitArray(expr: ArrayTree): string {
        const values = expr.elements.map(element => `${element.accept(this)}`).join(", ")
        return `[${values}]`
    }
    visitIndex(expr: IndexAccessorTree): string {
        return `[${expr.index.accept(this)}]`
    }
    visitDotName(expr: DotAccessorTree): string {
        return `.${expr.name.text.replaceAll('_', '\\_')}`
    }
    visitObject(expr: ObjectTree): string {
        const elements = expr.elements.map(element => element.accept(this)).join(",")
        return `\\{${elements}\\}`
    }
    visitKeyValue(expr: KeyValueTree): string {
        return `${expr.key.text.replaceAll('_', '\\_')}: ${expr.value.accept(this)}`
    }
    visitReturn(expr: ReturnTree): string {
        if (expr.value) {
            return `\\State return $${expr.value.accept(this)}$`
        } else {
            return `\\State return`
        }
    }
    visitBreak(expr: BreakTree): string {
        return `\\State break`
    }
    visitContinue(expr: ContinueTree): string {
        return `\\State continue`
    }

    visitSet(expr: SetTree): string {
        const values = expr.elements.map(element => `${element.accept(this)}`).join(", ")
        return `\{${values}\}`
    }
    
    visitLexpr(expr: LexprTree): string {
        if (expr.parts.length == 1) {
            return expr.parts[0]!.accept(this);
        } else {
            const lexprs = expr.parts.map(l => l.accept(this)).join(", ");
            return `${lexprs}`
        }
    }

    visitLexprPart(expr: LexprPartTree): string {
        const name = expr.name.text.replaceAll('_', '\\_')
        const accessors = expr.accessors.map(accessor => accessor.accept(this)).join("")
        return `${name}${accessors}`
    }

    visitTuple(expr: TupleTree): string {
        const values = expr.elements.map(v => v.accept(this)).join(", ")
        return `(${values})`
    }

}