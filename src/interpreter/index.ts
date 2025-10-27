
import { promises as fs } from 'fs'
import { CharStream, CommonTokenStream, ParserRuleContext, RuleNode } from 'antlr4'
import { PseudoLexer, PseudoParser } from '../generated/index.js';
import SymbolTable from './Interpreter/SymbolTable.js'
import AstBuilderVisitor from './AstBuilderVisitor.js'
import InterpretingVisitor from './Interpreter/InterpretingVisitor.js';
import ASTPrinter from './AST/ASTPrinter.js';



const file = await fs.readFile('test1.Pseudo', 'utf8');
console.log(file)

const chars = new CharStream(file);
const lexer = new PseudoLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new PseudoParser(tokens);
const tree = parser.program();



const parseTree = tree.toStringTree(PseudoParser.ruleNames, parser)
console.log(parseTree)

const symbols = new SymbolTable(undefined)
const visitor = new AstBuilderVisitor(symbols)

const ast = tree.accept(visitor);


const interpreter = new InterpretingVisitor(symbols);
const astPrinter = new ASTPrinter();

const astString = ast.accept(astPrinter);
console.log(astString);

ast.accept(interpreter)

symbols.getAllVariables().forEach((v: any, k: string) => {
    console.log(k, ": ", v)
})