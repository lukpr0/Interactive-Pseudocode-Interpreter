import test, { describe } from "node:test";
import { testArgtype, testOperatorCommutative } from "./BaseTest";

describe('Test typechecks in structures', () => {
    const ifTemplate = (x: string) => `if ${x} then
    end`;
    const ifElseTemplate = (x: string) => `if false then
    else if ${x} then
    end`;
    const repeatTemplate = (x: string) => `repeat
    until ${x}`;
    const whileTemplate = (x: string) => `while ${x} do
    end`
    const forTemplate1 = (x: string) => `for _ in ${x} .. 0 do
    end`
    const forTemplate2 = (x: string) => `for _ in 0 .. ${x} do
    end`

    testArgtype('if', ifTemplate, ['true'], ['1', '1.5', 'nil', '[]', '{}'])
    testArgtype('if-else-if', ifElseTemplate, ['true'], ['1', '1.5', 'nil', '[]', '{}'])
    testArgtype('repeat-until', repeatTemplate, ['true'], ['1', '1.5', 'nil', '[]', '{}'])
    testArgtype('while', whileTemplate, ['false'], ['1', '1.5', 'nil', '[]', '{}'])
    testArgtype('for', forTemplate1, ['1'], ['false', '1.5', 'nil', '[]', '{}'])
    testArgtype('for', forTemplate2, ['1'], ['false', '1.5', 'nil', '[]', '{}'])
})