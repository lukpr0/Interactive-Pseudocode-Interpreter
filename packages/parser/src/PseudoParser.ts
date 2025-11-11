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
	public static readonly NEWLINE = 1;
	public static readonly AND = 2;
	public static readonly OR = 3;
	public static readonly NOT = 4;
	public static readonly IF = 5;
	public static readonly FOR = 6;
	public static readonly WHILE = 7;
	public static readonly THEN = 8;
	public static readonly DO = 9;
	public static readonly REPEAT = 10;
	public static readonly UNTIL = 11;
	public static readonly END = 12;
	public static readonly IN = 13;
	public static readonly RETURN = 14;
	public static readonly BREAK = 15;
	public static readonly CONTINUE = 16;
	public static readonly ELSE = 17;
	public static readonly FUNCTION = 18;
	public static readonly EQUALS = 19;
	public static readonly ASSIGN = 20;
	public static readonly COMMA = 21;
	public static readonly SEMI = 22;
	public static readonly LPAREN = 23;
	public static readonly RPAREN = 24;
	public static readonly LCURLY = 25;
	public static readonly RCURLY = 26;
	public static readonly LBRACK = 27;
	public static readonly RBRACK = 28;
	public static readonly DOTDOT = 29;
	public static readonly DOT = 30;
	public static readonly PLUS = 31;
	public static readonly MINUS = 32;
	public static readonly STAR = 33;
	public static readonly SLASH = 34;
	public static readonly COLON = 35;
	public static readonly DIV = 36;
	public static readonly MOD = 37;
	public static readonly LESSTHAN = 38;
	public static readonly GREATERTHAN = 39;
	public static readonly LESSEQUAL = 40;
	public static readonly GREATEREQUAL = 41;
	public static readonly NOTEQUAL = 42;
	public static readonly TRUE = 43;
	public static readonly FALSE = 44;
	public static readonly NIL = 45;
	public static readonly INT = 46;
	public static readonly FLOAT = 47;
	public static readonly IDENTIFIER = 48;
	public static readonly STRING = 49;
	public static readonly MULTILINECOMMENT = 50;
	public static readonly WHITESPACE = 51;
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
	public static readonly RULE_keyvaluepair = 10;
	public static readonly RULE_fullid = 11;
	public static readonly RULE_accessor = 12;
	public static readonly RULE_assignstat = 13;
	public static readonly RULE_whilestat = 14;
	public static readonly RULE_repeatstat = 15;
	public static readonly RULE_ifstat = 16;
	public static readonly RULE_ifhead = 17;
	public static readonly RULE_forstat = 18;
	public static readonly RULE_iterator = 19;
	public static readonly RULE_range = 20;
	public static readonly RULE_algorithm = 21;
	public static readonly RULE_arglist = 22;
	public static readonly RULE_funccall = 23;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            "'and'", "'or'", 
                                                            "'not'", "'if'", 
                                                            "'for'", "'while'", 
                                                            "'then'", "'do'", 
                                                            "'repeat'", 
                                                            "'until'", "'end'", 
                                                            "'in'", "'return'", 
                                                            "'break'", "'continue'", 
                                                            "'else'", "'function'", 
                                                            "'='", "':='", 
                                                            "','", "';'", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "']'", "'['", 
                                                            "'..'", "'.'", 
                                                            "'+'", "'-'", 
                                                            "'*'", "'/'", 
                                                            "':'", "'div'", 
                                                            "'mod'", "'<'", 
                                                            "'>'", "'<='", 
                                                            "'>='", "'!='", 
                                                            "'true'", "'false'", 
                                                            "'nil'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "NEWLINE", 
                                                             "AND", "OR", 
                                                             "NOT", "IF", 
                                                             "FOR", "WHILE", 
                                                             "THEN", "DO", 
                                                             "REPEAT", "UNTIL", 
                                                             "END", "IN", 
                                                             "RETURN", "BREAK", 
                                                             "CONTINUE", 
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
                                                             "STRING", "MULTILINECOMMENT", 
                                                             "WHITESPACE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "programstat", "stat", "statlist", "expr", "breakstat", "continuestat", 
		"returnstat", "arrayexpr", "objectexpr", "keyvaluepair", "fullid", "accessor", 
		"assignstat", "whilestat", "repeatstat", "ifstat", "ifhead", "forstat", 
		"iterator", "range", "algorithm", "arglist", "funccall",
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
			this.state = 54;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 49;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310756592) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
						{
						this.state = 48;
						this.programstat();
						}
					}

					this.state = 51;
					this.match(PseudoParser.NEWLINE);
					}
					}
				}
				this.state = 56;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310756592) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
				{
				this.state = 57;
				this.programstat();
				}
			}

			this.state = 60;
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
			this.state = 64;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 6:
			case 7:
			case 10:
			case 14:
			case 15:
			case 16:
			case 23:
			case 25:
			case 28:
			case 32:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 62;
				this.stat();
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 63;
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
			this.state = 75;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				localctx = new AssignStatContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 66;
				this.assignstat();
				}
				break;
			case 2:
				localctx = new WhileStatContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 67;
				this.whilestat();
				}
				break;
			case 3:
				localctx = new RepeatStatContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 68;
				this.repeatstat();
				}
				break;
			case 4:
				localctx = new IfStatContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 69;
				this.ifstat();
				}
				break;
			case 5:
				localctx = new ForStatContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 70;
				this.forstat();
				}
				break;
			case 6:
				localctx = new ExprStatContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 71;
				this.expr(0);
				}
				break;
			case 7:
				localctx = new BreakStatContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 72;
				this.breakstat();
				}
				break;
			case 8:
				localctx = new ReturnStatContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 73;
				this.returnstat();
				}
				break;
			case 9:
				localctx = new ContinueStatContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 74;
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
			this.state = 83;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 78;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310494448) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
						{
						this.state = 77;
						this.stat();
						}
					}

					this.state = 80;
					this.match(PseudoParser.NEWLINE);
					}
					}
				}
				this.state = 85;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 87;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310494448) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
				{
				this.state = 86;
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
			this.state = 107;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				{
				localctx = new IntLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 90;
				this.match(PseudoParser.INT);
				}
				break;
			case 2:
				{
				localctx = new FloatLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 91;
				this.match(PseudoParser.FLOAT);
				}
				break;
			case 3:
				{
				localctx = new StringLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 92;
				this.match(PseudoParser.STRING);
				}
				break;
			case 4:
				{
				localctx = new BoolLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 93;
				(localctx as BoolLiteralContext)._value = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===43 || _la===44)) {
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
				this.state = 94;
				this.match(PseudoParser.NIL);
				}
				break;
			case 6:
				{
				localctx = new FuncCallContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 95;
				this.funccall();
				}
				break;
			case 7:
				{
				localctx = new IdLiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 96;
				this.match(PseudoParser.IDENTIFIER);
				}
				break;
			case 8:
				{
				localctx = new ArrayExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 97;
				this.arrayexpr();
				}
				break;
			case 9:
				{
				localctx = new ObjectExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 98;
				this.objectexpr();
				}
				break;
			case 10:
				{
				localctx = new NegationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 99;
				this.match(PseudoParser.NOT);
				this.state = 100;
				this.expr(10);
				}
				break;
			case 11:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 101;
				this.match(PseudoParser.MINUS);
				this.state = 102;
				this.expr(9);
				}
				break;
			case 12:
				{
				localctx = new ParenthesesContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 103;
				this.match(PseudoParser.LPAREN);
				this.state = 104;
				this.expr(0);
				this.state = 105;
				this.match(PseudoParser.RPAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 134;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 132;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 109;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 110;
						(localctx as MultiplicativeContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 27) !== 0))) {
						    (localctx as MultiplicativeContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 111;
						this.expr(7);
						}
						break;
					case 2:
						{
						localctx = new AdditiveContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 112;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 113;
						(localctx as AdditiveContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===31 || _la===32)) {
						    (localctx as AdditiveContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 114;
						this.expr(6);
						}
						break;
					case 3:
						{
						localctx = new ComparisonContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 115;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 116;
						(localctx as ComparisonContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 19)) & ~0x1F) === 0 && ((1 << (_la - 19)) & 16252929) !== 0))) {
						    (localctx as ComparisonContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 117;
						this.expr(5);
						}
						break;
					case 4:
						{
						localctx = new LogicalAndContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 118;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 119;
						(localctx as LogicalAndContext)._op = this.match(PseudoParser.AND);
						this.state = 120;
						this.expr(4);
						}
						break;
					case 5:
						{
						localctx = new LogicalOrContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 121;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 122;
						(localctx as LogicalOrContext)._op = this.match(PseudoParser.OR);
						this.state = 123;
						this.expr(3);
						}
						break;
					case 6:
						{
						localctx = new IndexAccessContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 124;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 125;
						this.match(PseudoParser.RBRACK);
						this.state = 126;
						this.expr(0);
						this.state = 127;
						this.match(PseudoParser.LBRACK);
						}
						break;
					case 7:
						{
						localctx = new DotAccessContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, PseudoParser.RULE_expr);
						this.state = 129;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 130;
						this.match(PseudoParser.DOT);
						this.state = 131;
						this.match(PseudoParser.IDENTIFIER);
						}
						break;
					}
					}
				}
				this.state = 136;
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
			this.state = 137;
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
			this.state = 139;
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
			this.state = 141;
			this.match(PseudoParser.RETURN);
			this.state = 143;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310378512) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
				{
				this.state = 142;
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
			this.state = 145;
			this.match(PseudoParser.RBRACK);
			this.state = 157;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310378512) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
				{
				this.state = 146;
				this.expr(0);
				this.state = 151;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 147;
						this.match(PseudoParser.COMMA);
						this.state = 148;
						this.expr(0);
						}
						}
					}
					this.state = 153;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
				}
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 154;
					this.match(PseudoParser.COMMA);
					}
				}

				}
			}

			this.state = 159;
			this.match(PseudoParser.LBRACK);
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
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 161;
			this.match(PseudoParser.LCURLY);
			this.state = 167;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===48) {
				{
				this.state = 162;
				this.keyvaluepair();
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 163;
					this.match(PseudoParser.COMMA);
					this.state = 164;
					this.keyvaluepair();
					}
				}

				}
			}

			this.state = 169;
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
		this.enterRule(localctx, 20, PseudoParser.RULE_keyvaluepair);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 171;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 172;
			this.match(PseudoParser.COLON);
			this.state = 173;
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
		this.enterRule(localctx, 22, PseudoParser.RULE_fullid);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 175;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 179;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===28 || _la===30) {
				{
				{
				this.state = 176;
				this.accessor();
				}
				}
				this.state = 181;
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
		this.enterRule(localctx, 24, PseudoParser.RULE_accessor);
		try {
			this.state = 188;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
				localctx = new IndexAccessorContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 182;
				this.match(PseudoParser.RBRACK);
				this.state = 183;
				this.expr(0);
				this.state = 184;
				this.match(PseudoParser.LBRACK);
				}
				break;
			case 30:
				localctx = new DotAccessorContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 186;
				this.match(PseudoParser.DOT);
				this.state = 187;
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
		this.enterRule(localctx, 26, PseudoParser.RULE_assignstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 190;
			this.fullid();
			this.state = 191;
			this.match(PseudoParser.ASSIGN);
			this.state = 192;
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
		this.enterRule(localctx, 28, PseudoParser.RULE_whilestat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 194;
			this.match(PseudoParser.WHILE);
			this.state = 195;
			this.expr(0);
			this.state = 196;
			this.match(PseudoParser.DO);
			this.state = 198;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 197;
				this.match(PseudoParser.NEWLINE);
				}
				break;
			}
			this.state = 200;
			this.statlist();
			this.state = 201;
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
		this.enterRule(localctx, 30, PseudoParser.RULE_repeatstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 203;
			this.match(PseudoParser.REPEAT);
			this.state = 204;
			this.statlist();
			this.state = 205;
			this.match(PseudoParser.UNTIL);
			this.state = 206;
			this.expr(0);
			this.state = 208;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				{
				this.state = 207;
				this.match(PseudoParser.NEWLINE);
				}
				break;
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
	public ifstat(): IfstatContext {
		let localctx: IfstatContext = new IfstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, PseudoParser.RULE_ifstat);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 210;
			this.ifhead();
			this.state = 211;
			this.statlist();
			this.state = 218;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 212;
					this.match(PseudoParser.ELSE);
					this.state = 213;
					this.ifhead();
					this.state = 214;
					this.statlist();
					}
					}
				}
				this.state = 220;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
			}
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===17) {
				{
				this.state = 221;
				this.match(PseudoParser.ELSE);
				this.state = 223;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
				case 1:
					{
					this.state = 222;
					this.match(PseudoParser.NEWLINE);
					}
					break;
				}
				this.state = 225;
				this.statlist();
				}
			}

			this.state = 228;
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
		this.enterRule(localctx, 34, PseudoParser.RULE_ifhead);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this.match(PseudoParser.IF);
			this.state = 231;
			this.expr(0);
			this.state = 232;
			this.match(PseudoParser.THEN);
			this.state = 234;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 233;
				this.match(PseudoParser.NEWLINE);
				}
				break;
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
	public forstat(): ForstatContext {
		let localctx: ForstatContext = new ForstatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, PseudoParser.RULE_forstat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 236;
			this.match(PseudoParser.FOR);
			this.state = 237;
			this.iterator();
			this.state = 238;
			this.match(PseudoParser.DO);
			this.state = 240;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 239;
				this.match(PseudoParser.NEWLINE);
				}
				break;
			}
			this.state = 242;
			this.statlist();
			this.state = 243;
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
		this.enterRule(localctx, 38, PseudoParser.RULE_iterator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 245;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 246;
			this.match(PseudoParser.IN);
			this.state = 247;
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
		this.enterRule(localctx, 40, PseudoParser.RULE_range);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 249;
			this.expr(0);
			this.state = 250;
			this.match(PseudoParser.DOTDOT);
			this.state = 252;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 251;
				this.match(PseudoParser.EQUALS);
				}
			}

			this.state = 254;
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
		this.enterRule(localctx, 42, PseudoParser.RULE_algorithm);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 256;
			this.match(PseudoParser.FUNCTION);
			this.state = 257;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 258;
			this.arglist();
			this.state = 259;
			this.match(PseudoParser.NEWLINE);
			this.state = 260;
			this.statlist();
			this.state = 261;
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
		this.enterRule(localctx, 44, PseudoParser.RULE_arglist);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 263;
			this.match(PseudoParser.LPAREN);
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===48) {
				{
				this.state = 264;
				this.match(PseudoParser.IDENTIFIER);
				this.state = 269;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===21) {
					{
					{
					this.state = 265;
					this.match(PseudoParser.COMMA);
					this.state = 266;
					this.match(PseudoParser.IDENTIFIER);
					}
					}
					this.state = 271;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 274;
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
		this.enterRule(localctx, 46, PseudoParser.RULE_funccall);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 276;
			this.match(PseudoParser.IDENTIFIER);
			this.state = 277;
			this.match(PseudoParser.LPAREN);
			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 310378512) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 260097) !== 0)) {
				{
				this.state = 278;
				this.expr(0);
				this.state = 283;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===21) {
					{
					{
					this.state = 279;
					this.match(PseudoParser.COMMA);
					this.state = 280;
					this.expr(0);
					}
					}
					this.state = 285;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 288;
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
			return this.precpred(this._ctx, 8);
		case 6:
			return this.precpred(this._ctx, 7);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,51,291,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,1,0,3,
	0,50,8,0,1,0,5,0,53,8,0,10,0,12,0,56,9,0,1,0,3,0,59,8,0,1,0,1,0,1,1,1,1,
	3,1,65,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,76,8,2,1,3,3,3,79,8,
	3,1,3,5,3,82,8,3,10,3,12,3,85,9,3,1,3,3,3,88,8,3,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,108,8,4,1,4,1,4,1,
	4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,5,4,133,8,4,10,4,12,4,136,9,4,1,5,1,5,1,6,1,6,1,7,1,7,3,7,144,
	8,7,1,8,1,8,1,8,1,8,5,8,150,8,8,10,8,12,8,153,9,8,1,8,3,8,156,8,8,3,8,158,
	8,8,1,8,1,8,1,9,1,9,1,9,1,9,3,9,166,8,9,3,9,168,8,9,1,9,1,9,1,10,1,10,1,
	10,1,10,1,11,1,11,5,11,178,8,11,10,11,12,11,181,9,11,1,12,1,12,1,12,1,12,
	1,12,1,12,3,12,189,8,12,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,3,14,199,
	8,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,3,15,209,8,15,1,16,1,16,1,
	16,1,16,1,16,1,16,5,16,217,8,16,10,16,12,16,220,9,16,1,16,1,16,3,16,224,
	8,16,1,16,3,16,227,8,16,1,16,1,16,1,17,1,17,1,17,1,17,3,17,235,8,17,1,18,
	1,18,1,18,1,18,3,18,241,8,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,
	20,1,20,3,20,253,8,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,22,
	1,22,1,22,1,22,5,22,268,8,22,10,22,12,22,271,9,22,3,22,273,8,22,1,22,1,
	22,1,23,1,23,1,23,1,23,1,23,5,23,282,8,23,10,23,12,23,285,9,23,3,23,287,
	8,23,1,23,1,23,1,23,0,1,8,24,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
	32,34,36,38,40,42,44,46,0,4,1,0,43,44,2,0,33,34,36,37,1,0,31,32,2,0,19,
	19,38,42,319,0,54,1,0,0,0,2,64,1,0,0,0,4,75,1,0,0,0,6,83,1,0,0,0,8,107,
	1,0,0,0,10,137,1,0,0,0,12,139,1,0,0,0,14,141,1,0,0,0,16,145,1,0,0,0,18,
	161,1,0,0,0,20,171,1,0,0,0,22,175,1,0,0,0,24,188,1,0,0,0,26,190,1,0,0,0,
	28,194,1,0,0,0,30,203,1,0,0,0,32,210,1,0,0,0,34,230,1,0,0,0,36,236,1,0,
	0,0,38,245,1,0,0,0,40,249,1,0,0,0,42,256,1,0,0,0,44,263,1,0,0,0,46,276,
	1,0,0,0,48,50,3,2,1,0,49,48,1,0,0,0,49,50,1,0,0,0,50,51,1,0,0,0,51,53,5,
	1,0,0,52,49,1,0,0,0,53,56,1,0,0,0,54,52,1,0,0,0,54,55,1,0,0,0,55,58,1,0,
	0,0,56,54,1,0,0,0,57,59,3,2,1,0,58,57,1,0,0,0,58,59,1,0,0,0,59,60,1,0,0,
	0,60,61,5,0,0,1,61,1,1,0,0,0,62,65,3,4,2,0,63,65,3,42,21,0,64,62,1,0,0,
	0,64,63,1,0,0,0,65,3,1,0,0,0,66,76,3,26,13,0,67,76,3,28,14,0,68,76,3,30,
	15,0,69,76,3,32,16,0,70,76,3,36,18,0,71,76,3,8,4,0,72,76,3,10,5,0,73,76,
	3,14,7,0,74,76,3,12,6,0,75,66,1,0,0,0,75,67,1,0,0,0,75,68,1,0,0,0,75,69,
	1,0,0,0,75,70,1,0,0,0,75,71,1,0,0,0,75,72,1,0,0,0,75,73,1,0,0,0,75,74,1,
	0,0,0,76,5,1,0,0,0,77,79,3,4,2,0,78,77,1,0,0,0,78,79,1,0,0,0,79,80,1,0,
	0,0,80,82,5,1,0,0,81,78,1,0,0,0,82,85,1,0,0,0,83,81,1,0,0,0,83,84,1,0,0,
	0,84,87,1,0,0,0,85,83,1,0,0,0,86,88,3,4,2,0,87,86,1,0,0,0,87,88,1,0,0,0,
	88,7,1,0,0,0,89,90,6,4,-1,0,90,108,5,46,0,0,91,108,5,47,0,0,92,108,5,49,
	0,0,93,108,7,0,0,0,94,108,5,45,0,0,95,108,3,46,23,0,96,108,5,48,0,0,97,
	108,3,16,8,0,98,108,3,18,9,0,99,100,5,4,0,0,100,108,3,8,4,10,101,102,5,
	32,0,0,102,108,3,8,4,9,103,104,5,23,0,0,104,105,3,8,4,0,105,106,5,24,0,
	0,106,108,1,0,0,0,107,89,1,0,0,0,107,91,1,0,0,0,107,92,1,0,0,0,107,93,1,
	0,0,0,107,94,1,0,0,0,107,95,1,0,0,0,107,96,1,0,0,0,107,97,1,0,0,0,107,98,
	1,0,0,0,107,99,1,0,0,0,107,101,1,0,0,0,107,103,1,0,0,0,108,134,1,0,0,0,
	109,110,10,6,0,0,110,111,7,1,0,0,111,133,3,8,4,7,112,113,10,5,0,0,113,114,
	7,2,0,0,114,133,3,8,4,6,115,116,10,4,0,0,116,117,7,3,0,0,117,133,3,8,4,
	5,118,119,10,3,0,0,119,120,5,2,0,0,120,133,3,8,4,4,121,122,10,2,0,0,122,
	123,5,3,0,0,123,133,3,8,4,3,124,125,10,8,0,0,125,126,5,28,0,0,126,127,3,
	8,4,0,127,128,5,27,0,0,128,133,1,0,0,0,129,130,10,7,0,0,130,131,5,30,0,
	0,131,133,5,48,0,0,132,109,1,0,0,0,132,112,1,0,0,0,132,115,1,0,0,0,132,
	118,1,0,0,0,132,121,1,0,0,0,132,124,1,0,0,0,132,129,1,0,0,0,133,136,1,0,
	0,0,134,132,1,0,0,0,134,135,1,0,0,0,135,9,1,0,0,0,136,134,1,0,0,0,137,138,
	5,15,0,0,138,11,1,0,0,0,139,140,5,16,0,0,140,13,1,0,0,0,141,143,5,14,0,
	0,142,144,3,8,4,0,143,142,1,0,0,0,143,144,1,0,0,0,144,15,1,0,0,0,145,157,
	5,28,0,0,146,151,3,8,4,0,147,148,5,21,0,0,148,150,3,8,4,0,149,147,1,0,0,
	0,150,153,1,0,0,0,151,149,1,0,0,0,151,152,1,0,0,0,152,155,1,0,0,0,153,151,
	1,0,0,0,154,156,5,21,0,0,155,154,1,0,0,0,155,156,1,0,0,0,156,158,1,0,0,
	0,157,146,1,0,0,0,157,158,1,0,0,0,158,159,1,0,0,0,159,160,5,27,0,0,160,
	17,1,0,0,0,161,167,5,25,0,0,162,165,3,20,10,0,163,164,5,21,0,0,164,166,
	3,20,10,0,165,163,1,0,0,0,165,166,1,0,0,0,166,168,1,0,0,0,167,162,1,0,0,
	0,167,168,1,0,0,0,168,169,1,0,0,0,169,170,5,26,0,0,170,19,1,0,0,0,171,172,
	5,48,0,0,172,173,5,35,0,0,173,174,3,8,4,0,174,21,1,0,0,0,175,179,5,48,0,
	0,176,178,3,24,12,0,177,176,1,0,0,0,178,181,1,0,0,0,179,177,1,0,0,0,179,
	180,1,0,0,0,180,23,1,0,0,0,181,179,1,0,0,0,182,183,5,28,0,0,183,184,3,8,
	4,0,184,185,5,27,0,0,185,189,1,0,0,0,186,187,5,30,0,0,187,189,5,48,0,0,
	188,182,1,0,0,0,188,186,1,0,0,0,189,25,1,0,0,0,190,191,3,22,11,0,191,192,
	5,20,0,0,192,193,3,8,4,0,193,27,1,0,0,0,194,195,5,7,0,0,195,196,3,8,4,0,
	196,198,5,9,0,0,197,199,5,1,0,0,198,197,1,0,0,0,198,199,1,0,0,0,199,200,
	1,0,0,0,200,201,3,6,3,0,201,202,5,12,0,0,202,29,1,0,0,0,203,204,5,10,0,
	0,204,205,3,6,3,0,205,206,5,11,0,0,206,208,3,8,4,0,207,209,5,1,0,0,208,
	207,1,0,0,0,208,209,1,0,0,0,209,31,1,0,0,0,210,211,3,34,17,0,211,218,3,
	6,3,0,212,213,5,17,0,0,213,214,3,34,17,0,214,215,3,6,3,0,215,217,1,0,0,
	0,216,212,1,0,0,0,217,220,1,0,0,0,218,216,1,0,0,0,218,219,1,0,0,0,219,226,
	1,0,0,0,220,218,1,0,0,0,221,223,5,17,0,0,222,224,5,1,0,0,223,222,1,0,0,
	0,223,224,1,0,0,0,224,225,1,0,0,0,225,227,3,6,3,0,226,221,1,0,0,0,226,227,
	1,0,0,0,227,228,1,0,0,0,228,229,5,12,0,0,229,33,1,0,0,0,230,231,5,5,0,0,
	231,232,3,8,4,0,232,234,5,8,0,0,233,235,5,1,0,0,234,233,1,0,0,0,234,235,
	1,0,0,0,235,35,1,0,0,0,236,237,5,6,0,0,237,238,3,38,19,0,238,240,5,9,0,
	0,239,241,5,1,0,0,240,239,1,0,0,0,240,241,1,0,0,0,241,242,1,0,0,0,242,243,
	3,6,3,0,243,244,5,12,0,0,244,37,1,0,0,0,245,246,5,48,0,0,246,247,5,13,0,
	0,247,248,3,40,20,0,248,39,1,0,0,0,249,250,3,8,4,0,250,252,5,29,0,0,251,
	253,5,19,0,0,252,251,1,0,0,0,252,253,1,0,0,0,253,254,1,0,0,0,254,255,3,
	8,4,0,255,41,1,0,0,0,256,257,5,18,0,0,257,258,5,48,0,0,258,259,3,44,22,
	0,259,260,5,1,0,0,260,261,3,6,3,0,261,262,5,12,0,0,262,43,1,0,0,0,263,272,
	5,23,0,0,264,269,5,48,0,0,265,266,5,21,0,0,266,268,5,48,0,0,267,265,1,0,
	0,0,268,271,1,0,0,0,269,267,1,0,0,0,269,270,1,0,0,0,270,273,1,0,0,0,271,
	269,1,0,0,0,272,264,1,0,0,0,272,273,1,0,0,0,273,274,1,0,0,0,274,275,5,24,
	0,0,275,45,1,0,0,0,276,277,5,48,0,0,277,286,5,23,0,0,278,283,3,8,4,0,279,
	280,5,21,0,0,280,282,3,8,4,0,281,279,1,0,0,0,282,285,1,0,0,0,283,281,1,
	0,0,0,283,284,1,0,0,0,284,287,1,0,0,0,285,283,1,0,0,0,286,278,1,0,0,0,286,
	287,1,0,0,0,287,288,1,0,0,0,288,289,5,24,0,0,289,47,1,0,0,0,31,49,54,58,
	64,75,78,83,87,107,132,134,143,151,155,157,165,167,179,188,198,208,218,
	223,226,234,240,252,269,272,283,286];

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
	public RBRACK(): TerminalNode {
		return this.getToken(PseudoParser.RBRACK, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(PseudoParser.LBRACK, 0);
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
	public RBRACK(): TerminalNode {
		return this.getToken(PseudoParser.RBRACK, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(PseudoParser.LBRACK, 0);
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
	public keyvaluepair_list(): KeyvaluepairContext[] {
		return this.getTypedRuleContexts(KeyvaluepairContext) as KeyvaluepairContext[];
	}
	public keyvaluepair(i: number): KeyvaluepairContext {
		return this.getTypedRuleContext(KeyvaluepairContext, i) as KeyvaluepairContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(PseudoParser.COMMA, 0);
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
	public RBRACK(): TerminalNode {
		return this.getToken(PseudoParser.RBRACK, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public LBRACK(): TerminalNode {
		return this.getToken(PseudoParser.LBRACK, 0);
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
	public statlist(): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, 0) as StatlistContext;
	}
	public END(): TerminalNode {
		return this.getToken(PseudoParser.END, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
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
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
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
	public statlist(): StatlistContext {
		return this.getTypedRuleContext(StatlistContext, 0) as StatlistContext;
	}
	public END(): TerminalNode {
		return this.getToken(PseudoParser.END, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(PseudoParser.NEWLINE, 0);
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
