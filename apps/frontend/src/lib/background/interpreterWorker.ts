import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, Slot, SymbolTable, type Tree } from "@interactive-pseudo/interpreter";
import { PseudoRuntimeError } from "@interactive-pseudo/interpreter";
import { FuncCallContext, PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
import { CharStream, CommonTokenStream } from "antlr4";
import { tokenToErrorInformation } from "../shared/errorLocation";
import { PseudoSyntaxError } from "./pseudoSyntaxError";
import { PseudoLexerErrorListener, PseudoParserErrorListener } from "./ErrorHandler";
import { type FrontendMessage } from "./messages"

let iterator: Generator;
let interpreter: InterpretingVisitor;

self.onmessage = (event) => {
    let data = event.data as FrontendMessage
    switch (data.type) {
        case "code":
            receiveCode(data.message);
            break;
        case "next":
            stepInterpreter(iterator, interpreter)
            break;
        case "run":
            runInterpreter(iterator, interpreter)
            break;
    }
}

function receiveCode(code: string) {
    const parser = setupParser(code);
    const ast = parse(parser);
    if (ast == null) return;
    interpreter = setupInterpreter(parser);
    iterator = ast.accept(interpreter)
}

function setupParser(code: string): PseudoParser {
    const chars = new CharStream(code);
    const lexer = new PseudoLexer(chars);
    lexer.removeErrorListeners()
    lexer.addErrorListener(new PseudoLexerErrorListener())
    const tokens = new CommonTokenStream(lexer);
    const parser = new PseudoParser(tokens);
    parser.removeErrorListeners()
    parser.addErrorListener(new PseudoParserErrorListener())
    return parser;
}

function setupInterpreter(parser: PseudoParser): InterpretingVisitor {
    const observer = {
        update(message: string) {
            self.postMessage({type: 'log', message: message})
        }
    }
    const symbolTable = new SymbolTable<Slot>();
    const functionTable = new SymbolTable<FunctionTree>();
    const interpreter = new InterpretingVisitor(symbolTable, functionTable);
    interpreter.addPrintObserver(observer);
    return interpreter;
}

function parse(parser: PseudoParser): Tree | null {
    let parseTree;
    try {
        parseTree = parser.program();
    } catch (e) {
        let error;
        if (e instanceof PseudoSyntaxError) {
            error = {
                type: 'located',
                ...tokenToErrorInformation(e)
            }
        } else if (e instanceof Error) {
            error = {
                type: 'error',
                text: e.message,
                name: e.name
            }
        } else {
            error = {
                type: 'other',
                text: e
            }
        }
        self.postMessage({type: 'error', message: error})
        return null;
    }
    const visitor = new AstBuilderVisitor()
    const ast = parseTree.accept(visitor);
    return ast;
}

function stepInterpreter(iterator: Generator, interpreter: InterpretingVisitor) {
    let res;
    try {
        res = iterator.next()
    } catch (e) {
        let error;
        if (e instanceof PseudoRuntimeError) {
            error = {
                type: 'located',
                ...tokenToErrorInformation(e)
            }
        } else if (e instanceof Error) {
            error = {
                type: 'error',
                text: e.message,
                name: e.name
            }
        } else {
            error = {
                type: 'other',
                text: e,
            }
        }
        self.postMessage({type: 'error', message: error})
        return;
    }
    postVariables(interpreter.symbolTables, res.done ? res.done : false);
}

function runInterpreter(iterator: Generator, interpreter: InterpretingVisitor) {
    try {
        for (const _ of iterator) {
        }
    } catch (e) {
        let error;
        if (e instanceof PseudoRuntimeError) {
            error = {
                type: 'located',
                ...tokenToErrorInformation(e)
            }
        } else if (e instanceof Error) {
            error = {
                type: 'error',
                text: e.message,
                name: e.name
            }
        } else {
            error = {
                type: 'other',
                text: e,
            }
        }
        self.postMessage({type: 'error', message: error})
        return;
    }
    postVariables(interpreter.symbolTables, true);
}

function postVariables(symbolTables: SymbolTable<Slot>[], finished: boolean) {
    //Convert to array of strings because worker messages serialize, losing methods
    let variables = symbolTables.map(symbolTable => 
        symbolTable.getNames()
            .keys()
            .map(key => [key, symbolTable.getVariable(key)?.toString()])
            .toArray()
        )
    self.postMessage({type: 'result', message: variables, finished: finished})
}