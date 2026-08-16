import type { FunctionTree } from "../../AST";
import { PseudoRuntimeError } from "../Errors";
import type { BuiltInFunction } from "../StandardLibrary";
import Type from "../Type";

export default class PseudoFunction {
    type: Type.Function = Type.Function;
    value: FunctionTree | BuiltInFunction;

    constructor(func: FunctionTree | BuiltInFunction) {
        this.value = func; 
    }

    asKey(): string {
        return "";
    }
}