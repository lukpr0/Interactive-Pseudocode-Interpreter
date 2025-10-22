parser grammar PseudoParser;
options { tokenVocab=PseudoLexer; }

program
    : (programstat | NL)* EOF
    ;
    

programstat
    : stat
    | algorithm
    ;

stat
    : assignstat
    | expr (NL | EOF)
    | ifstat
    | forstat
    | whilestat
    | repeatstat
    | 'return' expr
    ;

algorithm
    : ID arglist NL statlist 'end' 
    ;

arglist
    : '(' ID (',' ID)* ')'
    ;

statlist
    : (stat | NL)*
    ;

setexpr
    : '{' (expr (',' expr)* ','?)? '}'
    ;

arrayexpr
    : '[' (expr (',' expr)* ','?)? ']'
    ;

tupleexpr
    : '(' (expr (',' expr)* ','?)? ')'
    ;

objectexpr
    : '{' (keyvaluepair (',' keyvaluepair)?)? '}'
    ;

keyvaluepair
    : ID ':' expr
    ;

expr
    : fullid
    | separatedids
    | INT
    | STR
    | ID 'in' fullid
    | setexpr
    | arrayexpr
    | tupleexpr
    | objectexpr
    | func
    | 'not' expr
    | expr 'and' expr
    | expr 'or' expr
    | expr ('>' | '=' | '<' | '>=' | '<=' | '!=') expr
    | expr ('*' | '/' | 'div') expr
    | expr ('+' | '-') expr
    | '-' expr
    | '(' expr ')'
    ;

ifstat
    : ifhead statlist ('else' ifhead statlist)* ('else' NL? statlist)? 'end'
    ;

ifhead
    : 'if' expr 'then' NL?
    ;

forstat
    : 'for' iterator 'do' NL? statlist 'end'
    ;

whilestat
    : 'while' expr 'do' NL? statlist 'end'
    ;

repeatstat
    : 'repeat' statlist 'until' expr NL?
    ;

assignstat
    : separatedids ':=' expr NL
    ;

separatedids
    : fullid (',' fullid)*
    ;

fullid
    : ID('[' expr ']')* ('.' ID ('[' expr ']')*)*
    ;

iterator
    : ID 'in' fullid
    | ID 'in' range
    ;

range
    : expr '..' '='? expr
    ;

func
    : ID '(' expr (',' expr)* ')'
    ;

stmt
    : expr ';' NL
    ;