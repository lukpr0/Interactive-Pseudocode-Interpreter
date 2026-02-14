parser grammar PseudoParser;
options { tokenVocab=PseudoLexer; }

program
    : (programstat? NEWLINE)* programstat? EOF
    ;
    

programstat
    : stat
    | algorithm
    ;

stat
    : assignstat                        # AssignStat
    | whilestat                         # WhileStat
    | repeatstat                        # RepeatStat
    | ifstat                            # IfStat
    | forstat                           # ForStat
    | expr                              # ExprStat
    | breakstat                         # BreakStat
    | returnstat                        # ReturnStat
    | continuestat                      # ContinueStat
    ;

statlist
    : (stat? NEWLINE)* stat?
    ;

expr
    : INT                               # IntLiteral
    | FLOAT                             # FloatLiteral
    | STRING                            # StringLiteral
    | value=('true' | 'false')          # BoolLiteral
    | NIL                               # NilLiteral
    | IDENTIFIER                        # IdLiteral
    | funccall                          # FuncCall
    | '(' expr ')'                      # Parentheses
    | arrayexpr                         # ArrayExpr
    | setexpr                           # SetExpr
    | objectexpr                        # ObjectExpr
    | dictexpr                          # DictExpr
    | tupleexpr                         # TupleExpr
    | expr '[' expr ']'                 # IndexAccess
    | expr '.' IDENTIFIER               # DotAccess
    | expr op='in' expr                 # InQuery
    | 'not' expr                        # Negation
    | '-' expr                          # UnaryMinus
    | expr op='intersect' expr          # SetIntersect
    | expr op='union' expr              # SetUnion
    | expr op='\\' expr                 # SetDifference
    | expr op=('*' | '/' | 'div' | 'mod') expr  # Multiplicative
    | expr op=('+' | '-') expr          # Additive
    | expr op=('>' | '<' | '<=' | '>=' | '=' | '!=') expr # Comparison
    | expr op='and' expr                # LogicalAnd
    | expr op='or' expr                 # LogicalOr
    ;

breakstat
    : 'break'
    ;

continuestat
    : 'continue'
    ;

returnstat
    : 'return' expr?;

arrayexpr
    : '[' NEWLINE* (expr NEWLINE* (',' NEWLINE* expr NEWLINE*)* ','? NEWLINE* )? ']'
    ;

dictexpr
    : '[' NEWLINE* (dictpair NEWLINE* (',' NEWLINE* dictpair NEWLINE*)* ','? NEWLINE*)? ']'
    ;

dictpair
    : key=expr ':' value=expr
    ;

objectexpr
    : '{' NEWLINE* (keyvaluepair NEWLINE* (',' NEWLINE* keyvaluepair NEWLINE*)* ','? NEWLINE* )? '}'
    ;

setexpr
    : '{' NEWLINE* (expr NEWLINE* (',' NEWLINE* expr NEWLINE*)* ','? NEWLINE* )? '}'
    ;

tupleexpr
    : '(' NEWLINE* (expr NEWLINE* (',' NEWLINE* expr NEWLINE*)* ','? NEWLINE* )? ')'
    ;

keyvaluepair
    : IDENTIFIER ':' expr
    ;

lexpr
    : lexpr_part (',' lexpr_part)*
    ;

lexpr_part
    : IDENTIFIER accessor*
    ;

accessor
    : '[' expr ']'                      # IndexAccessor
    | '.' IDENTIFIER                    # DotAccessor
    ;

assignstat
    : lexpr ':=' expr
    ;

whilestat
    : 'while' expr 'do' NEWLINE statlist 'end'
    ;

repeatstat
    : 'repeat' statlist 'until' expr
    ;

ifstat
    : ifhead statlist ('else' ifhead statlist)* ('else' NEWLINE statlist)? 'end'
    ;

ifhead
    : 'if' expr 'then' NEWLINE
    ;

forstat
    : 'for' iterator 'do' NEWLINE statlist 'end'
    ;

iterator
    : lexpr 'in' range     # RangeIterator
    | lexpr 'in' expr      # ExprIterator
    ;

range
    : expr '..' '='? expr
    ;

algorithm
    : 'function' IDENTIFIER arglist NEWLINE statlist 'end' 
    ;

arglist
    : '(' ( IDENTIFIER (',' IDENTIFIER)* )? ')'
    ;

funccall
    : IDENTIFIER '(' ( expr (',' expr)* )? ')'
    ;