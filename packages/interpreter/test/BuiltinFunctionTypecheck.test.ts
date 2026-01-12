import { describe } from "node:test";
import { testArgtype } from "./BaseTest";


describe('Test Built-in function typechecks', () => {
    testArgtype('Array', (a) => `Array(${a}, nil)`, ['1'], ['1.5', 'nil', 'false', '{}', '[]']);
    testArgtype('len', (a) => `len(${a})`, ['[]', '""'], ['1' ,'1.5', 'nil', 'false', '{}']);
    testArgtype('dequeue', (a) => `dequeue(${a})`, ['[1]'], ['1' ,'1.5', 'nil', 'false', '{}', '""']);
    testArgtype('pop', (a) => `pop(${a})`, ['[1]'], ['1' ,'1.5', 'nil', 'false', '{}', '""']);
    testArgtype('push', (a) => `push(${a}, nil)`, ['[]'], ['1' ,'1.5', 'nil', 'false', '{}', '""']);
    testArgtype('floor', (a) => `floor(${a})`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('ceil', (a) => `ceil(${a})`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('sqrt', (a) => `sqrt(${a})`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('pow', (a) => `pow(2, ${a})`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('pow', (a) => `pow(${a}, 2)`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('max', (a) => `max(2, ${a})`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('max', (a) => `max(${a}, 2)`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('min', (a) => `min(2, ${a})`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('min', (a) => `min(${a}, 2)`, ['1', '1.5'], ['nil', 'false', '{}', '[]', '""']);
    testArgtype('codepoint', (a) => `codepoint(${a})`, ['"a"'], ['1', '1.5', '[]', '{}', 'nil', 'false'])
    testArgtype('char', (a) => `char(${a})`, ['97'], ['1.5', '[]', '{}', 'nil', 'false', '"a"'])
    testArgtype('print', (a) => `print(${a})`, ['"a"', '1', '1.5', '[]', '{}', 'nil', 'false'], [])
})