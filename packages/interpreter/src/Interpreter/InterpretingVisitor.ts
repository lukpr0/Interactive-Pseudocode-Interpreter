import { Token } from "antlr4";
import { PseudoParser } from "@interactive-pseudo/parser";
import type { WhileTree, StatListTree, RepeatUntilTree, IfTree, ForTree, IteratorTree, RangeTree, KeyValueTree, ObjectTree, BreakTree, ReturnTree, ContinueTree, AssignTree, ProgramTree, Visitor, ArrayTree, FullIdTree } from "../AST/index.js";
import type { Value } from "./Value.js";
import type BuiltInFunction from "./BuiltInFunctions/BuiltInFunction.js";
import type PrintObserver from "./PrintObserver.js";

import { BinaryOperationTree, UnaryOperationTree, FunctionCallTree, FunctionTree, ExprTree, DotAccessorTree, IndexAccessorTree } from "../AST/index.js"
import { PseudoInteger, PseudoFloat, PseudoBoolean, PseudoArray, PseudoObject, PseudoNil, PseudoString } from "./Types/index.js";
import { ArrayConstructor, DequeueFunction, LengthFunction, PopFunction, PushFunction, CeilFunction, FloorFunction, PowFunction, SquarerootFunction, PrintFunction, CharFunction, CodepointFunction, MaxFunction, MinFunction } from "./BuiltInFunctions/index.js";
import { Slot, SymbolTable, Type, Range} from "./index.js"

export default class InterpretingVisitor implements Visitor<void> {
    symbolTable: SymbolTable<Slot>;
    functionTable: SymbolTable<FunctionTree>
    builtInFunctions: SymbolTable<BuiltInFunction>
    stack: Value[]

    returning: boolean;
    breaking: boolean;
    continuing: boolean;

    constructor(symbolTable: SymbolTable<Slot>, functionTable: SymbolTable<FunctionTree>) {
        this.symbolTable = symbolTable;
        this.functionTable = functionTable;
        this.stack = []
        this.returning = false;
        this.breaking = false;
        this.continuing = false;
        this.builtInFunctions = new SymbolTable();

        this.builtInFunctions.setVariable('print', new PrintFunction());

        this.builtInFunctions.setVariable('len', new LengthFunction());
        this.builtInFunctions.setVariable('Array', new ArrayConstructor());
        this.builtInFunctions.setVariable('push', new PushFunction());
        this.builtInFunctions.setVariable('pop', new PopFunction());
        this.builtInFunctions.setVariable('dequeue', new DequeueFunction())

        this.builtInFunctions.setVariable('floor', new FloorFunction());
        this.builtInFunctions.setVariable('ceil', new CeilFunction());
        this.builtInFunctions.setVariable('sqrt', new SquarerootFunction());
        this.builtInFunctions.setVariable('pow', new PowFunction());
        this.builtInFunctions.setVariable('max', new MaxFunction());
        this.builtInFunctions.setVariable('min', new MinFunction());

        this.builtInFunctions.setVariable('codepoint', new CodepointFunction());
        this.builtInFunctions.setVariable('char', new CharFunction());

    }

    visitStatlist(expr: StatListTree): void {
        for (const stat of expr.stats) {
            if (this.breaking) {
                break;
            }
            if (this.returning) {
                break;
            }
            if (this.continuing) {
                this.continuing = false;
                break
            }
            stat.accept(this)
            if (stat instanceof FunctionCallTree) {
                this.stack.pop()
            }
        }
    }

    visitProgram(program: ProgramTree): void {
        for (const tree of program.children) {
            if (tree instanceof FunctionTree) {
                const name = tree.name.text;
                this.functionTable.setVariable(name, tree);
            }
        }
        for (const tree of program.children) {
            if (!(tree instanceof FunctionTree)) {
                tree.accept(this);
            }
            if (tree instanceof FunctionCallTree) {
                this.stack.pop()
            }
        }
    }

