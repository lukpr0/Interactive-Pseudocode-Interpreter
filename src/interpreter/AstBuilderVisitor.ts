import { Token } from 'antlr4';
import { AdditiveContext, AlgorithmContext, ArglistContext, ArrayexprContext, ArrayExprContext, AssignStatContext, AssignstatContext, BoolLiteralContext, BreakstatContext, BreakStatContext, ComparisonContext, DotAccessContext, DotAccessorContext, ExprContext, ExprStatContext, FloatLiteralContext, ForstatContext, ForStatContext, FullidContext, FunccallContext, FuncCallContext, IdLiteralContext, IfheadContext, IfStatContext, IfstatContext, IndexAccessContext, IndexAccessorContext, IntLiteralContext, IteratorContext, KeyvaluepairContext, LogicalAndContext, LogicalOrContext, MultiplicativeContext, NegationContext, ObjectexprContext, ObjectExprContext, ParenthesesContext, ProgramContext, ProgramstatContext, PseudoParser, PseudoParserVisitor, RepeatStatContext, RepeatstatContext, ReturnStatContext, ReturnstatContext, StatContext, StatlistContext, UnaryMinusContext, WhileStatContext, WhilestatContext } from '../generated/index.js';
import type Tree from './AST/Tree.js';
import { ProgramTree } from './AST/ProgramTree.js';
import { AssignTree } from './AST/AssignTree.js';
import { BinaryOperationTree, ExprTree, UnaryOperationTree } from './AST/ExprTree.js';
import WhileTree from './AST/WhileTree.js';
import StatListTree from './AST/StatListTree.js';
import RepeatUntilTree from './AST/RepeatUntil.js';
import IfTree from './AST/IfTree.js';
import ForTree from './AST/ForTree.js';
import RangeTree from './AST/RangeTree.js';
import IteratorTree from './AST/IteratorTree.js';
import FunctionTree from './AST/FunctionTree.js';
import FunctionCallTree from './AST/FunctionCallTree.js';
import ArrayTree from './AST/ArrayTree.js';
import FullIdTree from './AST/FullIdTree.js';
import { DotAccessorTree, IndexAccessorTree } from './AST/AccessorTree.js';
import ASTPrinter from './AST/ASTPrinter.js';
import { assert } from 'console';
import ObjectTree from './AST/ObjectTree.js';
import KeyValueTree from './AST/KeyValueTree.js';
import ReturnTree from './AST/ReturnTree.js';
import BreakTree from './AST/BreakTree.js';

export default class AstBuilderVisitor extends PseudoParserVisitor<Tree> {

    inFunction: boolean;

