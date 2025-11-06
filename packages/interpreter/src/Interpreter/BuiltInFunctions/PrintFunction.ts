import type PrintObserver from "../PrintObserver.js";
import Nil from "../Types/Nil.js";
import type { Value } from "../Value.js";
import BuiltInFunction from "./BuiltInFunction.js";

export default class PrintFunction extends BuiltInFunction {

    observers: PrintObserver[]

    constructor() {
        super(1, 'print');
        this.observers = []
    }

    eval(args: Value[]): Value {
        const message = args[0]
        if (!message) {
            throw new Error("no message found")
        } 
        this.notify(message.toString());
        return new Nil();
    }

    addObserver(observer: PrintObserver) {
        this.observers.push(observer)
    }

    notify(message: string) {
        for (const observer of this.observers) {
            observer.update(message)
        }
    }

}