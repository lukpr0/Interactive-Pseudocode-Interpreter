// DELETE THIS CONTENT IF YOU PUT COMBINED GRAMMAR IN Parser TAB
lexer grammar PseudoLexer;

AND : 'and' ;
OR : 'or' ;
NOT : 'not' ;
IF: 'if';
FOR: 'for';
WHILE: 'while';
THEN: 'then';
DO: 'do';
REPEAT: 'repeat';
UNTIL: 'until';
END: 'end';
IN: 'in';
RETURN: 'return';
ELSE: 'else';
EQ : '=' ;
ASSIGN : ':=' ;
COMMA : ',' ;
SEMI : ';' ;
LPAREN : '(' ;
RPAREN : ')' ;
LCURLY : '{' ;
RCURLY : '}' ;
LBRACK : ']' ;
RBRACK : '[' ;
DOTDOT : '..';
DOT: '.';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
COLON: ':';
DIV: 'div';

LT: '<';
GT: '>';
LE: '<=';
GE: '>=';
NE: '!=';

TRUE: 'true';
FALSE: 'false';

INT : [0-9]+ ;

NL: '\r'?'\n' ;

ID: [a-zA-Z_][a-zA-Z_0-9]* ;
STR : '"'.*?'"' ;

WS: [ \t\f]+ -> skip ;