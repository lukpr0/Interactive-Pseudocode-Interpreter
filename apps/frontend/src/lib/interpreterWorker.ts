import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, Slot, SymbolTable } from "@interactive-pseudo/interpreter";
import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
import { CharStream, CommonTokenStream } from "antlr4";
import type { RecognitionException, Recognizer, Token } from "antlr4";

self.onmessage = (event) => {
    const code = event.data;
    const chars = new CharStream(code);
    const lexer = new PseudoLexer(chars);
    lexer.removeErrorListeners()
    lexer.addErrorListener({
        syntaxError: function (recognizer: Recognizer<number>, offendingSymbol: number, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
            throw new Error(`Unknown Token at ${line}:${column}: ${msg} (${offendingSymbol})`);
        }
    })
    const tokens = new CommonTokenStream(lexer);
    const parser = new PseudoParser(tokens);
    parser.removeErrorListeners()
    parser.addErrorListener({
        syntaxError: function (recognizer: Recognizer<Token>, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
            throw new Error(`Syntax error at ${line}:${column}: ${msg} (${offendingSymbol})`);
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
        self.postMessage({type: 'error', message: e})
        return;
    }
    const visitor = new AstBuilderVisitor()
    const ast = parseTree.accept(visitor);
    try {
        ast.accept(interpreter)
    } catch (e) {
        self.postMessage({type: 'error', message: e})
        return;
    }

    //Convert to array of strings because worker messages serialize, losing methods
    let variables = symbolTable.getAllVariables()
        .entries()
        .map(([key, value]) => [key, value.toString()])
        .toArray();
    self.postMessage({type: 'result', message: variables})
}