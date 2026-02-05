import { BinaryOperationTree, LexprPartTree, LexprTree, SetTree, TupleTree, type ArrayTree, type AssignTree, type BreakTree, type ContinueTree, type DotAccessorTree, type ExprTree, type ForTree, type FunctionCallTree, type FunctionTree, type IfTree, type IndexAccessorTree, type IteratorTree, type KeyValueTree, type ObjectTree, type ProgramTree, type RangeTree, type RepeatUntilTree, type ReturnTree, type StatListTree, type UnaryOperationTree, type Visitor, type WhileTree } from "@interactive-pseudo/interpreter";
import { PseudoLexer } from "@interactive-pseudo/parser";

export abstract class MarkupGenerationVisitor implements Visitor<string> {

    protected headers: boolean

    constructor(headers: boolean) {
        this.headers = headers;
    }

    abstract visitProgram(program: ProgramTree): string; 
    abstract visitAssign(assign: AssignTree): string; 
    abstract visitExpr(expr: ExprTree): string; 
    abstract visitBinary(expr: BinaryOperationTree): string; 
    abstract visitUnary(expr: UnaryOperationTree): string; 
    abstract visitStatlist(expr: StatListTree): string; 
    abstract visitWhile(expr: WhileTree): string; 
    abstract visitRepeat(expr: RepeatUntilTree): string; 
    abstract visitIf(expr: IfTree): string; 
    abstract visitFor(expr: ForTree): string; 
    abstract visitIterator(expr: IteratorTree): string; 
    abstract visitRange(expr: RangeTree): string; 
    abstract visitFunction(expr: FunctionTree): string; 
    abstract visitFunctionCall(expr: FunctionCallTree): string; 
    abstract visitArray(expr: ArrayTree): string; 
    abstract visitIndex(expr: IndexAccessorTree): string; 
    abstract visitDotName(expr: DotAccessorTree): string; 
    abstract visitObject(expr: ObjectTree): string; 
    abstract visitKeyValue(expr: KeyValueTree): string; 
    abstract visitReturn(expr: ReturnTree): string; 
    abstract visitBreak(expr: BreakTree): string; 
    abstract visitContinue(expr: ContinueTree): string; 
    abstract visitSet(expr: SetTree): string;
    abstract visitLexpr(expr: LexprTree): string;
    abstract visitLexprPart(expr: LexprPartTree): string;
    abstract visitTuple(expr: TupleTree): string;
    
    protected lowerPrecedence(parent: number, child: number): boolean {
        const accessors = [PseudoLexer.LBRACK, PseudoLexer.DOT]
        const multiplicative = [PseudoLexer.STAR, PseudoLexer.SLASH, PseudoLexer.DIV, PseudoLexer.MOD];
        const additive = [PseudoLexer.PLUS, PseudoLexer.MINUS];
        const comparison = [PseudoLexer.GREATERTHAN, PseudoLexer.GREATEREQUAL, PseudoLexer.LESSTHAN, PseudoLexer.LESSEQUAL, PseudoLexer.EQUALS, PseudoLexer.NOTEQUAL];
        const and = [PseudoLexer.AND];
        const or = [PseudoLexer.OR];

        const precedence = [accessors, multiplicative, additive, comparison, and, or];

        const parentPrecedence = precedence.map(ops => ops.includes(parent)).indexOf(true);
        const childPrecedence = precedence.map(ops => ops.includes(child)).indexOf(true);

        return parentPrecedence < childPrecedence;
    }

    protected getTree(tree: ExprTree, operator: number): string {
        if (tree instanceof BinaryOperationTree && !(tree.operator.type in [PseudoLexer.LBRACK,  PseudoLexer.DOT])) {
            const result = tree.accept(this)
            if (this.lowerPrecedence(operator, tree.operator.type)) {
                return `(${result})`
            } else {
                return result
            }
        } else {
            return tree.accept(this)
        }
    }
}