parser grammar PseudoParser;
options { tokenVocab=PseudoLexer; }

program
    : (programstat | NEWLINE)* EOF
    ;
    

programstat
    : stat
    ;

stat
    : assignstat                        # AssignStat
    | whilestat                         # WhileStat
    | repeatstat                        # RepeatStat
    ;

statlist
    : (stat | NEWLINE)*
    ;

expr
    : INT                               # IntLiteral
    | FLOAT                             # FloatLiteral
    | value=('true' | 'false')                # BoolLiteral
    | IDENTIFIER                        # IdLiteral
    | 'not' expr                        # Negation
    | '-' expr                          # UnaryMinus
    | expr op=('*' | '/' | 'div' | 'mod') expr  # Multiplicative
    | expr op=('+' | '-') expr          # Additive
    | expr op=('>' | '<' | '<=' | '>=' | '=' | '!=') expr # Comparison
    | expr op='and' expr                # LogicalAnd
    | expr op='or' expr                 # LogicalOr
    | '(' expr ')'                      # Parentheses
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