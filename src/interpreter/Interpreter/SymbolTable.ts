import type FunctionTree from "../AST/FunctionTree";
import type { Value } from "./Value";

export default class SymbolTable<T> {
    table: Map<string, T>;
    parent: SymbolTable<T> | undefined;
    constructor(parent: SymbolTable<T> | undefined) {
        this.table = new Map();
        this.parent = parent;
    }

    public getVariable(name: string): T {
        if (this.table.has(name)) {
            return this.table.get(name)!;
        } else {
            const value = this.parent!.getVariable(name);
            return value;
        }
    }

    public setVariable(name: string, value: T) {
        if (this.table.has(name)) {
            this.table.set(name, value);
        } else if (!this.trySetVariableInParent(name, value)) {
            this.table.set(name, value);
        }
    }

    public getAllVariables(): Map<string, T> {
        return this.table;
    }

    private trySetVariableInParent(name: string, value: T): boolean {
        if (this.table.has(name)) {
            this.table.set(name, value);
            return true;
        } else if (this.parent) {
            return this.trySetVariableInParent(name, value);
        } else {
            return false;
        }
    }

}