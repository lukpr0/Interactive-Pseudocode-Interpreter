import { Token } from 'antlr4';
import { AdditiveContext, AssignstatContext, BoolLiteralContext, ExprContext, FloatLiteralContext, IdLiteralContext, IntLiteralContext, LogicalAndContext, LogicalOrContext, MultiplicativeContext, NegationContext, ParenthesesContext, ProgramContext, ProgramstatContext, PseudoParser, PseudoParserVisitor, StatContext, UnaryMinusContext } from '../generated/index.js';
import AbstractSyntaxTree from './AST/AbstractTree.js';
import SymbolTable from './Interpreter/SymbolTable.js';
import type Tree from './AST/Tree.js';
import { ProgramTree } from './AST/ProgramTree.js';
import { AssignTree } from './AST/AssignTree.js';
import { BinaryOperationTree, ExprTree, UnaryOperationTree } from './AST/ExprTree.js';

export default class AstBuilderVisitor extends PseudoParserVisitor<Tree> {

    symbolTable: SymbolTable

    constructor(symbolTable: SymbolTable) {
        super();
        this.symbolTable = symbolTable;

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

        this.visitStat = (ctx: StatContext): Tree => {
            const assignstat = ctx.assignstat();
            if (assignstat) {
                return this.visit(assignstat)
            }
            const expr = ctx.expr();
            if (expr) {
                return this.visit(expr);
            }
            throw new Error()
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

    }

    private buildBinaryExpr(op: Token, ctx: AdditiveContext | MultiplicativeContext | LogicalAndContext | LogicalOrContext): Tree {
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
