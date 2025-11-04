parser grammar PseudoParser;
options { tokenVocab=PseudoLexer; }

program
    : (programstat | NEWLINE)* EOF
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
    ;

statlist
    : (stat | NEWLINE)*
    ;

expr
    : INT                               # IntLiteral
    | FLOAT                             # FloatLiteral
    | STRING                            # StringLiteral
    | value=('true' | 'false')          # BoolLiteral
    | NIL                               # NilLiteral
    | funccall                          # FuncCall
    | IDENTIFIER                        # IdLiteral
    | arrayexpr                         # ArrayExpr
    | objectexpr                        # ObjectExpr
    | 'not' expr                        # Negation
    | '-' expr                          # UnaryMinus
    | expr '[' expr ']'                 # IndexAccess
    | expr '.' IDENTIFIER               # DotAccess
    | expr op=('*' | '/' | 'div' | 'mod') expr  # Multiplicative
    | expr op=('+' | '-') expr          # Additive
    | expr op=('>' | '<' | '<=' | '>=' | '=' | '!=') expr # Comparison
    | expr op='and' expr                # LogicalAnd
    | expr op='or' expr                 # LogicalOr
    | '(' expr ')'                      # Parentheses
    ;

breakstat
    : 'break'
    ;

returnstat
    : 'return' expr?;

arrayexpr
    : '[' (expr (',' expr)* ','?)? ']'
    ;

objectexpr
    : '{' (keyvaluepair (',' keyvaluepair)?)? '}'
    ;

keyvaluepair
    : IDENTIFIER ':' expr
    ;

fullid
    : IDENTIFIER accessor*
    ;

accessor
    : '[' expr ']'                      # IndexAccessor
    | '.' IDENTIFIER                    # DotAccessor
    ;

assignstat
    : fullid ':=' expr NEWLINE
    ;

whilestat
    : 'while' expr 'do' NEWLINE? statlist 'end'
    ;

repeatstat
    : 'repeat' statlist 'until' expr NEWLINE?
    ;

ifstat
    : ifhead statlist ('else' ifhead statlist)* ('else' NEWLINE? statlist)? 'end'
    ;

ifhead
    : 'if' expr 'then' NEWLINE?
    ;

forstat
    : 'for' iterator 'do' NEWLINE? statlist 'end'
    ;

iterator
    : IDENTIFIER 'in' range
    ;

range
    : expr '..' '='? expr
    ;

algorithm
    : 'function' IDENTIFIER arglist NEWLINE statlist 'end' 
    ;

arglist
    : '(' IDENTIFIER (',' IDENTIFIER)* ')'
    ;

funccall
    : IDENTIFIER '(' expr (',' expr)* ')'
    ;