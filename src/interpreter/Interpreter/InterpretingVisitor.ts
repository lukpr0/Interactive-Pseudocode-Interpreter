import PseudoParser from "../../generated/PseudoParser.js";
import type SymbolTable from "./SymbolTable.js";
import type { AssignTree } from "../AST/AssignTree.js";
import { BinaryOperationTree, ExprTree, UnaryOperationTree } from "../AST/ExprTree.js";
import type { ProgramTree } from "../AST/ProgramTree.js";
import type Visitor from "../AST/Visitor.js";
import type { Value } from "./Value.js";
import Type from "./Type.js";
import Integer from "./Types/Integer.js";
import Float from "./Types/Float.js";
import Boolean from "./Types/Boolean.js";
import type WhileTree from "../AST/WhileTree.js";
import type StatListTree from "../AST/StatListTree.js";
import type RepeatUntilTree from "../AST/RepeatUntil.js";
import type IfTree from "../AST/IfTree.js";
import type ForTree from "../AST/ForTree.js";
import type IteratorTree from "../AST/IteratorTree.js";
import type RangeTree from "../AST/RangeTree.js";
import Range from "./Range.js";
import FunctionTree from "../AST/FunctionTree.js";
import type FunctionCallTree from "../AST/FunctionCallTree.js";
import type ArrayTree from "../AST/ArrayTree.js";
import Array from "./Types/Array.js";
import type FullIdTree from "../AST/FullIdTree.js";
import { IndexAccessorTree } from "../AST/AccessorTree.js";
import Slot from "./Slot.js";

export default class InterpretingVisitor implements Visitor<void> {
    symbolTable: SymbolTable<Slot>;
    functionTable: SymbolTable<FunctionTree>
    stack: Value[]

    constructor(symbolTable: SymbolTable<Slot>, functionTable: SymbolTable<FunctionTree>) {
        this.symbolTable = symbolTable;
        this.functionTable = functionTable;
        this.stack = []
    }

    visitStatlist(expr: StatListTree): void {
        for (const stat of expr.stats) {
            stat.accept(this)
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
        }
    }

