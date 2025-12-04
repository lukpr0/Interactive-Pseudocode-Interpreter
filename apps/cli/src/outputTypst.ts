import { promises as fs } from 'fs'
import { CharStream, CommonTokenStream } from 'antlr4'
import { PseudoLexer, PseudoParser } from '@interactive-pseudo/parser';
import { AstBuilderVisitor, ASTPrinter, FunctionTree, InterpretingVisitor, Slot, SymbolTable, Type } from '@interactive-pseudo/interpreter';
import { TypstVisitor } from './typstVisitor.js';
import { LatexVisitor } from './latexVisitor.js';

const fileName = process.argv[2]
console.log("file:", fileName)
const file = await fs.readFile(fileName!, 'utf8');
//const file = await fs.readFile('./Algorithms/BinarySearch.pseudo', 'utf8');




//Parse input
const chars = new CharStream(file);
const lexer = new PseudoLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new PseudoParser(tokens);
const tree = parser.program();

//Print parse tree
//tokens.tokens.forEach(token => console.log(token.toString()))
const parseTree = tree.toStringTree(PseudoParser.ruleNames, parser)

//Build AST
const visitor = new AstBuilderVisitor()
const ast = tree.accept(visitor);

//setup Interpreter
const symbols = new SymbolTable<Slot>()
const functions = new SymbolTable<FunctionTree>()
const typstBuilder = new LatexVisitor('  ')

console.log(ast.accept(typstBuilder))