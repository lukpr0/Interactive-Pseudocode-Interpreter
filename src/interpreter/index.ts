
import { promises as fs } from 'fs'
import { CharStream, CommonTokenStream, ParserRuleContext, RuleNode } from 'antlr4'
import { AssignstatContext, ExprContext, ProgramContext, PseudoLexer, PseudoParser, PseudoParserVisitor } from '../generated/index.js';


const file = await fs.readFile('test1.Pseudo', 'utf8');
console.log(file)

const chars = new CharStream(file);
const lexer = new PseudoLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new PseudoParser(tokens);
const tree = parser.program();

enum Type {
    Number,
    Array,
    Set,
    Tuple,
    Function
}

class Variable {
    type: Type;
    value: any;
    constructor(type: Type, value: any) {
        this.type = type;
        this.value = value;
    }
}

class SymbolTable {
    table: Map<string, any>;
    parent: SymbolTable | undefined;
    constructor(parent: SymbolTable | undefined) {
        this.table = new Map();
        this.parent = parent;
    }

    getVariable(name: string): any {
        if (this.table.has(name)) {
            return this.table.get(name);
        } else {
            const value = this.parent!.getVariable(name);
            return value;
        }
    }
}

class Visitor extends PseudoParserVisitor<void> {

    symbolTable: SymbolTable

    constructor(symbolTable: SymbolTable) {
        super();
        this.symbolTable = symbolTable;

        this.visitAssignstat = (ctx: AssignstatContext): void => {
            const id = ctx.IDENTIFIER().getText();
            console.log(id)
            return;
        }

        this.visitExpr = (ctx: ExprContext): void => {
        }
    }

    /*visitChildren(ctx: ParserRuleContext): void {
        if (!ctx) {
            return;
        }
        if (ctx.children) {
            return ctx.children.map(child => {
                if (child.children && child.children.length != 0) {
                    return child.accept(this);
                } else {
                    return child.getText();
                }
            });
        }
    }*/

}

const symbols = new SymbolTable(undefined)
const visitor = new Visitor(symbols)

tree.accept(visitor);