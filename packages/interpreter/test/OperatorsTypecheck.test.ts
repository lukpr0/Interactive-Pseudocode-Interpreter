import { describe } from "node:test";
import { testArgtype, testOperatorCommutative } from "./BaseTest";


describe('Check typesystem', () => {
    testOperatorCommutative('+', ['1'], ['nil', 'false', '[]', '{}']);
    testOperatorCommutative('-', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('*', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('/', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('div', ['1'], ['nil', 'false', '[]', '{}', '""', '0.5']);
    testOperatorCommutative('mod', ['1'], ['nil', 'false', '[]', '{}', '""', '0.5']);
    testOperatorCommutative('<', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('>', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('<=', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('>=', ['1'], ['nil', 'false', '[]', '{}', '""']);
    testOperatorCommutative('and', ['true'], ['nil', '[]', '{}', '""', '1', '0.5']);
    testOperatorCommutative('or', ['false'], ['nil', '[]', '{}', '""', '1', '0.5']);
    testArgtype('test index', (a) => `${a}[0]`, ['[1]'], ['1', '1.5', 'nil', 'false', '{}']);
    testArgtype('test index', (a) => `[0][${a}]`, ['0'], ['nil', 'false', '{}', '[]','""']);
    testArgtype('test dot', (a) => `${a}.x`, ['{x:1}'], ['1.5', 'nil', 'false', '[]']);
    testArgtype('test minus', (a) => `-${a}`, ['1', '1.5'], ['nil', 'false', '[]', '{}']);
    testArgtype('test not', (a) => `not ${a}`, ['true'], ['1', '1.5', 'nil', '[]', '{}']);
})
