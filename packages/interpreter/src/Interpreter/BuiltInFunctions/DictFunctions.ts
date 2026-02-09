import { PseudoDict } from "../Types";
import type { Value } from "../Value";
import BuiltInFunction from "./BuiltInFunction";

export class DictConstructor extends BuiltInFunction {
    constructor() {
        super(0, 'Dict')
    }

    eval(): Value {
        const dict = new PseudoDict()
        return dict;
    }

}