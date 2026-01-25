import { Token } from "antlr4";
import { PseudoParser } from "@interactive-pseudo/parser";
import { type WhileTree, type StatListTree, type RepeatUntilTree, type IfTree, type ForTree, type IteratorTree, RangeTree, type KeyValueTree, type ObjectTree, type BreakTree, type ReturnTree, type ContinueTree, type AssignTree, type ProgramTree, type Visitor, type ArrayTree, type LexprTree, type SetTree, LexprPartTree, TupleTree } from "../AST/index.js";
import type { Value } from "./Value.js";
import type BuiltInFunction from "./BuiltInFunctions/BuiltInFunction.js";
import type PrintObserver from "./PrintObserver.js";

import { BinaryOperationTree, UnaryOperationTree, FunctionCallTree, FunctionTree, ExprTree, DotAccessorTree, IndexAccessorTree } from "../AST/index.js"
import { PseudoInteger, PseudoFloat, PseudoBoolean, PseudoArray, PseudoObject, PseudoNil, PseudoString, PseudoSet, PseudoTuple } from "./Types/index.js";
import { ArrayConstructor, DequeueFunction, LengthFunction, PopFunction, PushFunction, CeilFunction, FloorFunction, PowFunction, SquarerootFunction, PrintFunction, CharFunction, CodepointFunction, MaxFunction, MinFunction } from "./BuiltInFunctions/index.js";
import { Slot, SymbolTable, Type, Range} from "./index.js"
import { PseudoTypeError, EmptyStackError, VariableError, UnexpectedTypeError, FeatureNotImplementedError, IncompatibleTypesError, BuiltInTypeError, InternalError, LocatedInternalError, PseudoRuntimeError, UnexpectedStatementError } from "./Errors/index.js";
import { typeToString } from "./Type.js";
import { tokenToNodeLocation } from "../AST/NodeLocations.js";
import type NodeLocation from "../AST/NodeLocations.js";
import ArrayIterator from "./ArrayIterator.js";
import SetIterator from "./SetIterator.js";

export default class InterpretingVisitor implements Visitor<void> {
    symbolTable: SymbolTable<Slot>;
    functionTable: SymbolTable<FunctionTree>
    builtInFunctions: SymbolTable<BuiltInFunction>
    stack: Value[]

    canReturn: boolean;
    canBreak: boolean;
    canContinue: boolean;

    returning: boolean;
    returnsValue: boolean;
    breaking: boolean;
    continuing: boolean;

