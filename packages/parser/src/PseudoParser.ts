// Generated from PseudoParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import PseudoParserVisitor from "./PseudoParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class PseudoParser extends Parser {
	public static readonly AND = 1;
	public static readonly OR = 2;
	public static readonly NOT = 3;
	public static readonly IF = 4;
	public static readonly FOR = 5;
	public static readonly WHILE = 6;
	public static readonly THEN = 7;
	public static readonly DO = 8;
	public static readonly REPEAT = 9;
	public static readonly UNTIL = 10;
	public static readonly END = 11;
	public static readonly IN = 12;
	public static readonly RETURN = 13;
	public static readonly BREAK = 14;
	public static readonly CONTINUE = 15;
	public static readonly ELSE = 16;
	public static readonly FUNCTION = 17;
	public static readonly EQUALS = 18;
	public static readonly ASSIGN = 19;
	public static readonly COMMA = 20;
	public static readonly SEMI = 21;
	public static readonly LPAREN = 22;
	public static readonly RPAREN = 23;
	public static readonly LCURLY = 24;
	public static readonly RCURLY = 25;
	public static readonly LBRACK = 26;
	public static readonly RBRACK = 27;
	public static readonly DOTDOT = 28;
	public static readonly DOT = 29;
	public static readonly PLUS = 30;
	public static readonly MINUS = 31;
	public static readonly STAR = 32;
	public static readonly SLASH = 33;
	public static readonly COLON = 34;
	public static readonly DIV = 35;
	public static readonly MOD = 36;
	public static readonly LESSTHAN = 37;
	public static readonly GREATERTHAN = 38;
	public static readonly LESSEQUAL = 39;
	public static readonly GREATEREQUAL = 40;
	public static readonly NOTEQUAL = 41;
	public static readonly TRUE = 42;
	public static readonly FALSE = 43;
	public static readonly NIL = 44;
	public static readonly INT = 45;
	public static readonly FLOAT = 46;
	public static readonly IDENTIFIER = 47;
	public static readonly STRING = 48;
	public static readonly NEWLINE = 49;
	public static readonly SINGLE_LINE_COMMENT = 50;
	public static readonly MULTI_LINE_COMMENT = 51;
	public static readonly WHITESPACE = 52;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_programstat = 1;
	public static readonly RULE_stat = 2;
	public static readonly RULE_statlist = 3;
	public static readonly RULE_expr = 4;
	public static readonly RULE_breakstat = 5;
	public static readonly RULE_continuestat = 6;
	public static readonly RULE_returnstat = 7;
	public static readonly RULE_arrayexpr = 8;
	public static readonly RULE_objectexpr = 9;
	public static readonly RULE_setexpr = 10;
	public static readonly RULE_keyvaluepair = 11;
	public static readonly RULE_fullid = 12;
	public static readonly RULE_accessor = 13;
	public static readonly RULE_assignstat = 14;
	public static readonly RULE_whilestat = 15;
	public static readonly RULE_repeatstat = 16;
	public static readonly RULE_ifstat = 17;
	public static readonly RULE_ifhead = 18;
	public static readonly RULE_forstat = 19;
	public static readonly RULE_iterator = 20;
	public static readonly RULE_range = 21;
	public static readonly RULE_algorithm = 22;
	public static readonly RULE_arglist = 23;
	public static readonly RULE_funccall = 24;
	public static readonly literalNames: (string | null)[] = [ null, "'and'", 
                                                            "'or'", "'not'", 
                                                            "'if'", "'for'", 
                                                            "'while'", "'then'", 
                                                            "'do'", "'repeat'", 
                                                            "'until'", "'end'", 
                                                            "'in'", "'return'", 
                                                            "'break'", "'continue'", 
                                                            "'else'", "'function'", 
                                                            "'='", "':='", 
                                                            "','", "';'", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "'['", "']'", 
                                                            "'..'", "'.'", 
                                                            "'+'", "'-'", 
                                                            "'*'", "'/'", 
                                                            "':'", "'div'", 
                                                            "'mod'", "'<'", 
                                                            "'>'", "'<='", 
                                                            "'>='", "'!='", 
                                                            "'true'", "'false'", 
                                                            "'nil'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "AND", 
                                                             "OR", "NOT", 
                                                             "IF", "FOR", 
                                                             "WHILE", "THEN", 
                                                             "DO", "REPEAT", 
                                                             "UNTIL", "END", 
                                                             "IN", "RETURN", 
                                                             "BREAK", "CONTINUE", 
                                                             "ELSE", "FUNCTION", 
                                                             "EQUALS", "ASSIGN", 
                                                             "COMMA", "SEMI", 
                                                             "LPAREN", "RPAREN", 
                                                             "LCURLY", "RCURLY", 
                                                             "LBRACK", "RBRACK", 
                                                             "DOTDOT", "DOT", 
                                                             "PLUS", "MINUS", 
                                                             "STAR", "SLASH", 
                                                             "COLON", "DIV", 
                                                             "MOD", "LESSTHAN", 
                                                             "GREATERTHAN", 
                                                             "LESSEQUAL", 
                                                             "GREATEREQUAL", 
                                                             "NOTEQUAL", 
                                                             "TRUE", "FALSE", 
                                                             "NIL", "INT", 
                                                             "FLOAT", "IDENTIFIER", 
                                                             "STRING", "NEWLINE", 
                                                             "SINGLE_LINE_COMMENT", 
                                                             "MULTI_LINE_COMMENT", 
                                                             "WHITESPACE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "programstat", "stat", "statlist", "expr", "breakstat", "continuestat", 
		"returnstat", "arrayexpr", "objectexpr", "setexpr", "keyvaluepair", "fullid", 
		"accessor", "assignstat", "whilestat", "repeatstat", "ifstat", "ifhead", 
		"forstat", "iterator", "range", "algorithm", "arglist", "funccall",
	];
	public get grammarFileName(): string { return "PseudoParser.g4"; }
	public get literalNames(): (string | null)[] { return PseudoParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return PseudoParser.symbolicNames; }
	public get ruleNames(): string[] { return PseudoParser.ruleNames; }
	public get serializedATN(): number[] { return PseudoParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, PseudoParser._ATN, PseudoParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PseudoParser.RULE_program);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 56;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 51;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235753080) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
						{
						this.state = 50;
						this.programstat();
						}
					}

					this.state = 53;
					this.match(PseudoParser.NEWLINE);
					}
					}
				}
				this.state = 58;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235753080) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
				{
				this.state = 59;
				this.programstat();
				}
			}

			this.state = 62;
			this.match(PseudoParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public programstat(): ProgramstatContext {
		let localctx: ProgramstatContext = new ProgramstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PseudoParser.RULE_programstat);
		try {
			this.state = 66;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 5:
			case 6:
			case 9:
			case 13:
			case 14:
			case 15:
			case 22:
			case 24:
			case 26:
			case 31:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 64;
				this.stat();
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 65;
				this.algorithm();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let localctx: StatContext = new StatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PseudoParser.RULE_stat);
		try {
			this.state = 77;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				localctx = new AssignStatContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 68;
				this.assignstat();
				}
				break;
			case 2:
				localctx = new WhileStatContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 69;
				this.whilestat();
				}
				break;
			case 3:
				localctx = new RepeatStatContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 70;
				this.repeatstat();
				}
				break;
			case 4:
				localctx = new IfStatContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 71;
				this.ifstat();
				}
				break;
			case 5:
				localctx = new ForStatContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 72;
				this.forstat();
				}
				break;
			case 6:
				localctx = new ExprStatContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 73;
				this.expr(0);
				}
				break;
			case 7:
				localctx = new BreakStatContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 74;
				this.breakstat();
				}
				break;
			case 8:
				localctx = new ReturnStatContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 75;
				this.returnstat();
				}
				break;
			case 9:
				localctx = new ContinueStatContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 76;
				this.continuestat();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statlist(): StatlistContext {
		let localctx: StatlistContext = new StatlistContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, PseudoParser.RULE_statlist);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 85;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 80;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235622008) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
						{
						this.state = 79;
						this.stat();
						}
					}

					this.state = 82;
					this.match(PseudoParser.NEWLINE);
					}
					}
				}
				this.state = 87;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 89;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235622008) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
				{
				this.state = 88;
				this.stat();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExprContext = new ExprContext(this, this._ctx, _parentState);
		let _prevctx: ExprContext = localctx;
		let _startState: number = 8;
		this.enterRecursionRule(localctx, 8, PseudoParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 110;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				{
				localctx = new IntLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 92;
				this.match(PseudoParser.INT);
				}
				break;
			case 2:
				{
				localctx = new FloatLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 93;
				this.match(PseudoParser.FLOAT);
				}
				break;
			case 3:
				{
				localctx = new StringLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 94;
				this.match(PseudoParser.STRING);
				}
				break;
			case 4:
				{
				localctx = new BoolLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 95;
				(localctx as BoolLiteralContext)._value = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===42 || _la===43)) {
				    (localctx as BoolLiteralContext)._value = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 5:
				{
				localctx = new NilLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 96;
				this.match(PseudoParser.NIL);
				}
				break;
			case 6:
				{
				localctx = new FuncCallContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 97;
				this.funccall();
				}
				break;
			case 7:
				{
				localctx = new IdLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 98;
				this.match(PseudoParser.IDENTIFIER);
				}
				break;
			case 8:
				{
				localctx = new ArrayExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 99;
				this.arrayexpr();
				}
				break;
			case 9:
				{
				localctx = new ObjectExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 100;
				this.objectexpr();
				}
				break;
			case 10:
				{
				localctx = new SetExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 101;
				this.setexpr();
				}
				break;
			case 11:
				{
				localctx = new NegationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 102;
				this.match(PseudoParser.NOT);
				this.state = 103;
				this.expr(8);
				}
				break;
			case 12:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 104;
				this.match(PseudoParser.MINUS);
				this.state = 105;
				this.expr(7);
				}
				break;
			case 13:
				{
				localctx = new ParenthesesContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 106;
				this.match(PseudoParser.LPAREN);
				this.state = 107;
				this.expr(0);
				this.state = 108;
				this.match(PseudoParser.RPAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 137;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 135;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 112;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 113;
						(localctx as MultiplicativeContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 27) !== 0))) {
						    (localctx as MultiplicativeContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 114;
						this.expr(7);
						}
						break;
					case 2:
						{
						localctx = new AdditiveContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 115;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 116;
						(localctx as AdditiveContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===30 || _la===31)) {
						    (localctx as AdditiveContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 117;
						this.expr(6);
						}
						break;
					case 3:
						{
						localctx = new ComparisonContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 118;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 119;
						(localctx as ComparisonContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 18)) & ~0x1F) === 0 && ((1 << (_la - 18)) & 16252929) !== 0))) {
						    (localctx as ComparisonContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 120;
						this.expr(5);
						}
						break;
					case 4:
						{
						localctx = new LogicalAndContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 121;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 122;
						(localctx as LogicalAndContext)._op = this.match(PseudoParser.AND);
						this.state = 123;
						this.expr(4);
						}
						break;
					case 5:
						{
						localctx = new LogicalOrContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 124;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 125;
						(localctx as LogicalOrContext)._op = this.match(PseudoParser.OR);
						this.state = 126;
						this.expr(3);
						}
						break;
					case 6:
						{
						localctx = new IndexAccessContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 127;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 128;
						this.match(PseudoParser.LBRACK);
						this.state = 129;
						this.expr(0);
						this.state = 130;
						this.match(PseudoParser.RBRACK);
						}
						break;
					case 7:
						{
						localctx = new DotAccessContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 132;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 133;
						this.match(PseudoParser.DOT);
						this.state = 134;
						this.match(PseudoParser.IDENTIFIER);
						}
						break;
					}
					}
				}
				this.state = 139;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public breakstat(): BreakstatContext {
		let localctx: BreakstatContext = new BreakstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PseudoParser.RULE_breakstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 140;
			this.match(PseudoParser.BREAK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public continuestat(): ContinuestatContext {
		let localctx: ContinuestatContext = new ContinuestatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, PseudoParser.RULE_continuestat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 142;
			this.match(PseudoParser.CONTINUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public returnstat(): ReturnstatContext {
		let localctx: ReturnstatContext = new ReturnstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PseudoParser.RULE_returnstat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 144;
			this.match(PseudoParser.RETURN);
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235564040) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
				{
				this.state = 145;
				this.expr(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayexpr(): ArrayexprContext {
		let localctx: ArrayexprContext = new ArrayexprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PseudoParser.RULE_arrayexpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 148;
			this.match(PseudoParser.LBRACK);
			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===49) {
				{
				{
				this.state = 149;
				this.match(PseudoParser.NEWLINE);
				}
				}
				this.state = 154;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 190;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235564040) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
				{
				this.state = 155;
				this.expr(0);
				this.state = 159;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 156;
						this.match(PseudoParser.NEWLINE);
						}
						}
					}
					this.state = 161;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
				}
				this.state = 178;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 162;
						this.match(PseudoParser.COMMA);
						this.state = 166;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===49) {
							{
							{
							this.state = 163;
							this.match(PseudoParser.NEWLINE);
							}
							}
							this.state = 168;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 169;
						this.expr(0);
						this.state = 173;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
						while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
							if (_alt === 1) {
								{
								{
								this.state = 170;
								this.match(PseudoParser.NEWLINE);
								}
								}
							}
							this.state = 175;
							this._errHandler.sync(this);
							_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
						}
						}
						}
					}
					this.state = 180;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
				}
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===20) {
					{
					this.state = 181;
					this.match(PseudoParser.COMMA);
					}
				}

				this.state = 187;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===49) {
					{
					{
					this.state = 184;
					this.match(PseudoParser.NEWLINE);
					}
					}
					this.state = 189;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 192;
			this.match(PseudoParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public objectexpr(): ObjectexprContext {
		let localctx: ObjectexprContext = new ObjectexprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PseudoParser.RULE_objectexpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 194;
			this.match(PseudoParser.LCURLY);
			this.state = 198;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===49) {
				{
				{
				this.state = 195;
				this.match(PseudoParser.NEWLINE);
				}
				}
				this.state = 200;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 236;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===47) {
				{
				this.state = 201;
				this.keyvaluepair();
				this.state = 205;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 202;
						this.match(PseudoParser.NEWLINE);
						}
						}
					}
					this.state = 207;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
				}
				this.state = 224;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 208;
						this.match(PseudoParser.COMMA);
						this.state = 212;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===49) {
							{
							{
							this.state = 209;
							this.match(PseudoParser.NEWLINE);
							}
							}
							this.state = 214;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 215;
						this.keyvaluepair();
						this.state = 219;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
						while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
							if (_alt === 1) {
								{
								{
								this.state = 216;
								this.match(PseudoParser.NEWLINE);
								}
								}
							}
							this.state = 221;
							this._errHandler.sync(this);
							_alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
						}
						}
						}
					}
					this.state = 226;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				}
				this.state = 228;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===20) {
					{
					this.state = 227;
					this.match(PseudoParser.COMMA);
					}
				}

				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===49) {
					{
					{
					this.state = 230;
					this.match(PseudoParser.NEWLINE);
					}
					}
					this.state = 235;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 238;
			this.match(PseudoParser.RCURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public setexpr(): SetexprContext {
		let localctx: SetexprContext = new SetexprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, PseudoParser.RULE_setexpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 240;
			this.match(PseudoParser.LCURLY);
			this.state = 244;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===49) {
				{
				{
				this.state = 241;
				this.match(PseudoParser.NEWLINE);
				}
				}
				this.state = 246;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235564040) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
				{
				this.state = 247;
				this.expr(0);
				this.state = 251;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 248;
						this.match(PseudoParser.NEWLINE);
						}
						}
					}
					this.state = 253;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				}
				this.state = 270;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 254;
						this.match(PseudoParser.COMMA);
						this.state = 258;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===49) {
							{
							{
							this.state = 255;
							this.match(PseudoParser.NEWLINE);
							}
							}
							this.state = 260;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 261;
						this.expr(0);
						this.state = 265;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
						while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
							if (_alt === 1) {
								{
								{
								this.state = 262;
								this.match(PseudoParser.NEWLINE);
								}
								}
							}
							this.state = 267;
							this._errHandler.sync(this);
							_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
						}
						}
						}
					}
					this.state = 272;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				}
				this.state = 274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===20) {
					{
					this.state = 273;
					this.match(PseudoParser.COMMA);
					}
				}

				this.state = 279;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===49) {
					{
					{
					this.state = 276;
					this.match(PseudoParser.NEWLINE);
					}
					}
					this.state = 281;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 284;
			this.match(PseudoParser.RCURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public keyvaluepair(): KeyvaluepairContext {
		let localctx: KeyvaluepairContext = new KeyvaluepairContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, PseudoParser.RULE_keyvaluepair);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 286;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 287;
			this.match(PseudoParser.COLON);
			this.state = 288;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fullid(): FullidContext {
		let localctx: FullidContext = new FullidContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, PseudoParser.RULE_fullid);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 290;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 294;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===26 || _la===29) {
				{
				{
				this.state = 291;
				this.accessor();
				}
				}
				this.state = 296;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public accessor(): AccessorContext {
		let localctx: AccessorContext = new AccessorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PseudoParser.RULE_accessor);
		try {
			this.state = 303;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				localctx = new IndexAccessorContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 297;
				this.match(PseudoParser.LBRACK);
				this.state = 298;
				this.expr(0);
				this.state = 299;
				this.match(PseudoParser.RBRACK);
				}
				break;
			case 29:
				localctx = new DotAccessorContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 301;
				this.match(PseudoParser.DOT);
				this.state = 302;
				this.match(PseudoParser.IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignstat(): AssignstatContext {
		let localctx: AssignstatContext = new AssignstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, PseudoParser.RULE_assignstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 305;
			this.fullid();
			this.state = 306;
			this.match(PseudoParser.ASSIGN);
			this.state = 307;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public whilestat(): WhilestatContext {
		let localctx: WhilestatContext = new WhilestatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, PseudoParser.RULE_whilestat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 309;
			this.match(PseudoParser.WHILE);
			this.state = 310;
			this.expr(0);
			this.state = 311;
			this.match(PseudoParser.DO);
			this.state = 312;
			this.match(PseudoParser.NEWLINE);
			this.state = 313;
			this.statlist();
			this.state = 314;
			this.match(PseudoParser.END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public repeatstat(): RepeatstatContext {
		let localctx: RepeatstatContext = new RepeatstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, PseudoParser.RULE_repeatstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 316;
			this.match(PseudoParser.REPEAT);
			this.state = 317;
			this.statlist();
			this.state = 318;
			this.match(PseudoParser.UNTIL);
			this.state = 319;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifstat(): IfstatContext {
		let localctx: IfstatContext = new IfstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, PseudoParser.RULE_ifstat);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.ifhead();
			this.state = 322;
			this.statlist();
			this.state = 329;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 323;
					this.match(PseudoParser.ELSE);
					this.state = 324;
					this.ifhead();
					this.state = 325;
					this.statlist();
					}
					}
				}
				this.state = 331;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
			}
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===16) {
				{
				this.state = 332;
				this.match(PseudoParser.ELSE);
				this.state = 333;
				this.match(PseudoParser.NEWLINE);
				this.state = 334;
				this.statlist();
				}
			}

			this.state = 337;
			this.match(PseudoParser.END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifhead(): IfheadContext {
		let localctx: IfheadContext = new IfheadContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, PseudoParser.RULE_ifhead);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 339;
			this.match(PseudoParser.IF);
			this.state = 340;
			this.expr(0);
			this.state = 341;
			this.match(PseudoParser.THEN);
			this.state = 342;
			this.match(PseudoParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forstat(): ForstatContext {
		let localctx: ForstatContext = new ForstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, PseudoParser.RULE_forstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 344;
			this.match(PseudoParser.FOR);
			this.state = 345;
			this.iterator();
			this.state = 346;
			this.match(PseudoParser.DO);
			this.state = 347;
			this.match(PseudoParser.NEWLINE);
			this.state = 348;
			this.statlist();
			this.state = 349;
			this.match(PseudoParser.END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iterator(): IteratorContext {
		let localctx: IteratorContext = new IteratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, PseudoParser.RULE_iterator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 351;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 352;
			this.match(PseudoParser.IN);
			this.state = 353;
			this.range();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public range(): RangeContext {
		let localctx: RangeContext = new RangeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, PseudoParser.RULE_range);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 355;
			this.expr(0);
			this.state = 356;
			this.match(PseudoParser.DOTDOT);
			this.state = 358;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 357;
				this.match(PseudoParser.EQUALS);
				}
			}

			this.state = 360;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public algorithm(): AlgorithmContext {
		let localctx: AlgorithmContext = new AlgorithmContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, PseudoParser.RULE_algorithm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 362;
			this.match(PseudoParser.FUNCTION);
			this.state = 363;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 364;
			this.arglist();
			this.state = 365;
			this.match(PseudoParser.NEWLINE);
			this.state = 366;
			this.statlist();
			this.state = 367;
			this.match(PseudoParser.END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arglist(): ArglistContext {
		let localctx: ArglistContext = new ArglistContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, PseudoParser.RULE_arglist);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 369;
			this.match(PseudoParser.LPAREN);
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===47) {
				{
				this.state = 370;
				this.match(PseudoParser.IDENTIFIER);
				this.state = 375;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===20) {
					{
					{
					this.state = 371;
					this.match(PseudoParser.COMMA);
					this.state = 372;
					this.match(PseudoParser.IDENTIFIER);
					}
					}
					this.state = 377;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 380;
			this.match(PseudoParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public funccall(): FunccallContext {
		let localctx: FunccallContext = new FunccallContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, PseudoParser.RULE_funccall);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 382;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 383;
			this.match(PseudoParser.LPAREN);
			this.state = 392;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235564040) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 127) !== 0)) {
				{
				this.state = 384;
				this.expr(0);
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===20) {
					{
					{
					this.state = 385;
					this.match(PseudoParser.COMMA);
					this.state = 386;
					this.expr(0);
					}
					}
					this.state = 391;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 394;
			this.match(PseudoParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 4:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 6);
		case 1:
			return this.precpred(this._ctx, 5);
		case 2:
			return this.precpred(this._ctx, 4);
		case 3:
			return this.precpred(this._ctx, 3);
		case 4:
			return this.precpred(this._ctx, 2);
		case 5:
			return this.precpred(this._ctx, 10);
		case 6:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,52,397,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,1,0,3,0,52,8,0,1,0,5,0,55,8,0,10,0,12,0,58,9,0,1,0,3,0,61,8,0,1,0,1,
	0,1,1,1,1,3,1,67,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,78,8,2,1,3,
	3,3,81,8,3,1,3,5,3,84,8,3,10,3,12,3,87,9,3,1,3,3,3,90,8,3,1,4,1,4,1,4,1,
	4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,111,8,
	4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,1,4,1,4,1,4,5,4,136,8,4,10,4,12,4,139,9,4,1,5,1,5,1,6,1,6,1,7,
	1,7,3,7,147,8,7,1,8,1,8,5,8,151,8,8,10,8,12,8,154,9,8,1,8,1,8,5,8,158,8,
	8,10,8,12,8,161,9,8,1,8,1,8,5,8,165,8,8,10,8,12,8,168,9,8,1,8,1,8,5,8,172,
	8,8,10,8,12,8,175,9,8,5,8,177,8,8,10,8,12,8,180,9,8,1,8,3,8,183,8,8,1,8,
	5,8,186,8,8,10,8,12,8,189,9,8,3,8,191,8,8,1,8,1,8,1,9,1,9,5,9,197,8,9,10,
	9,12,9,200,9,9,1,9,1,9,5,9,204,8,9,10,9,12,9,207,9,9,1,9,1,9,5,9,211,8,
	9,10,9,12,9,214,9,9,1,9,1,9,5,9,218,8,9,10,9,12,9,221,9,9,5,9,223,8,9,10,
	9,12,9,226,9,9,1,9,3,9,229,8,9,1,9,5,9,232,8,9,10,9,12,9,235,9,9,3,9,237,
	8,9,1,9,1,9,1,10,1,10,5,10,243,8,10,10,10,12,10,246,9,10,1,10,1,10,5,10,
	250,8,10,10,10,12,10,253,9,10,1,10,1,10,5,10,257,8,10,10,10,12,10,260,9,
	10,1,10,1,10,5,10,264,8,10,10,10,12,10,267,9,10,5,10,269,8,10,10,10,12,
	10,272,9,10,1,10,3,10,275,8,10,1,10,5,10,278,8,10,10,10,12,10,281,9,10,
	3,10,283,8,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,5,12,293,8,12,10,
	12,12,12,296,9,12,1,13,1,13,1,13,1,13,1,13,1,13,3,13,304,8,13,1,14,1,14,
	1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,
	17,1,17,1,17,1,17,1,17,1,17,5,17,328,8,17,10,17,12,17,331,9,17,1,17,1,17,
	1,17,3,17,336,8,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,
	19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,3,21,359,8,21,1,21,
	1,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,5,23,374,8,
	23,10,23,12,23,377,9,23,3,23,379,8,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,
	5,24,388,8,24,10,24,12,24,391,9,24,3,24,393,8,24,1,24,1,24,1,24,0,1,8,25,
	0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,0,
	4,1,0,42,43,2,0,32,33,35,36,1,0,30,31,2,0,18,18,37,41,439,0,56,1,0,0,0,
	2,66,1,0,0,0,4,77,1,0,0,0,6,85,1,0,0,0,8,110,1,0,0,0,10,140,1,0,0,0,12,
	142,1,0,0,0,14,144,1,0,0,0,16,148,1,0,0,0,18,194,1,0,0,0,20,240,1,0,0,0,
	22,286,1,0,0,0,24,290,1,0,0,0,26,303,1,0,0,0,28,305,1,0,0,0,30,309,1,0,
	0,0,32,316,1,0,0,0,34,321,1,0,0,0,36,339,1,0,0,0,38,344,1,0,0,0,40,351,
	1,0,0,0,42,355,1,0,0,0,44,362,1,0,0,0,46,369,1,0,0,0,48,382,1,0,0,0,50,
	52,3,2,1,0,51,50,1,0,0,0,51,52,1,0,0,0,52,53,1,0,0,0,53,55,5,49,0,0,54,
	51,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,0,56,57,1,0,0,0,57,60,1,0,0,0,58,56,
	1,0,0,0,59,61,3,2,1,0,60,59,1,0,0,0,60,61,1,0,0,0,61,62,1,0,0,0,62,63,5,
	0,0,1,63,1,1,0,0,0,64,67,3,4,2,0,65,67,3,44,22,0,66,64,1,0,0,0,66,65,1,
	0,0,0,67,3,1,0,0,0,68,78,3,28,14,0,69,78,3,30,15,0,70,78,3,32,16,0,71,78,
	3,34,17,0,72,78,3,38,19,0,73,78,3,8,4,0,74,78,3,10,5,0,75,78,3,14,7,0,76,
	78,3,12,6,0,77,68,1,0,0,0,77,69,1,0,0,0,77,70,1,0,0,0,77,71,1,0,0,0,77,
	72,1,0,0,0,77,73,1,0,0,0,77,74,1,0,0,0,77,75,1,0,0,0,77,76,1,0,0,0,78,5,
	1,0,0,0,79,81,3,4,2,0,80,79,1,0,0,0,80,81,1,0,0,0,81,82,1,0,0,0,82,84,5,
	49,0,0,83,80,1,0,0,0,84,87,1,0,0,0,85,83,1,0,0,0,85,86,1,0,0,0,86,89,1,
	0,0,0,87,85,1,0,0,0,88,90,3,4,2,0,89,88,1,0,0,0,89,90,1,0,0,0,90,7,1,0,
	0,0,91,92,6,4,-1,0,92,111,5,45,0,0,93,111,5,46,0,0,94,111,5,48,0,0,95,111,
	7,0,0,0,96,111,5,44,0,0,97,111,3,48,24,0,98,111,5,47,0,0,99,111,3,16,8,
	0,100,111,3,18,9,0,101,111,3,20,10,0,102,103,5,3,0,0,103,111,3,8,4,8,104,
	105,5,31,0,0,105,111,3,8,4,7,106,107,5,22,0,0,107,108,3,8,4,0,108,109,5,
	23,0,0,109,111,1,0,0,0,110,91,1,0,0,0,110,93,1,0,0,0,110,94,1,0,0,0,110,
	95,1,0,0,0,110,96,1,0,0,0,110,97,1,0,0,0,110,98,1,0,0,0,110,99,1,0,0,0,
	110,100,1,0,0,0,110,101,1,0,0,0,110,102,1,0,0,0,110,104,1,0,0,0,110,106,
	1,0,0,0,111,137,1,0,0,0,112,113,10,6,0,0,113,114,7,1,0,0,114,136,3,8,4,
	7,115,116,10,5,0,0,116,117,7,2,0,0,117,136,3,8,4,6,118,119,10,4,0,0,119,
	120,7,3,0,0,120,136,3,8,4,5,121,122,10,3,0,0,122,123,5,1,0,0,123,136,3,
	8,4,4,124,125,10,2,0,0,125,126,5,2,0,0,126,136,3,8,4,3,127,128,10,10,0,
	0,128,129,5,26,0,0,129,130,3,8,4,0,130,131,5,27,0,0,131,136,1,0,0,0,132,
	133,10,9,0,0,133,134,5,29,0,0,134,136,5,47,0,0,135,112,1,0,0,0,135,115,
	1,0,0,0,135,118,1,0,0,0,135,121,1,0,0,0,135,124,1,0,0,0,135,127,1,0,0,0,
	135,132,1,0,0,0,136,139,1,0,0,0,137,135,1,0,0,0,137,138,1,0,0,0,138,9,1,
	0,0,0,139,137,1,0,0,0,140,141,5,14,0,0,141,11,1,0,0,0,142,143,5,15,0,0,
	143,13,1,0,0,0,144,146,5,13,0,0,145,147,3,8,4,0,146,145,1,0,0,0,146,147,
	1,0,0,0,147,15,1,0,0,0,148,152,5,26,0,0,149,151,5,49,0,0,150,149,1,0,0,
	0,151,154,1,0,0,0,152,150,1,0,0,0,152,153,1,0,0,0,153,190,1,0,0,0,154,152,
	1,0,0,0,155,159,3,8,4,0,156,158,5,49,0,0,157,156,1,0,0,0,158,161,1,0,0,
	0,159,157,1,0,0,0,159,160,1,0,0,0,160,178,1,0,0,0,161,159,1,0,0,0,162,166,
	5,20,0,0,163,165,5,49,0,0,164,163,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,
	0,166,167,1,0,0,0,167,169,1,0,0,0,168,166,1,0,0,0,169,173,3,8,4,0,170,172,
	5,49,0,0,171,170,1,0,0,0,172,175,1,0,0,0,173,171,1,0,0,0,173,174,1,0,0,
	0,174,177,1,0,0,0,175,173,1,0,0,0,176,162,1,0,0,0,177,180,1,0,0,0,178,176,
	1,0,0,0,178,179,1,0,0,0,179,182,1,0,0,0,180,178,1,0,0,0,181,183,5,20,0,
	0,182,181,1,0,0,0,182,183,1,0,0,0,183,187,1,0,0,0,184,186,5,49,0,0,185,
	184,1,0,0,0,186,189,1,0,0,0,187,185,1,0,0,0,187,188,1,0,0,0,188,191,1,0,
	0,0,189,187,1,0,0,0,190,155,1,0,0,0,190,191,1,0,0,0,191,192,1,0,0,0,192,
	193,5,27,0,0,193,17,1,0,0,0,194,198,5,24,0,0,195,197,5,49,0,0,196,195,1,
	0,0,0,197,200,1,0,0,0,198,196,1,0,0,0,198,199,1,0,0,0,199,236,1,0,0,0,200,
	198,1,0,0,0,201,205,3,22,11,0,202,204,5,49,0,0,203,202,1,0,0,0,204,207,
	1,0,0,0,205,203,1,0,0,0,205,206,1,0,0,0,206,224,1,0,0,0,207,205,1,0,0,0,
	208,212,5,20,0,0,209,211,5,49,0,0,210,209,1,0,0,0,211,214,1,0,0,0,212,210,
	1,0,0,0,212,213,1,0,0,0,213,215,1,0,0,0,214,212,1,0,0,0,215,219,3,22,11,
	0,216,218,5,49,0,0,217,216,1,0,0,0,218,221,1,0,0,0,219,217,1,0,0,0,219,
	220,1,0,0,0,220,223,1,0,0,0,221,219,1,0,0,0,222,208,1,0,0,0,223,226,1,0,
	0,0,224,222,1,0,0,0,224,225,1,0,0,0,225,228,1,0,0,0,226,224,1,0,0,0,227,
	229,5,20,0,0,228,227,1,0,0,0,228,229,1,0,0,0,229,233,1,0,0,0,230,232,5,
	49,0,0,231,230,1,0,0,0,232,235,1,0,0,0,233,231,1,0,0,0,233,234,1,0,0,0,
	234,237,1,0,0,0,235,233,1,0,0,0,236,201,1,0,0,0,236,237,1,0,0,0,237,238,
	1,0,0,0,238,239,5,25,0,0,239,19,1,0,0,0,240,244,5,24,0,0,241,243,5,49,0,
	0,242,241,1,0,0,0,243,246,1,0,0,0,244,242,1,0,0,0,244,245,1,0,0,0,245,282,
	1,0,0,0,246,244,1,0,0,0,247,251,3,8,4,0,248,250,5,49,0,0,249,248,1,0,0,
	0,250,253,1,0,0,0,251,249,1,0,0,0,251,252,1,0,0,0,252,270,1,0,0,0,253,251,
	1,0,0,0,254,258,5,20,0,0,255,257,5,49,0,0,256,255,1,0,0,0,257,260,1,0,0,
	0,258,256,1,0,0,0,258,259,1,0,0,0,259,261,1,0,0,0,260,258,1,0,0,0,261,265,
	3,8,4,0,262,264,5,49,0,0,263,262,1,0,0,0,264,267,1,0,0,0,265,263,1,0,0,
	0,265,266,1,0,0,0,266,269,1,0,0,0,267,265,1,0,0,0,268,254,1,0,0,0,269,272,
	1,0,0,0,270,268,1,0,0,0,270,271,1,0,0,0,271,274,1,0,0,0,272,270,1,0,0,0,
	273,275,5,20,0,0,274,273,1,0,0,0,274,275,1,0,0,0,275,279,1,0,0,0,276,278,
	5,49,0,0,277,276,1,0,0,0,278,281,1,0,0,0,279,277,1,0,0,0,279,280,1,0,0,
	0,280,283,1,0,0,0,281,279,1,0,0,0,282,247,1,0,0,0,282,283,1,0,0,0,283,284,
	1,0,0,0,284,285,5,25,0,0,285,21,1,0,0,0,286,287,5,47,0,0,287,288,5,34,0,
	0,288,289,3,8,4,0,289,23,1,0,0,0,290,294,5,47,0,0,291,293,3,26,13,0,292,
	291,1,0,0,0,293,296,1,0,0,0,294,292,1,0,0,0,294,295,1,0,0,0,295,25,1,0,
	0,0,296,294,1,0,0,0,297,298,5,26,0,0,298,299,3,8,4,0,299,300,5,27,0,0,300,
	304,1,0,0,0,301,302,5,29,0,0,302,304,5,47,0,0,303,297,1,0,0,0,303,301,1,
	0,0,0,304,27,1,0,0,0,305,306,3,24,12,0,306,307,5,19,0,0,307,308,3,8,4,0,
	308,29,1,0,0,0,309,310,5,6,0,0,310,311,3,8,4,0,311,312,5,8,0,0,312,313,
	5,49,0,0,313,314,3,6,3,0,314,315,5,11,0,0,315,31,1,0,0,0,316,317,5,9,0,
	0,317,318,3,6,3,0,318,319,5,10,0,0,319,320,3,8,4,0,320,33,1,0,0,0,321,322,
	3,36,18,0,322,329,3,6,3,0,323,324,5,16,0,0,324,325,3,36,18,0,325,326,3,
	6,3,0,326,328,1,0,0,0,327,323,1,0,0,0,328,331,1,0,0,0,329,327,1,0,0,0,329,
	330,1,0,0,0,330,335,1,0,0,0,331,329,1,0,0,0,332,333,5,16,0,0,333,334,5,
	49,0,0,334,336,3,6,3,0,335,332,1,0,0,0,335,336,1,0,0,0,336,337,1,0,0,0,
	337,338,5,11,0,0,338,35,1,0,0,0,339,340,5,4,0,0,340,341,3,8,4,0,341,342,
	5,7,0,0,342,343,5,49,0,0,343,37,1,0,0,0,344,345,5,5,0,0,345,346,3,40,20,
	0,346,347,5,8,0,0,347,348,5,49,0,0,348,349,3,6,3,0,349,350,5,11,0,0,350,
	39,1,0,0,0,351,352,5,47,0,0,352,353,5,12,0,0,353,354,3,42,21,0,354,41,1,
	0,0,0,355,356,3,8,4,0,356,358,5,28,0,0,357,359,5,18,0,0,358,357,1,0,0,0,
	358,359,1,0,0,0,359,360,1,0,0,0,360,361,3,8,4,0,361,43,1,0,0,0,362,363,
	5,17,0,0,363,364,5,47,0,0,364,365,3,46,23,0,365,366,5,49,0,0,366,367,3,
	6,3,0,367,368,5,11,0,0,368,45,1,0,0,0,369,378,5,22,0,0,370,375,5,47,0,0,
	371,372,5,20,0,0,372,374,5,47,0,0,373,371,1,0,0,0,374,377,1,0,0,0,375,373,
	1,0,0,0,375,376,1,0,0,0,376,379,1,0,0,0,377,375,1,0,0,0,378,370,1,0,0,0,
	378,379,1,0,0,0,379,380,1,0,0,0,380,381,5,23,0,0,381,47,1,0,0,0,382,383,
	5,47,0,0,383,392,5,22,0,0,384,389,3,8,4,0,385,386,5,20,0,0,386,388,3,8,
	4,0,387,385,1,0,0,0,388,391,1,0,0,0,389,387,1,0,0,0,389,390,1,0,0,0,390,
	393,1,0,0,0,391,389,1,0,0,0,392,384,1,0,0,0,392,393,1,0,0,0,393,394,1,0,
	0,0,394,395,5,23,0,0,395,49,1,0,0,0,45,51,56,60,66,77,80,85,89,110,135,
	137,146,152,159,166,173,178,182,187,190,198,205,212,219,224,228,233,236,
	244,251,258,265,270,274,279,282,294,303,329,335,358,375,378,389,392];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PseudoParser.__ATN) {
			PseudoParser.__ATN = new ATNDeserializer().deserialize(PseudoParser._serializedATN);
		}

		return PseudoParser.__ATN;
	}


	static DecisionsToDFA = PseudoParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(PseudoParser.EOF, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, i);
	}
	public programstat_list(): ProgramstatContext[] {
		return this.getTypedRuleContexts(ProgramstatContext) as ProgramstatContext[];
	}
	public programstat(i: number): ProgramstatContext {
		return this.getTypedRuleContext(ProgramstatContext, i) as ProgramstatContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_program;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProgramstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stat(): StatContext {
		return this.getTypedRuleContext(StatContext, 0) as StatContext;
	}
	public algorithm(): AlgorithmContext {
		return this.getTypedRuleContext(AlgorithmContext, 0) as AlgorithmContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_programstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitProgramstat) {
			return visitor.visitProgramstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_stat;
	}
	public override copyFrom(ctx: StatContext): void {
		super.copyFrom(ctx);
	}
}
export class RepeatStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public repeatstat(): RepeatstatContext {
		return this.getTypedRuleContext(RepeatstatContext, 0) as RepeatstatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitRepeatStat) {
			return visitor.visitRepeatStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExprStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitExprStat) {
			return visitor.visitExprStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ForStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public forstat(): ForstatContext {
		return this.getTypedRuleContext(ForstatContext, 0) as ForstatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitForStat) {
			return visitor.visitForStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public returnstat(): ReturnstatContext {
		return this.getTypedRuleContext(ReturnstatContext, 0) as ReturnstatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitReturnStat) {
			return visitor.visitReturnStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public assignstat(): AssignstatContext {
		return this.getTypedRuleContext(AssignstatContext, 0) as AssignstatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitAssignStat) {
			return visitor.visitAssignStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BreakStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public breakstat(): BreakstatContext {
		return this.getTypedRuleContext(BreakstatContext, 0) as BreakstatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitBreakStat) {
			return visitor.visitBreakStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ContinueStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public continuestat(): ContinuestatContext {
		return this.getTypedRuleContext(ContinuestatContext, 0) as ContinuestatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitContinueStat) {
			return visitor.visitContinueStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ifstat(): IfstatContext {
		return this.getTypedRuleContext(IfstatContext, 0) as IfstatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIfStat) {
			return visitor.visitIfStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class WhileStatContext extends StatContext {
	constructor(parser: PseudoParser, ctx: StatContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public whilestat(): WhilestatContext {
		return this.getTypedRuleContext(WhilestatContext, 0) as WhilestatContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitWhileStat) {
			return visitor.visitWhileStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatlistContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, i);
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_statlist;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitStatlist) {
			return visitor.visitStatlist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_expr;
	}
	public override copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class DotAccessContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(PseudoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitDotAccess) {
			return visitor.visitDotAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegationContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NOT(): TerminalNode {
		return this.getToken(PseudoParser.NOT, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitNegation) {
			return visitor.visitNegation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdLiteralContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIdLiteral) {
			return visitor.visitIdLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FloatLiteralContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FLOAT(): TerminalNode {
		return this.getToken(PseudoParser.FLOAT, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitFloatLiteral) {
			return visitor.visitFloatLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexAccessContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public LBRACK(): TerminalNode {
		return this.getToken(PseudoParser.LBRACK, 0);
	}
	public RBRACK(): TerminalNode {
		return this.getToken(PseudoParser.RBRACK, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIndexAccess) {
			return visitor.visitIndexAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryMinusContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public MINUS(): TerminalNode {
		return this.getToken(PseudoParser.MINUS, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitUnaryMinus) {
			return visitor.visitUnaryMinus(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalOrContext extends ExprContext {
	public _op!: Token;
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public OR(): TerminalNode {
		return this.getToken(PseudoParser.OR, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitLogicalOr) {
			return visitor.visitLogicalOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FuncCallContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public funccall(): FunccallContext {
		return this.getTypedRuleContext(FunccallContext, 0) as FunccallContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitFuncCall) {
			return visitor.visitFuncCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayExprContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public arrayexpr(): ArrayexprContext {
		return this.getTypedRuleContext(ArrayexprContext, 0) as ArrayexprContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitArrayExpr) {
			return visitor.visitArrayExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeContext extends ExprContext {
	public _op!: Token;
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public STAR(): TerminalNode {
		return this.getToken(PseudoParser.STAR, 0);
	}
	public SLASH(): TerminalNode {
		return this.getToken(PseudoParser.SLASH, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(PseudoParser.DIV, 0);
	}
	public MOD(): TerminalNode {
		return this.getToken(PseudoParser.MOD, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitMultiplicative) {
			return visitor.visitMultiplicative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveContext extends ExprContext {
	public _op!: Token;
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(PseudoParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(PseudoParser.MINUS, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitAdditive) {
			return visitor.visitAdditive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLiteralContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(PseudoParser.STRING, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolLiteralContext extends ExprContext {
	public _value!: Token;
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TRUE(): TerminalNode {
		return this.getToken(PseudoParser.TRUE, 0);
	}
	public FALSE(): TerminalNode {
		return this.getToken(PseudoParser.FALSE, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitBoolLiteral) {
			return visitor.visitBoolLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ObjectExprContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public objectexpr(): ObjectexprContext {
		return this.getTypedRuleContext(ObjectexprContext, 0) as ObjectexprContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitObjectExpr) {
			return visitor.visitObjectExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SetExprContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public setexpr(): SetexprContext {
		return this.getTypedRuleContext(SetexprContext, 0) as SetexprContext;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitSetExpr) {
			return visitor.visitSetExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComparisonContext extends ExprContext {
	public _op!: Token;
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public GREATERTHAN(): TerminalNode {
		return this.getToken(PseudoParser.GREATERTHAN, 0);
	}
	public LESSTHAN(): TerminalNode {
		return this.getToken(PseudoParser.LESSTHAN, 0);
	}
	public LESSEQUAL(): TerminalNode {
		return this.getToken(PseudoParser.LESSEQUAL, 0);
	}
	public GREATEREQUAL(): TerminalNode {
		return this.getToken(PseudoParser.GREATEREQUAL, 0);
	}
	public EQUALS(): TerminalNode {
		return this.getToken(PseudoParser.EQUALS, 0);
	}
	public NOTEQUAL(): TerminalNode {
		return this.getToken(PseudoParser.NOTEQUAL, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitComparison) {
			return visitor.visitComparison(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NilLiteralContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NIL(): TerminalNode {
		return this.getToken(PseudoParser.NIL, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitNilLiteral) {
			return visitor.visitNilLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalAndContext extends ExprContext {
	public _op!: Token;
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public AND(): TerminalNode {
		return this.getToken(PseudoParser.AND, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitLogicalAnd) {
			return visitor.visitLogicalAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IntLiteralContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INT(): TerminalNode {
		return this.getToken(PseudoParser.INT, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIntLiteral) {
			return visitor.visitIntLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesesContext extends ExprContext {
	constructor(parser: PseudoParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(PseudoParser.LPAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(PseudoParser.RPAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitParentheses) {
			return visitor.visitParentheses(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BREAK(): TerminalNode {
		return this.getToken(PseudoParser.BREAK, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_breakstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitBreakstat) {
			return visitor.visitBreakstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinuestatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONTINUE(): TerminalNode {
		return this.getToken(PseudoParser.CONTINUE, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_continuestat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitContinuestat) {
			return visitor.visitContinuestat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RETURN(): TerminalNode {
		return this.getToken(PseudoParser.RETURN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_returnstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitReturnstat) {
			return visitor.visitReturnstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayexprContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LBRACK(): TerminalNode {
		return this.getToken(PseudoParser.LBRACK, 0);
	}
	public RBRACK(): TerminalNode {
		return this.getToken(PseudoParser.RBRACK, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, i);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PseudoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_arrayexpr;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitArrayexpr) {
			return visitor.visitArrayexpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectexprContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LCURLY(): TerminalNode {
		return this.getToken(PseudoParser.LCURLY, 0);
	}
	public RCURLY(): TerminalNode {
		return this.getToken(PseudoParser.RCURLY, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, i);
	}
	public keyvaluepair_list(): KeyvaluepairContext[] {
		return this.getTypedRuleContexts(KeyvaluepairContext) as KeyvaluepairContext[];
	}
	public keyvaluepair(i: number): KeyvaluepairContext {
		return this.getTypedRuleContext(KeyvaluepairContext, i) as KeyvaluepairContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PseudoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_objectexpr;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitObjectexpr) {
			return visitor.visitObjectexpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetexprContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LCURLY(): TerminalNode {
		return this.getToken(PseudoParser.LCURLY, 0);
	}
	public RCURLY(): TerminalNode {
		return this.getToken(PseudoParser.RCURLY, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, i);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PseudoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_setexpr;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitSetexpr) {
			return visitor.visitSetexpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyvaluepairContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(PseudoParser.COLON, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_keyvaluepair;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitKeyvaluepair) {
			return visitor.visitKeyvaluepair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FullidContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	public accessor_list(): AccessorContext[] {
		return this.getTypedRuleContexts(AccessorContext) as AccessorContext[];
	}
	public accessor(i: number): AccessorContext {
		return this.getTypedRuleContext(AccessorContext, i) as AccessorContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_fullid;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitFullid) {
			return visitor.visitFullid(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AccessorContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_accessor;
	}
	public override copyFrom(ctx: AccessorContext): void {
		super.copyFrom(ctx);
	}
}
export class DotAccessorContext extends AccessorContext {
	constructor(parser: PseudoParser, ctx: AccessorContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DOT(): TerminalNode {
		return this.getToken(PseudoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitDotAccessor) {
			return visitor.visitDotAccessor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexAccessorContext extends AccessorContext {
	constructor(parser: PseudoParser, ctx: AccessorContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(PseudoParser.LBRACK, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(PseudoParser.RBRACK, 0);
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIndexAccessor) {
			return visitor.visitIndexAccessor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fullid(): FullidContext {
		return this.getTypedRuleContext(FullidContext, 0) as FullidContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(PseudoParser.ASSIGN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_assignstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitAssignstat) {
			return visitor.visitAssignstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhilestatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WHILE(): TerminalNode {
		return this.getToken(PseudoParser.WHILE, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public DO(): TerminalNode {
		return this.getToken(PseudoParser.DO, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
	}
	public statlist(): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, 0) as StatlistContext;
	}
	public END(): TerminalNode {
		return this.getToken(PseudoParser.END, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_whilestat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitWhilestat) {
			return visitor.visitWhilestat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RepeatstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public REPEAT(): TerminalNode {
		return this.getToken(PseudoParser.REPEAT, 0);
	}
	public statlist(): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, 0) as StatlistContext;
	}
	public UNTIL(): TerminalNode {
		return this.getToken(PseudoParser.UNTIL, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_repeatstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitRepeatstat) {
			return visitor.visitRepeatstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ifhead_list(): IfheadContext[] {
		return this.getTypedRuleContexts(IfheadContext) as IfheadContext[];
	}
	public ifhead(i: number): IfheadContext {
		return this.getTypedRuleContext(IfheadContext, i) as IfheadContext;
	}
	public statlist_list(): StatlistContext[] {
		return this.getTypedRuleContexts(StatlistContext) as StatlistContext[];
	}
	public statlist(i: number): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, i) as StatlistContext;
	}
	public END(): TerminalNode {
		return this.getToken(PseudoParser.END, 0);
	}
	public ELSE_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.ELSE);
	}
	public ELSE(i: number): TerminalNode {
		return this.getToken(PseudoParser.ELSE, i);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_ifstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIfstat) {
			return visitor.visitIfstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfheadContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IF(): TerminalNode {
		return this.getToken(PseudoParser.IF, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public THEN(): TerminalNode {
		return this.getToken(PseudoParser.THEN, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_ifhead;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIfhead) {
			return visitor.visitIfhead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForstatContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(PseudoParser.FOR, 0);
	}
	public iterator(): IteratorContext {
		return this.getTypedRuleContext(IteratorContext, 0) as IteratorContext;
	}
	public DO(): TerminalNode {
		return this.getToken(PseudoParser.DO, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
	}
	public statlist(): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, 0) as StatlistContext;
	}
	public END(): TerminalNode {
		return this.getToken(PseudoParser.END, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_forstat;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitForstat) {
			return visitor.visitForstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IteratorContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	public IN(): TerminalNode {
		return this.getToken(PseudoParser.IN, 0);
	}
	public range(): RangeContext {
		return this.getTypedRuleContext(RangeContext, 0) as RangeContext;
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_iterator;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitIterator) {
			return visitor.visitIterator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public DOTDOT(): TerminalNode {
		return this.getToken(PseudoParser.DOTDOT, 0);
	}
	public EQUALS(): TerminalNode {
		return this.getToken(PseudoParser.EQUALS, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_range;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitRange) {
			return visitor.visitRange(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AlgorithmContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNCTION(): TerminalNode {
		return this.getToken(PseudoParser.FUNCTION, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	public arglist(): ArglistContext {
		return this.getTypedRuleContext(ArglistContext, 0) as ArglistContext;
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
	}
	public statlist(): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, 0) as StatlistContext;
	}
	public END(): TerminalNode {
		return this.getToken(PseudoParser.END, 0);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_algorithm;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitAlgorithm) {
			return visitor.visitAlgorithm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArglistContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(PseudoParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(PseudoParser.RPAREN, 0);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PseudoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_arglist;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitArglist) {
			return visitor.visitArglist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunccallContext extends ParserRuleContext {
	constructor(parser?: PseudoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PseudoParser.IDENTIFIER, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(PseudoParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(PseudoParser.RPAREN, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PseudoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PseudoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PseudoParser.RULE_funccall;
	}
	// @Override
	public accept<Result>(visitor: PseudoParserVisitor<Result>): Result {
		if (visitor.visitFunccall) {
			return visitor.visitFunccall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