    visitAssign(assign: AssignTree): void {
        assign.expr.accept(this)
        const value = this.stack.pop()
        if (value === undefined) {
            throw new Error("value is unexpectedly undefined");
        }
        if (assign.id.accessors.length == 0) {
            this.symbolTable.setVariable(assign.id.name.text, new Slot(value));
        } else {
            let slot = this.symbolTable.getVariable(assign.id.name.text);
            if (slot === undefined) {
                throw new Error(`Variable ${assign.id.name.text} does not exist`)
            }
            for (const accessor of assign.id.accessors) {
                if (accessor instanceof IndexAccessorTree && slot.value.type == Type.Array) {
                    accessor.index.accept(this);
                    const index = this.stack.pop()
                    if (index === undefined || index.type != Type.Integer && index.type != Type.Float) {
                        throw new Error("Value expected, found nothing");
                    }
                    const indexAsNum = typeof index.value == "number" ? index.value : Number(index.value)
                    slot = slot.value.getSlot(indexAsNum);
                } else if (accessor instanceof DotAccessorTree && slot.value.type == Type.Object) {
                    slot = slot.value.get(accessor.name.text);
                }
            }
            slot.value = value;
        }
    }

    visitExpr(expr: ExprTree): void {
        if (expr instanceof BinaryOperationTree) {
            expr.accept(this);
        } else if (expr instanceof UnaryOperationTree) {
            expr.accept(this);
        }
    }

    visitBinary(expr: BinaryOperationTree): void {
        if (expr.operator.type == PseudoParser.DOT) {
            expr.left.accept(this)
            if (expr.right instanceof UnaryOperationTree && expr.right.operand instanceof Token && expr.right.operand.type == PseudoParser.IDENTIFIER) {
                const left = this.stack.pop()
                if (left === undefined) {
                    throw new Error("left or right operand missing")
                }
                if (left.type == Type.Object) {
                    this.stack.push(left.get(expr.right.operand.text).value)
                    return;
                }
                throw new Error(`can't use dot access on type ${left.type}`);
            }
        }
        let result;
        if (this.isLazy(expr.operator)) {
            switch (expr.operator.type) {
                case PseudoParser.AND:
                    result = this.handleAnd(expr.left, expr.right);
                    break;
                case PseudoParser.OR:
                    result = this.handleOr(expr.left, expr.right);
                    break;
                default:
                    throw new Error("no valid operator found")
            }
        } else {
            expr.left.accept(this)
            expr.right.accept(this)
            const right = this.stack.pop()
            const left = this.stack.pop()
            if (left === undefined || right === undefined) {
                throw new Error("left or right operand missing")
            }
            switch (expr.operator.type) {
                case PseudoParser.PLUS:
                    result = this.handlePlus(left, right);
                    break
                case PseudoParser.MINUS:
                    result = this.handleMinus(left, right);
                    break;
                case PseudoParser.STAR:
                    result = this.handleMultiply(left, right);
                    break;
                case PseudoParser.SLASH:
                    result = this.handleDivide(left, right);
                    break;
                case PseudoParser.DIV:
                    result = this.handleIntDivide(left, right);
                    break;
                case PseudoParser.MOD:
                    result = this.handleModulo(left, right);
                    break;
                case PseudoParser.LESSTHAN:
                    result = this.handleLess(left, right)
                    break;
                case PseudoParser.GREATERTHAN:
                    result = this.handleGreater(left, right)
                    break;
                case PseudoParser.LESSEQUAL:
                    result = this.handleLessEqual(left, right)
                    break;
                case PseudoParser.GREATEREQUAL:
                    result = this.handleGreaterEqual(left, right)
                    break;
                case PseudoParser.EQUALS:
                    result = this.handleEquals(left, right)
                    break;
                case PseudoParser.NOTEQUAL:
                    result = this.handleNotEqual(left, right)
                    break;
                case PseudoParser.LBRACK:
                    result = this.handleIndexAccess(left, right)
                    break;
                default:
                    throw new Error("no valid operator found")
            }
        }
        this.stack.push(result)
    }

