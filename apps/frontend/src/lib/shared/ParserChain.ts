import { AstBuilderVisitor, type Tree } from "@interactive-pseudo/interpreter";
import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
import { CharStream, CommonTokenStream } from "antlr4";

export function parserChain(code: string): Tree {
    const chars = new CharStream(code);
    const lexer = new PseudoLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PseudoParser(tokens);
    const tree = parser.program();

    const visitor = new AstBuilderVisitor()
    const ast = tree.accept(visitor);
    return ast;
}