    constructor(symbolTable: SymbolTable<Slot>, functionTable: SymbolTable<FunctionTree>) {
        this.symbolTable = symbolTable;
        this.functionTable = functionTable;
        this.stack = []

        this.canBreak = false;
        this.canContinue = false;
        this.canReturn = false;

        this.returning = false;
        this.returnsValue = false;
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
            throw new EmptyStackError(assign.location);
        }
        const values = [];
        if (value.type == Type.Tuple && value.value.length == assign.id.parts.length) {
            for (const element of value.value) {
                values.push(element.value);
            }
        } else if (value.type == Type.Tuple && value.value.length != assign.id.parts.length && assign.id.parts.length > 1) {
            throw new PseudoRuntimeError("Not enough values to unpack", assign.location);
        } else if (value.type != Type.Tuple && assign.id.parts.length > 1) {
            throw new PseudoTypeError("Value can't be unpacked", assign.location);
        } else {
            values.push(value)
        }
        for (let i = 0; i < values.length; i++) {
            const id = assign.id.parts[i];
            const value = values[i];
            if (!(id instanceof LexprPartTree)) {
                throw new Error()
            }
            if (value === undefined) {
                throw new Error();
            }
            if (id.accessors.length == 0) {
                this.symbolTable.setVariable(id.name.text, new Slot(value));
            } else {
                let slot = this.symbolTable.getVariable(id.name.text);
                if (slot === undefined) {
                    throw new VariableError(id.name, tokenToNodeLocation(id.name));
                }
                for (const accessor of id.accessors) {
                    if (accessor instanceof IndexAccessorTree) {
                        accessor.index.accept(this);
                        const index = this.stack.pop()
                        if (index === undefined) {
                            throw new EmptyStackError(assign.location);
                        }
                        if (index.type != Type.Integer && index.type != Type.Float) {
                            throw new UnexpectedTypeError([Type.Integer, Type.Float], index.type, assign.location)
                        }
                        if (slot.value.type != Type.Array) {
                            throw new IncompatibleTypesError(slot.value.type, index.type, accessor.token, accessor.location)
                        }
                        const indexAsNum = typeof index.value == "number" ? index.value : Number(index.value)
                        try {
                            slot = slot.value.getSlot(indexAsNum);
                        } catch (e) {
                            if (e instanceof Error) {
                                throw new PseudoRuntimeError(e.message, assign.location);
                            } else throw e;
                        }
                    } else if (accessor instanceof DotAccessorTree) {
                        if (slot.value.type != Type.Object) {
                            throw new PseudoTypeError(`Member access not possible on type ${typeToString(slot.value.type)}`, accessor.location)
                        }
                        try {
                            slot = slot.value.get(accessor.name.text);
                        } catch (e) {
                            if (e instanceof Error) {
                                throw new PseudoRuntimeError(e.message, assign.location);
                            } else throw e;
                        }
                    }
                }
                slot.value = value;
            }
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
                    throw new EmptyStackError(expr.location);
                }
                if (left.type == Type.Object) {
                    try {
                        const object = left.get(expr.right.operand.text).value;
                        this.stack.push(object);
                    } catch (e) {
                        if (e instanceof Error) {
                            throw new PseudoRuntimeError(e.message, expr.location)
                        } else throw e;
                    }
                    return;
                }
                throw new PseudoTypeError(`Member access not possible on type ${typeToString(left.type)}`, expr.location)
            }
        }
        let result;
        if (this.isLazy(expr.operator)) {
            switch (expr.operator.type) {
                case PseudoParser.AND:
                    result = this.handleAnd(expr.left, expr.right, expr.operator);
                    break;
                case PseudoParser.OR:
                    result = this.handleOr(expr.left, expr.right, expr.operator);
                    break;
                default:
                    throw new FeatureNotImplementedError(expr.location)
            }
        } else {
            expr.left.accept(this);
            expr.right.accept(this);
            const right = this.stack.pop();
            const left = this.stack.pop();
            if (left === undefined || right === undefined) {
                throw new EmptyStackError(expr.location);
            }
            switch (expr.operator.type) {
                case PseudoParser.PLUS:
                    result = this.handlePlus(left, right, expr.operator);
                    break
                case PseudoParser.MINUS:
                    result = this.handleMinus(left, right, expr.operator);
                    break;
                case PseudoParser.STAR:
                    result = this.handleMultiply(left, right, expr.operator);
                    break;
                case PseudoParser.SLASH:
                    result = this.handleDivide(left, right, expr.operator);
                    break;
                case PseudoParser.DIV:
                    result = this.handleIntDivide(left, right, expr.operator);
                    break;
                case PseudoParser.MOD:
                    result = this.handleModulo(left, right, expr.operator);
                    break;
                case PseudoParser.LESSTHAN:
                    result = this.handleLess(left, right, expr.operator)
                    break;
                case PseudoParser.GREATERTHAN:
                    result = this.handleGreater(left, right, expr.operator)
                    break;
                case PseudoParser.LESSEQUAL:
                    result = this.handleLessEqual(left, right, expr.operator)
                    break;
                case PseudoParser.GREATEREQUAL:
                    result = this.handleGreaterEqual(left, right, expr.operator)
                    break;
                case PseudoParser.EQUALS:
                    result = this.handleEquals(left, right, expr.operator)
                    break;
                case PseudoParser.NOTEQUAL:
                    result = this.handleNotEqual(left, right, expr.operator)
                    break;
                case PseudoParser.LBRACK:
                    result = this.handleIndexAccess(left, right, expr.operator)
                    break;
                case PseudoParser.IN:
                    result = this.handleInQuery(left, right, expr.operator)
                    break;
                case PseudoParser.UNION:
                    result = this.handleSetUnion(left, right, expr.operator)
                    break
                case PseudoParser.INTERSECT:
                    result = this.handleSetIntersection(left, right, expr.operator)
                    break
                case PseudoParser.BACKSLASH:
                    result = this.handleSetDifference(left, right, expr.operator)
                    break
                default:
                    throw new FeatureNotImplementedError(expr.location)
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
                throw new VariableError(expr.operand, tokenToNodeLocation(expr.operand))
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
                throw new EmptyStackError(tokenToNodeLocation(expr.operator));
            }
            if (expr.operator && expr.operator.type == PseudoParser.MINUS) {
                if (fromStack.type == Type.Integer || fromStack.type == Type.Float) {
                    this.stack.push(fromStack.mult(new PseudoInteger(-1n)));
                } else {
                    throw new UnexpectedTypeError([Type.Integer, Type.Float], fromStack.type, tokenToNodeLocation(expr.operator))
                }
            } else if (expr.operator && expr.operator.type == PseudoParser.NOT) {
                if (fromStack.type == Type.Boolean) {
                    this.stack.push(new PseudoBoolean(!fromStack.value))
                } else {
                    throw new UnexpectedTypeError([Type.Boolean], fromStack.type, tokenToNodeLocation(expr.operator))
                }
            }
        }

    }
    
    visitWhile(expr: WhileTree): void {
        const prevBreak = this.canBreak;
        const prevContinue = this.canContinue;
        this.canBreak = true;
        this.canContinue = true;
        while(true) {
        this.symbolTable.addChild(new SymbolTable());
            expr.cond.accept(this);
            const fromStack = this.stack.pop();
            if (fromStack === undefined) {
                throw new EmptyStackError(expr.location);
            }
            if (!(fromStack instanceof PseudoBoolean)) {
                throw new UnexpectedTypeError([Type.Boolean], fromStack.type, expr.location)
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
        this.canBreak = prevBreak;
        this.canContinue = prevContinue;
    }

    visitRepeat(expr: RepeatUntilTree): void {
        const prevBreak = this.canBreak;
        const prevContinue = this.canContinue;
        this.canBreak = true;
        this.canContinue = true;
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

            if (fromStack === undefined) {
                throw new EmptyStackError(expr.location);
            }
            if (!(fromStack instanceof PseudoBoolean)) {
                throw new UnexpectedTypeError([Type.Boolean], fromStack.type, expr.location)
            }

            if (fromStack.value) {
                this.symbolTable = parent;
                break;
            }
            this.symbolTable.removeChild();
        }
        this.canBreak = prevBreak;
        this.canContinue = prevContinue;
    }

    visitIf(expr: IfTree): void {
        let branchExecuted = false;
        for (let i = 0; i < expr.conditions.length && !branchExecuted; i++) {
            const cond = expr.conditions[i];
            const list = expr.lists[i];
            cond?.accept(this)
            const fromStack = this.stack.pop();

            if (fromStack === undefined) {
                throw new EmptyStackError(expr.location);
            }
            if (!(fromStack instanceof PseudoBoolean)) {
                throw new UnexpectedTypeError([Type.Boolean], fromStack.type, expr.location)
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
        const prevBreak = this.canBreak;
        const prevContinue = this.canContinue;
        this.canBreak = true;
        this.canContinue = true;
        expr.cond.accept(this)
        const iter = this.stack.pop()
        if (iter === undefined) {
            throw new EmptyStackError(expr.location);
        }
        if (iter.type != Type.Iterator) {
            throw new UnexpectedTypeError([Type.Iterator], iter.type, expr.location)
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
        this.canBreak = prevBreak;
        this.canContinue = prevContinue;
    }

    visitIterator(expr: IteratorTree): void {
        if (expr.iterator instanceof RangeTree) {
            expr.iterator.accept(this);
        } else if (expr.iterator instanceof ExprTree) {
            expr.iterator.accept(this);
            const value = this.stack.pop()
            if (value === undefined) {
                throw new EmptyStackError(expr.location);
            }
            if (value.type == Type.Array) {
                const iterator = new ArrayIterator(value);
                this.stack.push(iterator);
            } else if (value.type == Type.Set) {
                const iterator = new SetIterator(value);
                this.stack.push(iterator);
            }
        }
    }

    visitRange(expr: RangeTree): void {
        expr.from.accept(this);
        expr.to.accept(this);
        const to = this.stack.pop()
        const from = this.stack.pop()
        if (to === undefined || from === undefined) {
            throw new EmptyStackError(expr.location);
        }
        if (from.type != Type.Integer) {
            throw new UnexpectedTypeError([Type.Integer], from.type, expr.location);
        }
        if (to.type != Type.Integer) {
            throw new UnexpectedTypeError([Type.Integer], to.type, expr.location);
        }
        const range = new Range(from.value, to.value, expr.inclusive)
        this.stack.push(range)
    }

    visitFunction(expr: FunctionTree): void {
        expr.stats.accept(this)
    }

    visitFunctionCall(expr: FunctionCallTree): void {
        const name = expr.name.text;
        const builtin = this.builtInFunctions.getVariable(name);
        if (builtin !== undefined) {
            this.handleBuiltInFunction(builtin, expr.args, expr.location)
            return;
        }
        const user = this.functionTable.getVariable(name);
        if (user !== undefined) {
            this.handleUserFunction(user, expr.args, expr.location);
            if (!this.returnsValue) {
                this.stack.push(new PseudoNil())
            }
            this.returning = false;
            this.returnsValue = false
            return;
        }
        throw new PseudoTypeError(`${name} is not a function`, expr.location)
    }

    visitArray(expr: ArrayTree): void {
        const array = new PseudoArray();
        for (const element of expr.elements) {
            element.accept(this);
            const value = this.stack.pop()
            if (value === undefined) {
                throw new EmptyStackError(expr.location);
            }
            array.push(value)
        }
        this.stack.push(array);
    }

    visitTuple(expr: TupleTree): void {
        const tuple = new PseudoTuple();
        for (const element of expr.elements) {
            element.accept(this);
            const value = this.stack.pop();
            if (value === undefined) {
                throw new EmptyStackError(expr.location);
            }
            tuple.value.push(new Slot(value));
        }
        this.stack.push(tuple);
    }
    
    visitSet(expr: SetTree): void {
        const set = new PseudoSet();
        for (const element of expr.elements) {
            element.accept(this);
            const value = this.stack.pop();
            if (value === undefined) {
                throw new EmptyStackError(expr.location);
            }
            set.insert(value);
        }
        this.stack.push(set);
    }

    visitLexpr(expr: LexprTree): void {
        throw new Error("not implemented");
    }

    visitLexprPart(expr: LexprPartTree): void {
        const name = expr.name.text
        let slot = this.symbolTable.getVariable(name);
        if (slot === undefined) {
            throw new VariableError(expr.name, expr.location);
        }
        let value = slot.value;
        for (const accessor of expr.accessors) {
            if (accessor instanceof IndexAccessorTree && value.type == Type.Array) {
                accessor.index.accept(this);
                const index = this.stack.pop()
                if (index === undefined) {
                    throw new EmptyStackError(expr.location);
                }
                if (index.type != Type.Integer && index.type != Type.Float) {
                    throw new UnexpectedTypeError([Type.Integer, Type.Float], index.type, expr.location)
                }
                const indexAsNum = typeof index.value == "number" ? index.value : Number(index.value)
                try {
                    value = value.getSlot(indexAsNum).value;
                } catch (e) {
                    if (e instanceof Error) {
                        throw new PseudoRuntimeError(e.message, expr.location)
                    } else throw e;
                }
            } else if (accessor instanceof DotAccessorTree && value.type == Type.Object) {
                try {
                    value = value.get(accessor.name.text).value
                } catch (e) {
                    if (e instanceof Error) {
                        throw new PseudoRuntimeError(e.message, expr.location);
                    } else throw e;
                }
            }
        }
        this.stack.push(value);
    }

    visitBreak(expr: BreakTree): void {
        if (!this.canBreak) {
            throw new UnexpectedStatementError(expr.token, expr.location);
        }
        this.breaking = true;
    }

    visitReturn(expr: ReturnTree): void {
        if (!this.canReturn) {
            throw new UnexpectedStatementError(expr.token, expr.location);
        }
        if (expr.value != null) {
            expr.value.accept(this)
            this.returnsValue = true;
        }
        this.returning = true;
    }

    visitContinue(expr: ContinueTree): void {
        if (!this.canContinue) {
            throw new UnexpectedStatementError(expr.token, expr.location);
        }
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
                throw new EmptyStackError(expr.location);
            }
            object.set(key, value);
        }
        this.stack.push(object)
    }

    private isLazy(token: Token): boolean {
        return [PseudoParser.AND, PseudoParser.OR].includes(token.type)
    }

    private handlePlus(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.add(right);
        } else if (left.type == Type.String && (right.type == Type.String || right.type == Type.Integer || right.type == Type.Float || right.type == Type.Boolean || right.type == Type.Array || right.type == Type.Object)) {
            return left.add(right)
        } else if (right.type == Type.String && (left.type == Type.String || left.type == Type.Integer || left.type == Type.Float || left.type == Type.Boolean || left.type == Type.Array || left.type == Type.Object)) {
            return new PseudoString("").add(left).add(right)
        } {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleMinus(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.sub(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleMultiply(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.mult(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleDivide(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.div(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleIntDivide(left: Value, right: Value, operator: Token): Value {
        if (left.type == Type.Integer && right.type == Type.Integer) {
            return left.intDiv(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }

    }

    private handleModulo(left: Value, right: Value, operator: Token): Value {
        if (left.type == Type.Integer && right.type == Type.Integer) {
            return left.mod(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleAnd(left: ExprTree, right: ExprTree, operator: Token): Value {
        left.accept(this);
        const leftValue = this.stack.pop();
        if (!leftValue) {
            throw new EmptyStackError(tokenToNodeLocation(operator))
        }
        if (leftValue.type != Type.Boolean) {
            throw new UnexpectedTypeError([Type.Boolean], leftValue.type, tokenToNodeLocation(operator))
        }
        if (!leftValue.value) {
            return new PseudoBoolean(false);
        }
        right.accept(this);
        const rightValue = this.stack.pop();
        if (!rightValue) {
            throw new EmptyStackError(tokenToNodeLocation(operator))
        }
        if (rightValue.type != Type.Boolean) {
            throw new UnexpectedTypeError([Type.Boolean], rightValue.type, tokenToNodeLocation(operator))
        }
        return leftValue.and(rightValue);
    }

    private handleOr(left: ExprTree, right: ExprTree, operator: Token): Value {
        left.accept(this);
        const leftValue = this.stack.pop();
        if (!leftValue) {
            throw new EmptyStackError(tokenToNodeLocation(operator))
        }
        if (leftValue.type != Type.Boolean) {
            throw new UnexpectedTypeError([Type.Boolean], leftValue.type, tokenToNodeLocation(operator))
        }
        if (leftValue.value) {
            return new PseudoBoolean(true);
        }
        right.accept(this);
        const rightValue = this.stack.pop();
        if (!rightValue) {
            throw new EmptyStackError(tokenToNodeLocation(operator))
        }
        if (rightValue.type != Type.Boolean) {
            throw new UnexpectedTypeError([Type.Boolean], rightValue.type, tokenToNodeLocation(operator))
        }
        return leftValue.or(rightValue)
    }
    
    private handleLess(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.less(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleGreater(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.greater(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleLessEqual(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.lessEqual(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleGreaterEqual(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.greaterEqual(right);
        } else {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleEquals(left: Value, right: Value, operator: Token): Value {
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
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }

    private handleNotEqual(left: Value, right: Value, operator: Token): Value {
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
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
    }
    
    private handleIndexAccess(left: Value, right: Value, operator: Token): Value {
        if ((left.type == Type.Array || left.type == Type.String) && right.type == Type.Integer) {
            try {
                return left.get(Number(right.value))
            } catch (e) {
                if (e instanceof Error) {
                    const error = new PseudoRuntimeError(e.message, tokenToNodeLocation(operator))
                    throw error
                } else throw e;
            }
        }
        throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
    }
    
    private handleInQuery(left: Value, right: Value, operator: Token): Value {
        if (right.type != Type.Set) {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
        return right.contains(left)
    }
    
    private handleSetIntersection(left: Value, right: Value, operator: Token): Value {
        if (left.type != Type.Set || right.type != Type.Set) {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
        return left.intersect(right)
    }
    
    private handleSetUnion(left: Value, right: Value, operator: Token): Value {
        if (left.type != Type.Set || right.type != Type.Set) {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
        return left.union(right)
    }
    
    private handleSetDifference(left: Value, right: Value, operator: Token): Value {
        if (left.type != Type.Set || right.type != Type.Set) {
            throw new IncompatibleTypesError(left.type, right.type, operator, tokenToNodeLocation(operator))
        }
        return left.difference(right)
    }

    private handleUserFunction(func: FunctionTree, args: ExprTree[], location: NodeLocation) {
        if (args.length != func.args.length) {
            const message = `wrong number of parameters, ${func.name} expects ${func.args.length} paramters, got ${args.length}`
            throw new PseudoTypeError(message, location)
        }
        const argValues = args.map(arg => {
            arg.accept(this)
            const value = this.stack.pop();
            if (value === undefined) {
                throw new EmptyStackError(location);
            }
            return value;
        })
        const prevReturn = this.canReturn;
        this.canReturn = true;

        const currentScope = this.symbolTable
        const funcScope = new SymbolTable<Slot>();
        this.symbolTable = funcScope;
        this.setVariables(func.args, argValues)

        func.stats.accept(this)

        this.symbolTable = currentScope
        this.canReturn = prevReturn;
    }

    private handleBuiltInFunction(func: BuiltInFunction, args: ExprTree[], location: NodeLocation) {
        if (args.length != func.argsCount) {
            const message = `wrong number of parameters, ${func.name} expects ${func.argsCount} paramters, got ${args.length}`;
            throw new PseudoTypeError(message, location)
        }
        const argValues = [];
        for (const arg of args) {
            arg.accept(this);
            const argValue = this.stack.pop();
            if (argValue === undefined) {
                throw new EmptyStackError(location);
            }
            argValues.push(argValue);
        }
        try {
            const value = func.eval(argValues);
            this.stack.push(value);
        } catch (e) {
            if (e instanceof BuiltInTypeError) {
                throw new PseudoTypeError(e.message, location)
            } else if (e instanceof InternalError) {
                throw new LocatedInternalError(e.message, location)
            } else if (e instanceof Error){
                throw new PseudoRuntimeError(e.message, location);
            } else throw e;
        }
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
