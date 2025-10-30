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
    ;

statlist
    : (stat | NEWLINE)*
    ;

expr
    : INT                               # IntLiteral
    | FLOAT                             # FloatLiteral
    | value=('true' | 'false')          # BoolLiteral
    | funccall                          # FuncCall
    | IDENTIFIER                        # IdLiteral
    | fullid                            # FullId
    | arrayexpr                         # ArrayExpr
    | 'not' expr                        # Negation
    | '-' expr                          # UnaryMinus
    | expr op=('*' | '/' | 'div' | 'mod') expr  # Multiplicative
    | expr op=('+' | '-') expr          # Additive
    | expr op=('>' | '<' | '<=' | '>=' | '=' | '!=') expr # Comparison
    | expr op='and' expr                # LogicalAnd
    | expr op='or' expr                 # LogicalOr
    | '(' expr ')'                      # Parentheses
    ;

arrayexpr
    : '[' (expr (',' expr)* ','?)? ']'
    ;

fullid
    : IDENTIFIER accessor*
    ;

accessor
    : '[' expr ']'                      # IndexAccessor
//  | '.' IDENTIFIER                    # DotAccessor
    ;

assignstat
    : IDENTIFIER ':=' expr NEWLINE
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