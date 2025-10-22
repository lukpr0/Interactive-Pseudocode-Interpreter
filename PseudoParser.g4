parser grammar PseudoParser;
options { tokenVocab=PseudoLexer; }

program
    : (programstat | NEWLINE)* EOF
    ;
    

programstat
    : stat
    ;

stat
    : assignstat
    | expr (NEWLINE | EOF)
    ;

statlist
    : (stat | NEWLINE)*
    ;

expr
    : INT
    | expr ('*' | '/' | 'div') expr
    | expr ('+' | '-') expr
    | '-' expr
    | '(' expr ')'
    ;

assignstat
    : IDENTIFIER ':=' expr NEWLINE
    ;