    visitUnary(expr: UnaryOperationTree): void {
        if (expr.operand instanceof ExprTree) {
            expr.operand.accept(this);
        } else if (expr.operand.type == PseudoParser.IDENTIFIER) {
            const slot = this.symbolTable.getVariable(expr.operand.text);
            if (slot === undefined) {
                throw new Error(`Variable ${expr.operand.text} does not exist`)
            }
            this.stack.push(slot.value);
        } else if (expr.operand.type == PseudoParser.INT) {
            const value = new PseudoInteger(BigInt(expr.operand.text));
            this.stack.push(value);
        } else if (expr.operand.type == PseudoParser.FLOAT) {
            const value = new PseudoFloat(Number.parseFloat(expr.operand.text));
            this.stack.push(value);
        } else if (expr.operand.type == PseudoParser.TRUE || expr.operand.type == PseudoParser.FALSE) {
            const isTrue = expr.operand.text == 'true';
            const value = new PseudoBoolean(isTrue);
            this.stack.push(value);
        } else if (expr.operand.type == PseudoParser.STRING) {
            const value = new PseudoString(expr.operand.text.slice(1, -1));
            this.stack.push(value);
        } else if (expr.operand.type == PseudoParser.NIL) {
            const value = new PseudoNil();
            this.stack.push(value);
        }

        if (expr.operator) {
            const fromStack = this.stack.pop();
            if (!fromStack) {
                throw new Error("no operand found");
            }
            if (expr.operator && expr.operator.type == PseudoParser.MINUS) {
                if (fromStack.type == Type.Integer || fromStack.type == Type.Float) {
                    this.stack.push(fromStack.mult(new PseudoInteger(-1n)));
                } else {
                    throw new Error(`operator - incompatible with type ${fromStack.type}`)
                }
            } else if (expr.operator && expr.operator.type == PseudoParser.NOT) {
                if (fromStack.type == Type.Boolean) {
                    this.stack.push(new PseudoBoolean(!fromStack.value))
                }
            }
        }

    }
    
    visitWhile(expr: WhileTree): void {
        while(true) {
        const parent = this.symbolTable;
        this.symbolTable.addChild(new SymbolTable());
            expr.cond.accept(this);
            const fromStack = this.stack.pop();
            if (!(fromStack instanceof PseudoBoolean)) {
                throw new Error("While-loop requires boolean expression");
            }
            if (fromStack.value) {
                expr.list.accept(this);
                if (this.breaking) {
                    this.breaking = false;
                    break;
                }
                if (this.returning) {
                    break;
                }
            } else {
                this.symbolTable.removeChild();
                break;
            }
            this.symbolTable.removeChild();
        } 
    }

    visitRepeat(expr: RepeatUntilTree): void {
        while (true) {
            const parent = this.symbolTable;
            this.symbolTable.addChild(new SymbolTable());
            expr.list.accept(this);
            if (this.breaking) {
                this.breaking = false;
                break;
            }
            if (this.returning) {
                break;
            }
            expr.cond.accept(this);
            const fromStack = this.stack.pop();
            if (!(fromStack instanceof PseudoBoolean)) {
                throw new Error("Repeat-Until requires boolean expression")
            }
            if (fromStack.value) {
                this.symbolTable = parent;
                break;
            }
            this.symbolTable.removeChild();
        }
    }

    visitIf(expr: IfTree): void {
        let branchExecuted = false;
        for (let i = 0; i < expr.conditions.length && !branchExecuted; i++) {
            const cond = expr.conditions[i];
            const list = expr.lists[i];
            cond?.accept(this)
            const fromStack = this.stack.pop();

            if (!(fromStack instanceof PseudoBoolean)) {
                throw new Error("If-Statement requires boolean expression")
            }
            if (fromStack.value) {
                this.symbolTable.addChild(new SymbolTable());
                branchExecuted = true;
                list?.accept(this);
                this.symbolTable.removeChild()
            }
        }

        if (!branchExecuted && expr.lists.length > expr.conditions.length) {
            expr.lists[expr.lists.length-1]?.accept(this);
        }
    }

    visitFor(expr: ForTree): void {
        expr.cond.accept(this)
        const iter = this.stack.pop()
        if (iter === undefined) {
            throw new Error("No value found");
        }
        if (iter.type != Type.Iterator) {
            throw new Error("Unexpected value, expected iterator");
        }
        const variableName = expr.cond.id.text;
        while (iter.hasNext()) {
            this.symbolTable.addChild(new SymbolTable());
            const value = iter.next();
            this.symbolTable.setVariable(variableName, new Slot(value));
            expr.list.accept(this);
            if (this.breaking) {
                this.breaking = false;
                break;
            }
            if (this.returning) {
                break;
            }
            this.symbolTable.removeChild();
        }
    }

    visitIterator(expr: IteratorTree): void {
        expr.iterator.accept(this);
    }

    visitRange(expr: RangeTree): void {
        expr.from.accept(this);
        expr.to.accept(this);
        const to = this.stack.pop()
        const from = this.stack.pop()
        if (to === undefined || from === undefined) {
            throw new Error("left or right operand missing")
        }
        if (from.type == Type.Integer && to.type == Type.Integer) {
            const range = new Range(from.value, to.value, expr.inclusive)
            this.stack.push(range)
        } else {
            throw new Error(`incompatible types for range ${from.type} ${to.type}`)
        }
    }

