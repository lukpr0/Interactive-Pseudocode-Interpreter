
export default class SymbolTable<T> {
    table: Map<string, T>;
    child: SymbolTable<T> | undefined;
    constructor() {
        this.table = new Map();
        this.child = undefined;
    }

    public getVariable(name: string): T | undefined {
        if (this.child && this.child.has(name)) {
            return this.child.getVariable(name)!;
        } else if (this.table.has(name)) {
            return this.table.get(name);
        } else {
            return undefined
        }
    }

    private has(name: string): boolean {
        if (this.child && this.child.has(name)) {
            return true
        } else {
            return this.table.has(name)
        }
    }

    public setVariable(name: string, value: T) {
        if (this.table.has(name)) {
            this.table.set(name, value);
        } else {
            if (this.child !== undefined) {
                this.child.setVariable(name, value);
            } else {
                this.table.set(name, value);
            }
        }
    }

    public getAllVariables(): Map<string, T> {
        return this.table;
    }

    public addChild(table: SymbolTable<T>) {
        if (this.child !== undefined) {
            this.child.addChild(table);
        } else {
            this.child = table;
        }
    }

    public removeChild(): SymbolTable<T> | undefined {
        if (this.child && this.child.child) {
            return this.child.removeChild();
        } else if (this.child && this.child.child === undefined) {
            const removed = this.child;
            this.child = undefined;
            return removed;
        }
        return undefined
    }

    toString(): string {
        const kvps = []
        for (const [key, slot] of this.table.entries()) {
            kvps.push(`${key}: ${slot!.toString()}`)
        }
        return `Table: ${kvps.join('\r\n')}, Child: (${this.child?.toString()})`
    }

}