import { describe } from "node:test";
import { testArgtype } from "./BaseTest";


describe('Test Built-in function typechecks', () => {
    const sized = ['""', '[]', '{}'];
    const num = ['1', '1.5'];
    const rest = ['nil', 'false', '{x:0}', '(1,2)'];
    const notSized = [...num, ...rest];
    const notArray = [...notSized, '""', '{}'];
    const notNum = [...sized, ...rest];
    const notInt = [...notNum, '1.5'];
    const notString = [...notSized, '[]', '{}'];
    const notDict = [...notSized, '""', '[]'];
    const everything = [...sized, ...num, ...rest];
    testArgtype('Array', (a) => `Array(${a}, nil)`, ['1'], notInt);
    testArgtype('len', (a) => `len(${a})`, ['[]', '""', '{}'], notSized);
    testArgtype('dequeue', (a) => `dequeue(${a})`, ['[1]'], notArray);
    testArgtype('pop', (a) => `pop(${a})`, ['[1]'], notArray);
    testArgtype('push', (a) => `push(${a}, nil)`, ['[]'], notArray);
    testArgtype('floor', (a) => `floor(${a})`, ['1', '1.5'], notNum);
    testArgtype('ceil', (a) => `ceil(${a})`, ['1', '1.5'], notNum);
    testArgtype('sqrt', (a) => `sqrt(${a})`, ['1', '1.5'], notNum);
    testArgtype('pow', (a) => `pow(2, ${a})`, ['1', '1.5'], notNum);
    testArgtype('pow', (a) => `pow(${a}, 2)`, ['1', '1.5'], notNum);
    testArgtype('max', (a) => `max(2, ${a})`, ['1', '1.5'], notNum);
    testArgtype('max', (a) => `max(${a}, 2)`, ['1', '1.5'], notNum);
    testArgtype('min', (a) => `min(2, ${a})`, ['1', '1.5'], notNum);
    testArgtype('min', (a) => `min(${a}, 2)`, ['1', '1.5'], notNum);
    testArgtype('codepoint', (a) => `codepoint(${a})`, ['"a"'], notString);
    testArgtype('char', (a) => `char(${a})`, ['97'], notInt);
    testArgtype('print', (a) => `print(${a})`, everything, []);
    testArgtype('keys', (a) => `keys(${a})`, ['{}'], notDict);
    testArgtype('values', (a) => `values(${a})`, ['{}'], notDict);
})