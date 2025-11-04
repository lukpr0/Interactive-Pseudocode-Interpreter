import Nil from "../Types/Nil.js";
import type { Value } from "../Value";
import BuiltInFunction from "./BuiltInFunction.js";

export default class PrintFunction extends BuiltInFunction {

    constructor() {
        super(1, 'print');
    }

    eval(args: Value[]): Value {
        console.log(args[0]?.toString());
        return new Nil();
    }

}