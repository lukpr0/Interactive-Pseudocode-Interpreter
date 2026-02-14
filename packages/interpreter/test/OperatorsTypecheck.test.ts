import { describe } from "node:test";
import { indexable, notBool, notIndexable, notInt, notNum, notObject, notSet, testArgtype, testOperatorCommutative } from "./BaseTest";


describe('Check typesystem', () => {
    testOperatorCommutative('+', ['1'], ['nil', 'false', '[]', '{}']);
    testOperatorCommutative('-', ['1'], notNum);
    testOperatorCommutative('*', ['1'], notNum);
    testOperatorCommutative('/', ['1'], notNum);
    testOperatorCommutative('div', ['1'], notInt);
    testOperatorCommutative('mod', ['1'], notInt);
    testOperatorCommutative('<', ['1'], notNum);
    testOperatorCommutative('>', ['1'], notNum);
    testOperatorCommutative('<=', ['1'], notNum);
    testOperatorCommutative('>=', ['1'], notNum);
    testOperatorCommutative('and', ['true'], notBool);
    testOperatorCommutative('or', ['false'], notBool);
    testOperatorCommutative('union', ['{}'], notSet);
    testOperatorCommutative('intersect', ['{}'], notSet);
    testOperatorCommutative('\\', ['{}'], notSet);
    testArgtype('test index', (a) => `${a}[0]`, indexable, notIndexable);
    testArgtype('test index', (a) => `[0][${a}]`, ['0'], notInt);
    testArgtype('test dot', (a) => `${a}.x`, ['{x:1}'], notObject);
    testArgtype('test minus', (a) => `-${a}`, ['1', '1.5'], notNum);
    testArgtype('test not', (a) => `not ${a}`, ['true'], notBool);
    testArgtype('test in query', (a) => `0 in ${a}`, ['{}'], notSet)
})
