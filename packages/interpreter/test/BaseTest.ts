import { PseudoLexer, PseudoParser } from "@interactive-pseudo/parser";
import { CharStream, CommonTokenStream } from "antlr4";
import { AstBuilderVisitor, FunctionTree, InterpretingVisitor, PseudoTypeError, Slot, SymbolTable, Tree } from "../dist";
import { expect, test } from "vitest";

function makeParser(code: string): Tree {
    const chars = new CharStream(code);
    const lexer = new PseudoLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PseudoParser(tokens);
    const tree = parser.program();

    const visitor = new AstBuilderVisitor()
    const ast = tree.accept(visitor);
    return ast;
}

function makeInterpreter(): InterpretingVisitor {
    const symbolTable = new SymbolTable<Slot>();
    const functionTable = new SymbolTable<FunctionTree>();
    const interpreter = new InterpretingVisitor(symbolTable, functionTable);
    return interpreter;
}
export function testOperatorCommutative(operator: string, correct: string[], wrong: string[]) {
    const cases = []
    for (const a of correct) {
        for (const b of correct) {
            cases.push({a: a, b: b, e: null});
        }
        for (const b of wrong) {
            cases.push({a: a, b: b, e: PseudoTypeError});
        }
    }

    for (const a of wrong) {
        for (const b of correct) {
            cases.push({a: a, b: b, e: PseudoTypeError});
        }
        for (const b of wrong) {
            cases.push({a: a, b: b, e: PseudoTypeError});
        }
    }

    test.each(cases)(`$a ${operator} $b`, ({a, b, e}) => {
        const code = `${a} ${operator} ${b}`;
        const ast = makeParser(code);
        const interpreter = makeInterpreter();
        if (e) {
            expect(() => ast.accept(interpreter)).toThrow(e)
        } else {
            expect(() => ast.accept(interpreter)).not.toThrow()
        }
    })
}

export function testArgtype(name: string, template: (arg: string) => string, correct: string[], wrong: string[]) {
    const cases = [];
    for (const a of correct) {
        cases.push({code: template(a), e: null})
    }
    for (const a of wrong) {
        cases.push({code: template(a), e: PseudoTypeError})
    }

    test.each(cases)(`${name} with $code`, ({code, e}) => {
        const ast = makeParser(code);
        const interpreter = makeInterpreter();
        if (e) {
            expect(() => ast.accept(interpreter)).toThrow(e)
        } else {
            expect(() => ast.accept(interpreter)).not.toThrow()
        }
    });
}