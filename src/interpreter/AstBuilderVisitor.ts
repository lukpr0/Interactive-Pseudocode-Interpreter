import { Token } from 'antlr4';
import { AdditiveContext, AssignStatContext, AssignstatContext, BoolLiteralContext, ComparisonContext, ExprContext, FloatLiteralContext, IdLiteralContext, IntLiteralContext, LogicalAndContext, LogicalOrContext, MultiplicativeContext, NegationContext, ParenthesesContext, ProgramContext, ProgramstatContext, PseudoParser, PseudoParserVisitor, RepeatStatContext, RepeatstatContext, StatContext, StatlistContext, UnaryMinusContext, WhileStatContext, WhilestatContext } from '../generated/index.js';
import SymbolTable from './Interpreter/SymbolTable.js';
import type Tree from './AST/Tree.js';
import { ProgramTree } from './AST/ProgramTree.js';
import { AssignTree } from './AST/AssignTree.js';
import { BinaryOperationTree, ExprTree, UnaryOperationTree } from './AST/ExprTree.js';
import WhileTree from './AST/WhileTree.js';
import StatListTree from './AST/StatListTree.js';
import RepeatUntilTree from './AST/RepeatUntil.js';

export default class AstBuilderVisitor extends PseudoParserVisitor<Tree> {

    constructor() {
        super();

        this.visitProgram = (ctx: ProgramContext): Tree => {
            const trees = [];
            for (const programstat of ctx.programstat_list()) {
                const child = this.visit(programstat);
                trees.push(child);
            }
            const tree = new ProgramTree()
            trees.forEach(child => tree.addChild(child));
            return tree;
        }

        this.visitProgramstat = (ctx: ProgramstatContext): Tree => {
            const stat = ctx.stat();
            if (stat) {
                return this.visit(stat)
            }
            throw new Error()
        }

        this.visitAssignStat = (ctx: AssignStatContext): Tree => {
            const assignstat = ctx.assignstat();
            return this.visit(assignstat)
        }

        this.visitAssignstat = (ctx: AssignstatContext): Tree => {
            if (!ctx.children) {
                throw new Error();
            }
            const expr = ctx.expr()
            const child = this.visit(expr);
            if (child instanceof ExprTree) {
                const tree = new AssignTree(ctx.IDENTIFIER().symbol, child);
                return tree;
            }
            throw new Error("incompatible type detected")
        }

        this.visitWhileStat = (ctx: WhileStatContext): Tree => {
            const whilestat = ctx.whilestat();
            return this.visit(whilestat);
        }

        this.visitRepeatStat = (ctx: RepeatStatContext): Tree => {
            const repeatstat = ctx.repeatstat();
            return this.visit(repeatstat)
        }

        this.visitAdditive = (ctx: AdditiveContext): Tree => {
            if (!ctx.children) {
                throw new Error();
            }
            const op = ctx._op.type == PseudoParser.PLUS ? ctx.PLUS() : ctx.MINUS()

            return this.buildBinaryExpr(op.symbol, ctx);
        }

        this.visitMultiplicative = (ctx: MultiplicativeContext): Tree => {
            if (!ctx.children) {
                throw new Error();
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
                default:
                    throw new Error();
            }
            return this.buildBinaryExpr(op.symbol, ctx);
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
                throw new Error();
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
                    throw new Error();
            }
            return this.buildBinaryExpr(op.symbol, ctx);
        }

        this.visitStatlist = (ctx: StatlistContext): StatListTree => {
            const stats = []
            for (const stat of ctx.stat_list()) {
                if (stat instanceof AssignStatContext || stat instanceof WhileStatContext || stat instanceof RepeatStatContext) {
                    const t = stat.accept(this);
                    stats.push(t);
                } else {
                    throw new Error();
                }
            }
            return new StatListTree(stats)
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

    }

    private buildBinaryExpr(op: Token, ctx: AdditiveContext | MultiplicativeContext | LogicalAndContext | LogicalOrContext | ComparisonContext): Tree {
        const left = ctx.expr_list()[0]
        if (!left) {
            throw new Error();
        }
        const right = ctx.expr_list()[1]
        if (!right) {
            throw new Error();
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

    /*visitChildren(ctx: ParserRuleContext): void {
        if (!ctx) {
            return;
        }
        if (ctx.children) {
            return ctx.children.map(child => {
                if (child.children && child.children.length != 0) {
                    return child.accept(this);
                } else {
                    return child.getText();
                }
            });
        }
    }*/
