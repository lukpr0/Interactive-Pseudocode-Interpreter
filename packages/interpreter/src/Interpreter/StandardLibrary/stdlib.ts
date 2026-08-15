import Slot from "../Slot";
import { PseudoFloat } from "../Types";
import { ArrayConstructor, DequeueFunction, LengthFunction, PopFunction, PushFunction } from "./ArrayFunctions";
import { DictConstructor, DictKeys, DictValues } from "./DictFunctions";
import { CeilFunction, FloorFunction, MaxFunction, MinFunction, PowFunction, SquarerootFunction } from "./MathFunctions";
import PrintFunction from "./PrintFunction";
import { CharFunction, CodepointFunction } from "./StringFunctions";

export const StandardFunctions = [
    new PrintFunction(),
    new LengthFunction(),
    new ArrayConstructor(),
    new PushFunction(),
    new PopFunction(),
    new DequeueFunction(),
    new FloorFunction(),
    new CeilFunction(),
    new SquarerootFunction(),
    new PowFunction(),
    new MaxFunction(),
    new MinFunction(),
    new CodepointFunction(),
    new CharFunction(),
    new DictConstructor(),
    new DictKeys(),
    new DictValues(),
].map(f => { return { name: f.name, value: f }; });

export const StandardConstants = [
    { name: 'infinity', value: new PseudoFloat(Infinity) },
    { name: 'pi', value: new PseudoFloat(Math.PI) }
].map(f => { return { name: f.name, value: new Slot(f.value)}});