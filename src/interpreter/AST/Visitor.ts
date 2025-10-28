import type { AssignTree } from "./AssignTree.js";
import type { BinaryOperationTree, ExprTree, UnaryOperationTree } from "./ExprTree.js";
import type { ProgramTree } from "./ProgramTree.js";
import type RepeatUntilTree from "./RepeatUntil.js";
import type StatListTree from "./StatListTree.js";
import type WhileTree from "./WhileTree.js";

export default interface Visitor<T> {
    visitProgram(program: ProgramTree): T;
    visitAssign(assign: AssignTree): T;
    visitExpr(expr: ExprTree): T;
    visitBinary(expr: BinaryOperationTree): T;
    visitUnary(expr: UnaryOperationTree): T;
    visitStatlist(expr: StatListTree): T;
    visitWhile(expr: WhileTree): T;
    visitRepeat(expr: RepeatUntilTree): T;
}