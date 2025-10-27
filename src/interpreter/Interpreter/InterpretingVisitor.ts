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

export default class InterpretingVisitor implements Visitor<void> {
    symbolTable: SymbolTable;
    stack: Value[]

    constructor(symbolTable: SymbolTable) {
        this.symbolTable = symbolTable;
        this.stack = []
    }

    visitProgram(program: ProgramTree): void {
        for (const tree of program.children) {
            tree.accept(this)
        }
    }

    visitAssign(assign: AssignTree): void {
        assign.expr.accept(this)
        const id = assign.id.text;
        const value = this.stack.pop()
        this.symbolTable.setVariable(id, value);
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
            this.stack.push(value);
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


}