    visitAssign(assign: AssignTree): void {
        assign.expr.accept(this)
        //assign.id.accept(this);
        const value = this.stack.pop()
        if (value === undefined) {
            throw new Error("value is unexpectedly undefined");
        }
        if (assign.id.accessors.length == 0) {
            this.symbolTable.setVariable(assign.id.name.text, new Slot(value));
        } else {
            let slot = this.symbolTable.getVariable(assign.id.name.text);
            for (const accessor of assign.id.accessors) {
                if (accessor instanceof IndexAccessorTree && slot.value.type == Type.Array) {
                    accessor.index.accept(this);
                    const index = this.stack.pop()
                    if (index === undefined || index.type != Type.Integer && index.type != Type.Float) {
                        throw new Error("Value expected, found nothing");
                    }
                    const indexAsNum = typeof index.value == "number" ? index.value : Number(index.value)
                    slot = slot.value.get(indexAsNum);
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
        expr.left.accept(this)
        expr.right.accept(this)
        const right = this.stack.pop()
        const left = this.stack.pop()
        if (left === undefined || right === undefined) {
            throw new Error("left or right operand missing")
        }
        let result;
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
            case PseudoParser.AND:
                result = this.handleAnd(left, right);
                break;
            case PseudoParser.OR:
                result = this.handleOr(left, right);
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
            default:
                throw new Error("no valid operator found")
        }
        this.stack.push(result)
    }

    visitUnary(expr: UnaryOperationTree): void {
        if (expr.operand instanceof ExprTree) {
            expr.operand.accept(this);
        } else if (expr.operand.type == PseudoParser.IDENTIFIER) {
            const value = this.symbolTable.getVariable(expr.operand.text);
            this.stack.push(value.value);
        } else if (expr.operand.type == PseudoParser.INT) {
            const value = new Integer(BigInt(expr.operand.text));
            this.stack.push(value);
        } else if (expr.operand.type == PseudoParser.FLOAT) {
            const value = new Float(Number.parseFloat(expr.operand.text));
            this.stack.push(value);
        } else if (expr.operand.type == PseudoParser.TRUE || expr.operand.type == PseudoParser.FALSE) {
            const isTrue = expr.operand.text == 'true';
            const value = new Boolean(isTrue);
            this.stack.push(value);
        }

        if (expr.operator) {
            const fromStack = this.stack.pop();
            if (!fromStack) {
                throw new Error("no operand found");
            }
            if (expr.operator && expr.operator.type == PseudoParser.MINUS) {
                if (fromStack.type == Type.Integer || fromStack.type == Type.Float) {
                    this.stack.push(fromStack.mult(new Integer(-1n)));
                } else {
                    throw new Error(`operator - incompatible with type ${fromStack.type}`)
                }
            } else if (expr.operator && expr.operator.type == PseudoParser.NOT) {
                if (fromStack.type == Type.Boolean) {
                    this.stack.push(new Boolean(!fromStack.value))
                }
            }
        }

    }
    
    visitWhile(expr: WhileTree): void {
        while(true) {
            expr.cond.accept(this);
            const fromStack = this.stack.pop();
            if (!(fromStack instanceof Boolean)) {
                throw new Error("While-loop requires boolean expression");
            }
            if (fromStack.value) {
                expr.list.accept(this);
            } else {
                break;
            }
        } 
    }

    visitRepeat(expr: RepeatUntilTree): void {
        while (true) {
            expr.list.accept(this);
            expr.cond.accept(this);
            const fromStack = this.stack.pop();
            if (!(fromStack instanceof Boolean)) {
                throw new Error("Repeat-Until requires boolean expression")
            }
            if (fromStack.value) {
                break;
            }
        }
    }

    visitIf(expr: IfTree): void {
        let branchExecuted = false;
        for (let i = 0; i < expr.conditions.length; i++) {
            const cond = expr.conditions[i];
            const list = expr.lists[i];
            cond?.accept(this)
            const fromStack = this.stack.pop();

            if (!(fromStack instanceof Boolean)) {
                throw new Error("If-Statement requires boolean expression")
            }
            if (fromStack.value) {
                branchExecuted = true;
                list?.accept(this);
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
            const value = iter.next();
            this.symbolTable.setVariable(variableName, new Slot(value));
            expr.list.accept(this);
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
        const func = this.functionTable.getVariable(name);
        if (!(func instanceof FunctionTree)) {
            throw new Error(`${name} is not a function`);
        }
        const args = expr.args;
        if (args.length != func.args.length) {
            throw new Error(`wrong number of parameters, ${name} expects ${func.args.length} paramters, got ${args.length}`)
        }
        for (let i = 0; i<args.length; i++) {
            args[i]!.accept(this);
            const argName = func.args[i]!.text;
            const value = this.stack.pop();
            if (value === undefined) {
                throw new Error("No value found");
            }
            this.symbolTable.setVariable(argName, new Slot(value))
        }
        func.stats.accept(this)
    }

    visitArray(expr: ArrayTree): void {
        const array = new Array();
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
        let value = this.symbolTable.getVariable(name).value;
        for (const accessor of expr.accessors) {
            if (accessor instanceof IndexAccessorTree && value.type == Type.Array) {
                accessor.index.accept(this);
                const index = this.stack.pop()
                if (index === undefined || index.type != Type.Integer && index.type != Type.Float) {
                    throw new Error("Value expected, found nothing");
                }
                const indexAsNum = typeof index.value == "number" ? index.value : Number(index.value)
                value = value.get(indexAsNum).value;
            }
        }
        this.stack.push(value);
    }

    visitIndex(expr: IndexAccessorTree): void {
        expr.index
    }

    private handlePlus(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.add(right);
        } else {
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

    private handleAnd(left: Value, right: Value): Value {
        if (left.type == Type.Boolean && right.type == Type.Boolean) {
            return left.and(right);
        } else {
            const errorMessage = `incompatible types for operator %: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleOr(left: Value, right: Value): Value {
        if (left.type == Type.Boolean && right.type == Type.Boolean) {
            return left.or(right);
        } else {
            const errorMessage = `incompatible types for operator %: ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

    private handleLess(left: Value, right: Value): Value {
        if ((left.type == Type.Integer || left.type == Type.Float) && (right.type == Type.Integer || right.type == Type.Float)) {
            return left.less(right);
        } else {
            const errorMessage = `incompatible types for operator < : ${left.type}, ${right.type}`;
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
        } else {
            const errorMessage = `incompatible types for operator != : ${left.type}, ${right.type}`;
            throw new Error(errorMessage);
        }
    }

}