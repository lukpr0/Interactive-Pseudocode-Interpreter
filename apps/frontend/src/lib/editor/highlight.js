import { styleTags, tags as t } from "@lezer/highlight";

export const pseudoHighlighting = styleTags({
  STRING: t.string,
  "FLOAT INT": t.number,
  "TRUE FALSE NIL": t.atom,
  "funccall/IDENTIFIER": t.function(t.definition(t.name)),
  "atomicexpr/IDENTIFIER": t.definition(t.variableName),
  Null: t.null,
  "COMMA": t.separator,
  "": t.squareBracket,
  "": t.brace,
	"LBRACK RBRACK LCURLY RCURLY LPAREN RPAREN": t.paren,
	" ASSIGN DOTDOT DOT PLUS MINUS COLON LESSTHAN GREATHERTHAN LESSEQUAL GREATEREQUAL EQUALS NOTEQUAL STAR SLASH DIV MOD UNION INTERSECT BACKSLASH": t.operator,
	"AND OR NOT IF FOR WHILE THEN DO REPEAT UNTIL END IN RETURN BREAK CONTINUE ELSE  FUNCTION": t.keyword,
	"COMMENT": t.comment
});

// A very dim/dull syntax highlighting so you have something to look at, but also to trigger you to write your own ;)
// Also shows that you can use `export let extension = [...]`, to add extensions to the "demo text" editor.
//#41e44b  4645ca
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
const syntax_colors = syntaxHighlighting(
  HighlightStyle.define(
    [
      { tag: t.name, color: "#43002c" },
      { tag: t.propertyName, color: "#41d6e4", fontWeight: "bold" },
      { tag: t.comment, color: "#437e43" },
      { tag: t.atom, color: "#a25496" },
			{ tag: t.string, color: "#794646" },

      { tag: t.literal, color: "#cc8bff" },
      { tag: t.unit, color: "#7b87b8" },
      { tag: t.null, color: "#7b87b8" },

      { tag: t.keyword, color: "#4645ca" },
      { tag: t.punctuation, color: "#a7a7a7" },
      { tag: t.derefOperator, color: "#585858" },
      { tag: t.special(t.brace), fontWeight: 700 },

			{ tag: t.paren, color: "#ffff00" },
      { tag: t.operator, color: "#a9a9a9" },
      { tag: t.self, color: "white" },
      { tag: t.function(t.punctuation), color: "white" },
      { tag: t.special(t.logicOperator), color: "white", fontWeight: "bold" },
      { tag: t.moduleKeyword, color: "white", fontWeight: "bold" },
      { tag: t.controlKeyword, color: "white", fontWeight: "bold" },
      { tag: t.controlOperator, color: "white", fontWeight: "bold" },
    ],
    { all: { color: "#8d2828" } }
  )
);

export let extensions = [syntax_colors];