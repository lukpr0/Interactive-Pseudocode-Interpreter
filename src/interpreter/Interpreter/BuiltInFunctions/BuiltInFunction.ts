import type { Value } from "../Value";

export default abstract class BuiltInFunction {
    argsCount: number
    name: string
    constructor(argsCount: number, name: string) {
        this.argsCount = argsCount;
        this.name = name;
    }

    abstract eval(args: Value[]): Value

}