    visitFunction(expr: FunctionTree): void {
        expr.stats.accept(this)
    }

    visitFunctionCall(expr: FunctionCallTree): void {
        const name = expr.name.text;
        const builtin = this.builtInFunctions.getVariable(name);
        if (builtin !== undefined) {
            this.handleBuiltInFunction(builtin, expr.args)
            return;
        }
        const user = this.functionTable.getVariable(name);
        if (user !== undefined) {
            this.handleUserFunction(user, expr.args);
            this.returning = false;
            return;
        }
        throw new Error(`line ${expr.name.line}:${expr.name.column} ${name} is not a function`);
    }

    visitArray(expr: ArrayTree): void {
        const array = new PseudoArray();
        for (const element of expr.elements) {
            element.accept(this);
            const value = this.stack.pop()
            if (value === undefined) {
                throw new Error("Value expected, found nothing");
            }
            array.push(value)
        }
        this.stack.push(array);
    }

    visitFullId(expr: FullIdTree): void {
        const name = expr.name.text
        let slot = this.symbolTable.getVariable(name);
        if (slot === undefined) {
            throw new Error(`Variable ${name} does not exist`)
        }
        let value = slot.value;
        for (const accessor of expr.accessors) {
            if (accessor instanceof IndexAccessorTree && value.type == Type.Array) {
                accessor.index.accept(this);
                const index = this.stack.pop()
                if (index === undefined || index.type != Type.Integer && index.type != Type.Float) {
                    throw new Error("Value expected, found nothing");
                }
                const indexAsNum = typeof index.value == "number" ? index.value : Number(index.value)
                value = value.getSlot(indexAsNum).value;
            } else if (accessor instanceof DotAccessorTree && value.type == Type.Object) {
                value = value.get(accessor.name.text).value
            }
        }
        this.stack.push(value);
    }

    visitBreak(expr: BreakTree): void {
        this.breaking = true;
    }

    visitReturn(expr: ReturnTree): void {
        const returnValue = expr.value.accept(this)
        this.returning = true;
    }

    visitContinue(expr: ContinueTree): void {
        this.continuing = true;
    }

    visitIndex(expr: IndexAccessorTree): void {}

    visitDotName(expr: DotAccessorTree): void {}

    visitKeyValue(expr: KeyValueTree): void {}

    visitObject(expr: ObjectTree): void {
        const object = new PseudoObject();
        for (const kvp of expr.elements) {
            const key = kvp.key.text;
            kvp.value.accept(this)
            const value = this.stack.pop()
            if (value === undefined) {
                throw new Error("Value expected, found nothing");
            }
            object.set(key, value);
        }
        this.stack.push(object)
    }

    private isLazy(token: Token): boolean {
        return [PseudoParser.AND, PseudoParser.OR].includes(token.type)
    }

