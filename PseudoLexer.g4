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
EQUALS : '=' ;
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

LESSTHAN: '<';
GREATERTHAN: '>';
LESSEQUAL: '<=';
GREATEREQUAL: '>=';
NOTEQUAL: '!=';

TRUE: 'true';
FALSE: 'false';

INT : [0-9]+ ;

NEWLINE: '\r'?'\n' ;

IDENTIFIER: [a-zA-Z_][a-zA-Z_0-9]* ;
STRING : '"'.*?'"' ;

WHITESPACE: [ \t\f]+ -> skip ;