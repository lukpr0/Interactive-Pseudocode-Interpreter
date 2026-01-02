import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, Slot, SymbolTable } from "@interactive-pseudo/interpreter";
import { PseudoRuntimeError } from "@interactive-pseudo/interpreter";
import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
import { CharStream, CommonTokenStream } from "antlr4";
import { RecognitionException, type Recognizer, type Token } from "antlr4";
import { tokenToErrorInformation } from "./errorLocation";
import { PseudoSyntaxError } from "./pseudoSyntaxError";

self.onmessage = (event) => {
    const code = event.data;
    const chars = new CharStream(code);
    const lexer = new PseudoLexer(chars);
    lexer.removeErrorListeners()
    lexer.addErrorListener({
        syntaxError: function (recognizer: Recognizer<number>, offendingSymbol: number, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
            const location = {
                line,
                column,
                from: offendingSymbol,
                to: offendingSymbol
            }
            throw new PseudoSyntaxError(`Unknown Token: ${msg} at ${line}:${column}`, location)
        }
    })
    const tokens = new CommonTokenStream(lexer);
    const parser = new PseudoParser(tokens);
    parser.removeErrorListeners()
    parser.addErrorListener({
        syntaxError: function (recognizer: Recognizer<Token>, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
            const location = {
                line,
                column,
                from: offendingSymbol.start,
                to: offendingSymbol.stop
            }
            throw new PseudoSyntaxError(`Syntax error: ${msg} at ${line}:${column}`, location)
        }
    })
    runInterpreter(parser);
}

function runInterpreter(parser: PseudoParser) {
    const observer = {
        update(message: string) {
            self.postMessage({type: 'log', message: message})
        }
    }
    const symbolTable = new SymbolTable<Slot>();
    const functionTable = new SymbolTable<FunctionTree>();
    const interpreter = new InterpretingVisitor(symbolTable, functionTable);
    interpreter.addPrintObserver(observer)

    let parseTree
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
        return;
    }
    const visitor = new AstBuilderVisitor()
    const ast = parseTree.accept(visitor);
    try {
        ast.accept(interpreter)
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

    //Convert to array of strings because worker messages serialize, losing methods
    let variables = symbolTable.getAllVariables()
        .entries()
        .map(([key, value]) => [key, value.toString()])
        .toArray();
    self.postMessage({type: 'result', message: variables})
}