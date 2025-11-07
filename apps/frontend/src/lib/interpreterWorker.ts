import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, Slot, SymbolTable } from "@interactive-pseudo/interpreter";
import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
import { CharStream, CommonTokenStream } from "antlr4";

self.onmessage = (event) => {
    const code = event.data;
    const chars = new CharStream(code);
    const lexer = new PseudoLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PseudoParser(tokens);
    performEpicCalculation(parser);
}

function performEpicCalculation(parser: PseudoParser) {
    const observer = {
        update(message: string) {
            self.postMessage({type: 'log', message: message})
        }
    }
    const symbolTable = new SymbolTable<Slot>();
    const functionTable = new SymbolTable<FunctionTree>();
    const interpreter = new InterpretingVisitor(symbolTable, functionTable);
    interpreter.addPrintObserver(observer)
    const parseTree = parser.program();
    const visitor = new AstBuilderVisitor()
    const ast = parseTree.accept(visitor);
    ast.accept(interpreter)

    //Convert to array of strings because worker messages serialize, losing methods
    let variables = symbolTable.getAllVariables()
        .entries()
        .map(([key, value]) => [key, value.toString()])
        .toArray();
    self.postMessage({type: 'result', message: variables})
}