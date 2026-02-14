import test, { describe } from "node:test";
import { iterable, notBool, notInt, notIterable, testArgtype, testOperatorCommutative } from "./BaseTest";

describe('Test typechecks in structures', () => {
    const ifTemplate = (x: string) => `if ${x} then
    end`;
    const ifElseTemplate = (x: string) => `if false then
    else if ${x} then
    end`;
    const repeatTemplate = (x: string) => `repeat
    until ${x}`;
    const whileTemplate = (x: string) => `while ${x} do
    end`;
    const forTemplate1 = (x: string) => `for _ in ${x} .. 0 do
    end`;
    const forTemplate2 = (x: string) => `for _ in 0 .. ${x} do
    end`;
    const forTemplate3 = (x: string) => `for _ in ${x} do
    end` 

    testArgtype('if', ifTemplate, ['true'], notBool)
    testArgtype('if-else-if', ifElseTemplate, ['true'], notBool)
    testArgtype('repeat-until', repeatTemplate, ['true'], notBool)
    testArgtype('while', whileTemplate, ['false'], notBool)
    testArgtype('for', forTemplate1, ['1'], notInt)
    testArgtype('for', forTemplate2, ['1'], notInt)
    testArgtype('for', forTemplate3, iterable, notIterable)
})