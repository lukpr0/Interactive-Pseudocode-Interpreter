// Generated from PseudoParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./PseudoParser.js";
import { ProgramstatContext } from "./PseudoParser.js";
import { AssignStatContext } from "./PseudoParser.js";
import { WhileStatContext } from "./PseudoParser.js";
import { RepeatStatContext } from "./PseudoParser.js";
import { IfStatContext } from "./PseudoParser.js";
import { ForStatContext } from "./PseudoParser.js";
import { ExprStatContext } from "./PseudoParser.js";
import { BreakStatContext } from "./PseudoParser.js";
import { ReturnStatContext } from "./PseudoParser.js";
import { ContinueStatContext } from "./PseudoParser.js";
import { StatlistContext } from "./PseudoParser.js";
import { DotAccessContext } from "./PseudoParser.js";
import { NegationContext } from "./PseudoParser.js";
import { IdLiteralContext } from "./PseudoParser.js";
import { FloatLiteralContext } from "./PseudoParser.js";
import { IndexAccessContext } from "./PseudoParser.js";
import { SetUnionContext } from "./PseudoParser.js";
import { UnaryMinusContext } from "./PseudoParser.js";
import { InQueryContext } from "./PseudoParser.js";
import { LogicalOrContext } from "./PseudoParser.js";
import { FuncCallContext } from "./PseudoParser.js";
import { ArrayExprContext } from "./PseudoParser.js";
import { MultiplicativeContext } from "./PseudoParser.js";
import { AdditiveContext } from "./PseudoParser.js";
import { StringLiteralContext } from "./PseudoParser.js";
import { BoolLiteralContext } from "./PseudoParser.js";
import { ObjectExprContext } from "./PseudoParser.js";
import { SetExprContext } from "./PseudoParser.js";
import { ComparisonContext } from "./PseudoParser.js";
import { NilLiteralContext } from "./PseudoParser.js";
import { SetDifferenceContext } from "./PseudoParser.js";
import { LogicalAndContext } from "./PseudoParser.js";
import { IntLiteralContext } from "./PseudoParser.js";
import { SetIntersectContext } from "./PseudoParser.js";
import { ParenthesesContext } from "./PseudoParser.js";
import { BreakstatContext } from "./PseudoParser.js";
import { ContinuestatContext } from "./PseudoParser.js";
import { ReturnstatContext } from "./PseudoParser.js";
import { ArrayexprContext } from "./PseudoParser.js";
import { ObjectexprContext } from "./PseudoParser.js";
import { SetexprContext } from "./PseudoParser.js";
import { KeyvaluepairContext } from "./PseudoParser.js";
import { FullidContext } from "./PseudoParser.js";
import { IndexAccessorContext } from "./PseudoParser.js";
import { DotAccessorContext } from "./PseudoParser.js";
import { AssignstatContext } from "./PseudoParser.js";
import { WhilestatContext } from "./PseudoParser.js";
import { RepeatstatContext } from "./PseudoParser.js";
import { IfstatContext } from "./PseudoParser.js";
import { IfheadContext } from "./PseudoParser.js";
import { ForstatContext } from "./PseudoParser.js";
import { RangeIteratorContext } from "./PseudoParser.js";
import { ExprIteratorContext } from "./PseudoParser.js";
import { RangeContext } from "./PseudoParser.js";
import { AlgorithmContext } from "./PseudoParser.js";
import { ArglistContext } from "./PseudoParser.js";
import { FunccallContext } from "./PseudoParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PseudoParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class PseudoParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `PseudoParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.programstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgramstat?: (ctx: ProgramstatContext) => Result;
	/**
	 * Visit a parse tree produced by the `AssignStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignStat?: (ctx: AssignStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `WhileStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStat?: (ctx: WhileStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `RepeatStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatStat?: (ctx: RepeatStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `IfStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStat?: (ctx: IfStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `ForStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStat?: (ctx: ForStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `ExprStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprStat?: (ctx: ExprStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `BreakStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStat?: (ctx: BreakStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `ReturnStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStat?: (ctx: ReturnStatContext) => Result;
	/**
	 * Visit a parse tree produced by the `ContinueStat`
	 * labeled alternative in `PseudoParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStat?: (ctx: ContinueStatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.statlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatlist?: (ctx: StatlistContext) => Result;
	/**
	 * Visit a parse tree produced by the `DotAccess`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotAccess?: (ctx: DotAccessContext) => Result;
	/**
	 * Visit a parse tree produced by the `Negation`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegation?: (ctx: NegationContext) => Result;
	/**
	 * Visit a parse tree produced by the `IdLiteral`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdLiteral?: (ctx: IdLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `FloatLiteral`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatLiteral?: (ctx: FloatLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `IndexAccess`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexAccess?: (ctx: IndexAccessContext) => Result;
	/**
	 * Visit a parse tree produced by the `SetUnion`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetUnion?: (ctx: SetUnionContext) => Result;
	/**
	 * Visit a parse tree produced by the `UnaryMinus`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryMinus?: (ctx: UnaryMinusContext) => Result;
	/**
	 * Visit a parse tree produced by the `InQuery`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInQuery?: (ctx: InQueryContext) => Result;
	/**
	 * Visit a parse tree produced by the `LogicalOr`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalOr?: (ctx: LogicalOrContext) => Result;
	/**
	 * Visit a parse tree produced by the `FuncCall`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncCall?: (ctx: FuncCallContext) => Result;
	/**
	 * Visit a parse tree produced by the `ArrayExpr`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayExpr?: (ctx: ArrayExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `Multiplicative`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicative?: (ctx: MultiplicativeContext) => Result;
	/**
	 * Visit a parse tree produced by the `Additive`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditive?: (ctx: AdditiveContext) => Result;
	/**
	 * Visit a parse tree produced by the `StringLiteral`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `BoolLiteral`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolLiteral?: (ctx: BoolLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `ObjectExpr`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectExpr?: (ctx: ObjectExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `SetExpr`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetExpr?: (ctx: SetExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `Comparison`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparison?: (ctx: ComparisonContext) => Result;
	/**
	 * Visit a parse tree produced by the `NilLiteral`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNilLiteral?: (ctx: NilLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `SetDifference`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetDifference?: (ctx: SetDifferenceContext) => Result;
	/**
	 * Visit a parse tree produced by the `LogicalAnd`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalAnd?: (ctx: LogicalAndContext) => Result;
	/**
	 * Visit a parse tree produced by the `IntLiteral`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntLiteral?: (ctx: IntLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `SetIntersect`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetIntersect?: (ctx: SetIntersectContext) => Result;
	/**
	 * Visit a parse tree produced by the `Parentheses`
	 * labeled alternative in `PseudoParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheses?: (ctx: ParenthesesContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.breakstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakstat?: (ctx: BreakstatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.continuestat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinuestat?: (ctx: ContinuestatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.returnstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnstat?: (ctx: ReturnstatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.arrayexpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayexpr?: (ctx: ArrayexprContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.objectexpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectexpr?: (ctx: ObjectexprContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.setexpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetexpr?: (ctx: SetexprContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.keyvaluepair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeyvaluepair?: (ctx: KeyvaluepairContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.fullid`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFullid?: (ctx: FullidContext) => Result;
	/**
	 * Visit a parse tree produced by the `IndexAccessor`
	 * labeled alternative in `PseudoParser.accessor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexAccessor?: (ctx: IndexAccessorContext) => Result;
	/**
	 * Visit a parse tree produced by the `DotAccessor`
	 * labeled alternative in `PseudoParser.accessor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotAccessor?: (ctx: DotAccessorContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.assignstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignstat?: (ctx: AssignstatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.whilestat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhilestat?: (ctx: WhilestatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.repeatstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeatstat?: (ctx: RepeatstatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.ifstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfstat?: (ctx: IfstatContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.ifhead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfhead?: (ctx: IfheadContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.forstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForstat?: (ctx: ForstatContext) => Result;
	/**
	 * Visit a parse tree produced by the `RangeIterator`
	 * labeled alternative in `PseudoParser.iterator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeIterator?: (ctx: RangeIteratorContext) => Result;
	/**
	 * Visit a parse tree produced by the `ExprIterator`
	 * labeled alternative in `PseudoParser.iterator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprIterator?: (ctx: ExprIteratorContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRange?: (ctx: RangeContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.algorithm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlgorithm?: (ctx: AlgorithmContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.arglist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArglist?: (ctx: ArglistContext) => Result;
	/**
	 * Visit a parse tree produced by `PseudoParser.funccall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunccall?: (ctx: FunccallContext) => Result;
}

