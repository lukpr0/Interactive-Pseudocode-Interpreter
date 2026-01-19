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
BREAK: 'break';
CONTINUE: 'continue';
ELSE: 'else';
FUNCTION: 'function';
UNION: 'union';
INTERSECT: 'intersect';
EQUALS : '=' ;
ASSIGN : ':=' ;
COMMA : ',' ;
SEMI : ';' ;
LPAREN : '(' ;
RPAREN : ')' ;
LCURLY : '{' ;
RCURLY : '}' ;
LBRACK : '[' ;
RBRACK : ']' ;
DOTDOT : '..';
DOT: '.';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
BACKSLASH: '\\';
COLON: ':';
DIV: 'div';
MOD: 'mod';

LESSTHAN: '<';
GREATERTHAN: '>';
LESSEQUAL: '<=';
GREATEREQUAL: '>=';
NOTEQUAL: '!=';


TRUE: 'true';
FALSE: 'false';
NIL: 'nil';

INT : [0-9]+ ;
FLOAT
    : [0-9]* '.' [0-9]+ 
    | [0-9]+ '.' [0-9]*
    ;

IDENTIFIER: [a-zA-Z_][a-zA-Z_0-9]* ;
STRING : '"'.*?'"' ;

NEWLINE: '\r'?'\n' ;

SINGLE_LINE_COMMENT: '//' ~[\r\n]* -> skip ;
MULTI_LINE_COMMENT: '/*' .*? '*/' -> skip;
WHITESPACE: [ \t\f]+ -> skip ;