import Slot from "../Slot";
import { PseudoFloat, PseudoFunction } from "../Types";
import { ArrayConstructor, ConcatFunction, DequeueFunction, JoinFunction, LengthFunction, PopFunction, PushFunction } from "./ArrayFunctions";
import { DictConstructor, DictKeys, DictValues } from "./DictFunctions";
import { ArcCosFunction, ArcSinFunction, ArcTanFunction, CeilFunction, CosFunction, FloorFunction, MaxFunction, MinFunction, PowFunction, SinFunction, SquarerootFunction, TanFunction } from "./MathFunctions";
import PrintFunction from "./PrintFunction";
import { CharFunction, CodepointFunction, SubstringFunction } from "./StringFunctions";

export const StandardFunctions = [
    new PrintFunction(),
    new LengthFunction(),
    new ArrayConstructor(),
    new PushFunction(),
    new PopFunction(),
    new DequeueFunction(),
    new ConcatFunction(),
    new JoinFunction(),

    new FloorFunction(),
    new CeilFunction(),
    new SquarerootFunction(),
    new PowFunction(),
    new MaxFunction(),
    new MinFunction(),
    new SinFunction(),
    new CosFunction(),
    new TanFunction(),
    new ArcSinFunction(),
    new ArcCosFunction(),
    new ArcTanFunction(),

    new CodepointFunction(),
    new CharFunction(),
    new SubstringFunction(),

    new DictConstructor(),
    new DictKeys(),
    new DictValues(),
].map(f => { return { name: f.name, value: new Slot(new PseudoFunction(f)) }; });

export const StandardConstants = [
    { name: 'infinity', value: new PseudoFloat(Infinity) },
    { name: 'pi', value: new PseudoFloat(Math.PI) }
].map(f => { return { name: f.name, value: new Slot(f.value)}}).concat(StandardFunctions);