    constructor() {
        super();
        this.inFunction = false;

        this.visitProgram = (ctx: ProgramContext): Tree => {
            const trees = [];
            for (const programstat of ctx.programstat_list()) {
                const child = this.visit(programstat);
                trees.push(child);
            }
            const tree = new ProgramTree(trees)
            return tree;
        }

        this.visitProgramstat = (ctx: ProgramstatContext): Tree => {
            const stat = ctx.stat();
            const algorithm = ctx.algorithm()
            if (stat) {
                const statTree = this.visit(stat)
                return statTree;
            } else if (algorithm) {
                const algoTree = algorithm.accept(this)
                return algoTree
            }

            throw new Error("Expected statement, found nothing")
        }

        this.visitAssignStat = (ctx: AssignStatContext): Tree => {
            const assignstat = ctx.assignstat();
            return this.visit(assignstat)
        }

        this.visitAssignstat = (ctx: AssignstatContext): Tree => {
            if (!ctx.children) {
                throw new Error("Expected statements, found nothing");
            }
            const expr = ctx.expr()
            const child = this.visit(expr);
            const id = ctx.fullid().accept(this)
            if (child instanceof ExprTree && id instanceof FullIdTree) {
                const tree = new AssignTree(id, child);
                return tree;
            }
            throw new Error("incompatible type detected: ")
        }

        this.visitWhileStat = (ctx: WhileStatContext): Tree => {
            const whilestat = ctx.whilestat();
            return this.visit(whilestat);
        }

        this.visitRepeatStat = (ctx: RepeatStatContext): Tree => {
            const repeatstat = ctx.repeatstat();
            return this.visit(repeatstat)
        }

        this.visitIfStat = (ctx: IfStatContext): Tree => {
            const ifstat = ctx.ifstat();
            return this.visit(ifstat);
        }

        this.visitForStat = (ctx: ForStatContext): Tree => {
            const forstat = ctx.forstat();
            return this.visit(forstat);
        }

        this.visitAdditive = (ctx: AdditiveContext): Tree => {
            if (!ctx.children) {
                throw new Error("Expected operands, found nothing");
            }
            const op = ctx._op.type == PseudoParser.PLUS ? ctx.PLUS() : ctx.MINUS()

            return this.buildBinaryExpr(op.symbol, ctx);
        }

        this.visitMultiplicative = (ctx: MultiplicativeContext): Tree => {
            if (!ctx.children) {
                throw new Error("Expected operands, found nothing");
            }
            let op;
            switch (ctx._op.type) {
                case PseudoParser.STAR:
                    op = ctx.STAR();
                    break;
                case PseudoParser.SLASH:
                    op = ctx.SLASH();
                    break;
                case PseudoParser.DIV:
                    op = ctx.DIV();
                    break;
                case PseudoParser.MOD:
                    op = ctx.MOD();
                    break;
                default:
                    throw new Error("Unexpected operand found: " + ctx._op.text);
            }
            return this.buildBinaryExpr(op.symbol, ctx);
        }
        
        this.visitIndexAccess = (ctx: IndexAccessContext): Tree => {
            return this.buildBinaryExpr(ctx.LBRACK().symbol, ctx)
        }

        this.visitDotAccess = (ctx: DotAccessContext): Tree => {
            const left = ctx.expr()
            if (!left) {
                throw new Error("Expected operand, found nothing");
            }
            const right = ctx.IDENTIFIER()
            if (!right) {
                throw new Error("Expected operand, found nothing");
            }
            const leftTree = this.visit(left)
            if (leftTree instanceof ExprTree) {
                const tree = new BinaryOperationTree(ctx.DOT().symbol, leftTree, new UnaryOperationTree(null, right.symbol));
                return tree;
            }
            throw new Error("incompatible type detected")
        }

        this.visitParentheses = (ctx: ParenthesesContext): Tree => {
            const expr = this.visit(ctx.expr());
            return expr; 
        }

        this.visitUnaryMinus = (ctx: UnaryMinusContext): Tree => {
            const expr = this.visit(ctx.expr());
            if (expr instanceof ExprTree) {
                const tree = new UnaryOperationTree(ctx.MINUS().symbol, expr);
                return tree;
            }
            throw new Error("incompatible type detected")
        }

        this.visitIdLiteral = (ctx: IdLiteralContext): Tree => {
            return new UnaryOperationTree(null, ctx.IDENTIFIER().symbol);
        }

        this.visitIntLiteral = (ctx: IntLiteralContext): Tree => {
            return new UnaryOperationTree(null, ctx.INT().symbol);
        }

        this.visitFloatLiteral = (ctx: FloatLiteralContext): Tree => {
            return new UnaryOperationTree(null, ctx.FLOAT().symbol);
        }

        this.visitBoolLiteral = (ctx: BoolLiteralContext): Tree => {
            const value = ctx._value.type == PseudoParser.TRUE ? ctx.TRUE() : ctx.FALSE();
            return new UnaryOperationTree(null, value.symbol)
        }

        this.visitLogicalAnd = (ctx: LogicalAndContext): Tree => {
            return this.buildBinaryExpr(ctx.AND().symbol, ctx)
        }

        this.visitLogicalOr = (ctx: LogicalOrContext): Tree => {
            return this.buildBinaryExpr(ctx.OR().symbol, ctx)
        }

        this.visitNegation = (ctx: NegationContext): Tree => {
            const expr = this.visit(ctx.expr())
            if (expr instanceof ExprTree) {
                return new UnaryOperationTree(ctx.NOT().symbol, expr)
            }
            throw new Error("incompatible type detected")
        }

        this.visitComparison = (ctx: ComparisonContext): Tree => {
            if (!ctx.children) {
                throw new Error("Expected Operands, found nothing");
            }
            let op;
            switch (ctx._op.type) {
                case PseudoParser.LESSTHAN:
                    op = ctx.LESSTHAN();
                    break;
                case PseudoParser.GREATERTHAN:
                    op = ctx.GREATERTHAN();
                    break;
                case PseudoParser.LESSEQUAL:
                    op = ctx.LESSEQUAL();
                    break;
                case PseudoParser.GREATEREQUAL:
                    op = ctx.GREATEREQUAL();
                    break;
                case PseudoParser.EQUALS:
                    op = ctx.EQUALS();
                    break;
                case PseudoParser.NOTEQUAL:
                    op = ctx.NOTEQUAL()
                    break;
                default:
                    throw new Error("Unexpected operator found: " + ctx._op.text);
            }
            return this.buildBinaryExpr(op.symbol, ctx);
        }

        this.visitStatlist = (ctx: StatlistContext): StatListTree => {
            const stats = []
            for (const stat of ctx.stat_list()) {
                if (
                    stat instanceof AssignStatContext || stat instanceof WhileStatContext 
                    || stat instanceof RepeatStatContext || stat instanceof IfStatContext 
                    || stat instanceof ForStatContext || stat instanceof BreakStatContext
                    || stat instanceof ReturnStatContext || stat instanceof ExprStatContext
                ) {
                    const t = stat.accept(this);
                    stats.push(t);
                } else {
                    throw new Error("Unexpected statement found");
                }
            }
            const tree = new StatListTree(stats);
            tree.returnable = true;
            return tree;
        }

        this.visitWhilestat = (ctx: WhilestatContext): Tree => {
            const cond = this.visit(ctx.expr());
            const list = this.visit(ctx.statlist());
            if (list instanceof StatListTree) {
                const whileTree = new WhileTree(cond, list);
                return whileTree;
            } else {
                throw new Error("Unexpected subtree");
            }
        }

        this.visitRepeatstat = (ctx: RepeatstatContext): Tree => {
            const cond = this.visit(ctx.expr());
            const list = this.visit(ctx.statlist());
            if (list instanceof StatListTree) {
                const repeatTree = new RepeatUntilTree(cond, list);
                return repeatTree;
            } else {
                throw new Error("Unexpected subtree");
            }
        }

        this.visitIfstat = (ctx: IfstatContext): Tree => {
            const conditions = [];
            const lists: StatListTree[] = [];

            const condCount = ctx.ifhead_list().length;
            const listCount = ctx.statlist_list().length;

            for (let i = 0; i < ctx.ifhead_list().length; i++) {
                const condition = this.visit(ctx.ifhead_list()[i]!.expr());
                const list = this.visit(ctx.statlist_list()[i]!);
                if (!(list instanceof StatListTree)) {
                    throw new Error("Unexpected subtree");
                }
                conditions.push(condition);
                lists.push(list);
            }

            if (condCount < listCount) {
                const list = this.visit(ctx.statlist_list()[listCount-1]!);
                if (!(list instanceof StatListTree)) {
                    throw new Error("Unexpected subtree");
                }
                lists.push(list);
            }

            return new IfTree(conditions, lists)
        }

        this.visitAlgorithm = (ctx: AlgorithmContext): Tree => {
            const name = ctx.IDENTIFIER().symbol
            const ids = [];
            for (const id of ctx.arglist().IDENTIFIER_list()) {
                ids.push(id.symbol);
            }
            this.inFunction = true;
            const stats = ctx.statlist().accept(this)
            if (!(stats instanceof StatListTree)) {
                throw new Error("Unexpected subtree");
            }
            this.inFunction = false;
            stats.functionRoot = true;
            stats.returnable = true;
            const functionTree = new FunctionTree(name, ids, stats);
            return functionTree;
        }

        this.visitForstat = (ctx: ForstatContext): Tree => {
            const iterator = this.visit(ctx.iterator());
            const list = this.visit(ctx.statlist());
            if (!(iterator instanceof IteratorTree)) {
                throw new Error("Received no valid Iterator");
            }
            if (!(list instanceof StatListTree)) {
                throw new Error("Unexpected subtree");
            }
            const forTree = new ForTree(iterator, list);
            return forTree;
        }

        this.visitIterator = (ctx: IteratorContext): Tree => {
            const id = ctx.IDENTIFIER().symbol;
            const from = this.visit(ctx.range().expr(0))
            const to = this.visit(ctx.range().expr(1))
            const inclusive = ctx.range().EQUALS() != null;
            const rangeTree = new RangeTree(from, to, inclusive)
            const iterator = new IteratorTree(id, rangeTree);
            return iterator;
        }

        this.visitExprStat = (ctx: ExprStatContext): Tree => {
            return this.visit(ctx.expr())
        }

        this.visitFuncCall = (ctx: FuncCallContext): Tree => {
            const x = ctx.funccall().accept(this);
            return x;
        }

        this.visitFunccall = (ctx: FunccallContext): Tree => {
            const name = ctx.IDENTIFIER().symbol;
            const args = []
            for (const arg of ctx.expr_list()) {
                args.push(this.visit(arg));
            }
            const funccall = new FunctionCallTree(name, args);
            return funccall;
        }

        this.visitArrayExpr = (ctx: ArrayExprContext): Tree => {
            return ctx.arrayexpr().accept(this);
        }

        this.visitArrayexpr = (ctx: ArrayexprContext): Tree => {
            const elements = [] 
            for (const element of ctx.expr_list()) {
                const exprTree = this.visit(element);
                elements.push(exprTree);
            }
            const arrayTree = new ArrayTree(elements);
            return arrayTree;
        }

        this.visitFullid = (ctx: FullidContext): Tree => {
            const id = ctx.IDENTIFIER().symbol;
            const accessors = ctx.accessor_list()
                .map(accessor => this.visit(accessor));
            const tree = new FullIdTree(id, accessors);
            return tree;
        }

        this.visitIndexAccessor = (ctx: IndexAccessorContext): Tree => {
            const index = this.visit(ctx.expr());
            const tree = new IndexAccessorTree(index)
            return tree;
        }

        this.visitDotAccessor = (ctx: DotAccessorContext): Tree => {
            const name = ctx.IDENTIFIER().symbol;
            const tree = new DotAccessorTree(name);
            return tree;
        }

        this.visitObjectExpr = (ctx: ObjectExprContext): Tree => {
            return ctx.objectexpr().accept(this)
        }

        this.visitObjectexpr = (ctx: ObjectexprContext): Tree => {
            const kvps = ctx.keyvaluepair_list().map(kvp => {
                const kvpTree = kvp.accept(this);
                if (!(kvpTree instanceof KeyValueTree)) {
                    throw new Error("Expected key value pair");
                }
                return kvpTree
            });
            const tree = new ObjectTree(kvps);
            return tree;
        }

        this.visitKeyvaluepair = (ctx: KeyvaluepairContext): Tree => {
            const key = ctx.IDENTIFIER().symbol;
            const value = this.visit(ctx.expr());
            const tree = new KeyValueTree(key, value);
            return tree;
        }

        this.visitBreakStat = (ctx: BreakStatContext): Tree => {
            return ctx.breakstat().accept(this);
        }

        this.visitBreakstat = (ctx: BreakstatContext): Tree => {
            return new BreakTree();
        }
        
        this.visitReturnStat = (ctx: ReturnStatContext): Tree => {
            return ctx.returnstat().accept(this);
        }
        
        this.visitReturnstat = (ctx: ReturnstatContext): Tree => {
            if (!ctx.expr()) {
                return new ReturnTree(new UnaryOperationTree(null, new Token()))
            }
            const expr = this.visit(ctx.expr());
            const tree = new ReturnTree(expr);
            return tree;
            //console.log("expr=", expr)
        }

    }

    private buildBinaryExpr(op: Token, ctx: AdditiveContext | MultiplicativeContext | LogicalAndContext | LogicalOrContext | ComparisonContext | IndexAccessContext): Tree {
        const left = ctx.expr_list()[0]
        if (!left) {
            throw new Error("Expected operand, found nothing");
        }
        const right = ctx.expr_list()[1]
        if (!right) {
            throw new Error("Expected operand, found nothing");
        }
        const leftTree = this.visit(left)
        const rightTree = this.visit(right)
        if (leftTree instanceof ExprTree && rightTree instanceof ExprTree) {
            const tree = new BinaryOperationTree(op, leftTree, rightTree);
            return tree;
        }
        throw new Error("incompatible type detected")
    }
}
