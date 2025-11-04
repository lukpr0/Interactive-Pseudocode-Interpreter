import Integer from "../Types/Integer.js";
import type { Value } from "../Value";
import BuiltInFunction from "./BuiltInFunction.js";

export default class PrintFunction extends BuiltInFunction {

    constructor() {
        super(1, 'print');
    }

    eval(args: Value[]): Value {
        console.log(args[0]?.toString());
        return new Integer(0xDEADBEEFn)
    }

}