    private handlePlus(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.add(right);
        } else if (left.type == Type.String && (right.type == Type.String || right.type == Type.Integer || right.type == Type.Float || right.type == Type.Boolean || right.type == Type.Array || right.type == Type.Object)) {
            return left.add(right)
        } else if (right.type == Type.String && (left.type == Type.String || left.type == Type.Integer || left.type == Type.Float || left.type == Type.Boolean || left.type == Type.Array || left.type == Type.Object)) {
            return new PseudoString("").add(left).add(right)
        } {
            const errorMessage = `incompatible types for operator +: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleMinus(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.sub(right);
        } else {
            const errorMessage = `incompatible types for operator -: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleMultiply(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.mult(right);
        } else {
            const errorMessage = `incompatible types for operator *: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleDivide(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.div(right);
        } else {
            const errorMessage = `incompatible types for operator /: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleIntDivide(left: Value, right: Value): Value {
        if (left.type == Type.Integer && right.type == Type.Integer) {
            return left.intDiv(right);
        } else {
            const errorMessage = `incompatible types for operator div: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }

    }

    private handleModulo(left: Value, right: Value): Value {
        if (left.type == Type.Integer && right.type == Type.Integer) {
            return left.mod(right);
        } else {
            const errorMessage = `incompatible types for operator %: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleAnd(left: ExprTree, right: ExprTree): Value {
        left.accept(this);
        const leftValue = this.stack.pop();
        if (!leftValue) {
            throw new Error("left operand missing");
        }
        if (leftValue.type != Type.Boolean) {
            const errorMessage = `incompatible type for operator and: ${leftValue.type}`;
            throw new Error(errorMessage);
        }
        if (!leftValue.value) {
            return new PseudoBoolean(false);
        }
        right.accept(this);
        const rightValue = this.stack.pop();
        if (!rightValue) {
            throw new Error("left operand missing");
        }
        if (rightValue.type != Type.Boolean) {
            const errorMessage = `incompatible type for operator and: ${rightValue.type}`;
            throw new Error(errorMessage);
        }
        return leftValue.and(rightValue);
    }

    private handleOr(left: ExprTree, right: ExprTree): Value {
        left.accept(this);
        const leftValue = this.stack.pop();
        if (!leftValue) {
            throw new Error("left operand missing");
        }
        if (leftValue.type != Type.Boolean) {
            const errorMessage = `incompatible type for operator or: ${leftValue.type}`;
            throw new Error(errorMessage);
        }
        if (leftValue.value) {
            return new PseudoBoolean(true);
        }
        right.accept(this);
        const rightValue = this.stack.pop();
        if (!rightValue) {
            throw new Error("left operand missing");
        }
        if (rightValue.type != Type.Boolean) {
            const errorMessage = `incompatible type for operator or: ${rightValue.type}`;
            throw new Error(errorMessage);
        }
        return leftValue.or(rightValue)
    }
    
    private handleLess(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.less(right);
        } else {
            const errorMessage = `incompatible types for operator > : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleGreater(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.greater(right);
        } else {
            const errorMessage = `incompatible types for operator > : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleLessEqual(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.lessEqual(right);
        } else {
            const errorMessage = `incompatible types for operator <= : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleGreaterEqual(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.greaterEqual(right);
        } else {
            const errorMessage = `incompatible types for operator >= : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleEquals(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.equals(right);
        } else if (left.type == Type.Boolean && right.type == Type.Boolean) {
            return left.equals(right)
        } else if (left.type == Type.String && right.type == Type.String) {
            return left.equals(right)
        } else if (left.type == Type.Nil) {
            return left.equals(right)
        } else if (right.type == Type.Nil) {
            return right.equals(left)
        } else {
            const errorMessage = `incompatible types for operator = : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleNotEqual(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.notEqual(right);
        } else if (left.type == Type.Boolean && right.type == Type.Boolean) {
            return left.notEqual(right)
        } else if (left.type == Type.String && right.type == Type.String) {
            return left.notEqual(right)
        } else if (left.type == Type.Nil) {
            return left.notEquals(right)
        } else if (right.type == Type.Nil) {
            return right.notEquals(left)
        } else {
            const errorMessage = `incompatible types for operator != : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }
    
    private handleIndexAccess(left: Value, right: Value): Value {
        if ((left.type == Type.Array || left.type == Type.String) && right.type == Type.Integer) {
            return left.get(Number(right.value))
        }
        const errorMessage = `incompatible types for operator != : ${left.type}, ${right.type}`;
        throw new Error(errorMessage);
    }

    private handleUserFunction(func: FunctionTree, args: ExprTree[]) {
        if (args.length != func.args.length) {
            throw new Error(`wrong number of parameters, ${func.name} expects ${func.args.length} paramters, got ${args.length}`)
        }
        const argValues = args.map(arg => {
            arg.accept(this)
            const value = this.stack.pop();
            if (value === undefined) {
                throw new Error("No value found");
            }
            return value;
        })
        const currentScope = this.symbolTable
        const funcScope = new SymbolTable<Slot>();
        this.symbolTable = funcScope;
        this.setVariables(func.args, argValues)
        func.stats.accept(this)

        this.symbolTable = currentScope
    }

    private handleBuiltInFunction(func: BuiltInFunction, args: ExprTree[]) {
        if (args.length != func.argsCount) {
            throw new Error(`wrong number of parameters, ${func.name} expects ${func.argsCount} paramters, got ${args.length}`)
        }
        const argValues = [];
        for (const arg of args) {
            arg.accept(this);
            const argValue = this.stack.pop();
            if (argValue === undefined) {
                throw new Error("No value found");
            }
            argValues.push(argValue);
        }
        const value = func.eval(argValues);
        this.stack.push(value);
    }

    private setVariables(argNames: Token[], args: Value[]) {
        for (const [i, arg] of args.entries()) {
            const argName = argNames[i]!.text;
            this.symbolTable.setVariable(argName, new Slot(arg))
        }
    }

    addPrintObserver(observer: PrintObserver) {
        const print = this.builtInFunctions.getVariable('print') as PrintFunction
        print.addObserver(observer)
    }

}