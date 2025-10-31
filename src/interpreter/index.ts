
import { promises as fs } from 'fs'
import { CharStream, CommonTokenStream } from 'antlr4'
import { PseudoLexer, PseudoParser } from '../generated/index.js';
import SymbolTable from './Interpreter/SymbolTable.js'
import AstBuilderVisitor from './AstBuilderVisitor.js'
import InterpretingVisitor from './Interpreter/InterpretingVisitor.js';
import ASTPrinter from './AST/ASTPrinter.js';
import type FunctionTree from './AST/FunctionTree.js';
import type Slot from './Interpreter/Slot.js';
import Type from './Interpreter/Type.js';


//Read file
const file = await fs.readFile('test.pseudo', 'utf8');
console.log(file)

//Parse input
const chars = new CharStream(file);
const lexer = new PseudoLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new PseudoParser(tokens);
const tree = parser.program();

//Print parse tree
const parseTree = tree.toStringTree(PseudoParser.ruleNames, parser)
console.log(parseTree)

//Build AST
const visitor = new AstBuilderVisitor()
const ast = tree.accept(visitor);

//setup Interpreter
const symbols = new SymbolTable<Slot>(undefined)
const functions = new SymbolTable<FunctionTree>(undefined)
const interpreter = new InterpretingVisitor(symbols, functions);

//Print AST
const astPrinter = new ASTPrinter();
const astString = ast.accept(astPrinter);
console.log(astString);

//Run program
ast.accept(interpreter)

//Print all variables
symbols.getAllVariables().forEach((v: Slot, k: string) => {
    if (v.value.type == Type.Array) {
        console.log( k, `: Array (${v.value.value.length}) [`);
        v.value.value.forEach(s => console.log(s.value));
        console.log("]");
    } else if (v.value.type == Type.Object) {
        console.log(k, `: Object (${v.value.values.size}) [`);
        v.value.values.forEach((s, k) => console.log(`\t${k}: ${s.value.toString()}`));
        console.log("]");
    } else {
        console.log(k, ": ", v)
    }
})
