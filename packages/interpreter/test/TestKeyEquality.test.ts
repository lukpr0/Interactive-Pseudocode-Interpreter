import { describe } from "node:test";
import { test, expect } from "vitest";
import { type Value, PseudoInteger, PseudoFloat, PseudoBoolean, PseudoString, PseudoNil, PseudoArray } from "../src";


function testKeyEquality(name: string, a: Value, b: Value) {
    test(name, () => {
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).toEqual(bKey);
    })
}

function testKeyInequality(name: string, a: Value, b: Value) {
    test(name, () => {
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).not.toEqual(bKey);
    })
}

describe('Test equality of keys', () => {
    const oneIntA = new PseudoInteger(1n);
    const oneIntB = new PseudoInteger(1n);
    const negOneIntA = new PseudoInteger(-1n);
    const negOneIntB = new PseudoInteger(-1n);
    const zeroIntA = new PseudoInteger(0n);
    const zeroIntB = new PseudoInteger(0n);
    testKeyEquality('Test Integer equality', oneIntA, oneIntB);
    testKeyEquality('Test Integer equality (negative)', negOneIntA, negOneIntB)
    testKeyEquality('Test Integer equality (zero)', zeroIntA, zeroIntB)

    const oneFloatA = new PseudoFloat(1);
    const oneFloatB = new PseudoFloat(1);
    const negOneFloatA = new PseudoFloat(-1);
    const negOneFloatB = new PseudoFloat(-1);
    const zeroFloatA = new PseudoFloat(0);
    const zeroFloatB = new PseudoFloat(0);
    
    testKeyEquality('Test Float equality', oneFloatA, oneFloatB);
    testKeyEquality('Test Float equality (negative)', negOneFloatA, negOneFloatB)
    testKeyEquality('Test Float equality (zero)', zeroFloatA, zeroFloatB)

    const nilA = new PseudoNil();
    const nilB = new PseudoNil();

    testKeyEquality('Test Nil equality', nilA, nilB);

    const emptyStringA = new PseudoString("");
    const emptyStringB = new PseudoString("");
    const zeroStringA = new PseudoString("0");
    const zeroStringB = new PseudoString("0");
    const stringA = new PseudoString("abc");
    const stringB = new PseudoString("abc");

    testKeyEquality('Test String equality (empty string)', emptyStringA, emptyStringB);
    testKeyEquality('Test String equality ("0")', zeroStringA, zeroStringB);
    testKeyEquality('Test String equality ("abc")', stringA, stringB);

    const trueA = new PseudoBoolean(true);
    const trueB = new PseudoBoolean(true);
    const falseA = new PseudoBoolean(false);
    const falseB = new PseudoBoolean(false);

    testKeyEquality('Test Boolean equality (true)', trueA, trueB);
    testKeyEquality('Test Boolean equality (false)', falseA, falseB);

    testKeyInequality('Test Integer-Float inequality', oneIntA, oneFloatA)
    testKeyInequality('Test Integer-Float inequality (negative)', negOneIntA, negOneFloatA)
    testKeyInequality('Test Integer-Float inequality (zero)', zeroIntA, zeroFloatA)

    testKeyInequality('Test Integer-Nil inequality', zeroIntA, nilA);

    testKeyInequality('Test Integer-Boolean inequality', oneIntA, trueA);
    testKeyInequality('Test Integer-Boolean inequality', zeroIntA, falseA);
    testKeyInequality('Test Integer-Boolean inequality', oneIntA, falseA);
    
    testKeyInequality('Test Integer-String inequality', zeroIntA, zeroStringA);
    testKeyInequality('Test Integer-String inequality', zeroIntA, emptyStringA);
    testKeyInequality('Test Integer-String inequality', zeroIntA, stringA);

    testKeyInequality('Test Float-Nil inequality', zeroFloatA, nilA);
    
    testKeyInequality('Test Float-Boolean inequality', oneFloatA, trueA);
    testKeyInequality('Test Float-Boolean inequality', zeroFloatA, falseA);
    testKeyInequality('Test Float-Boolean inequality', oneFloatA, falseA);

    testKeyInequality('Test Float-String inequality', zeroFloatA, zeroStringA);
    testKeyInequality('Test Float-String inequality', zeroFloatA, emptyStringA);
    testKeyInequality('Test Float-String inequality', zeroFloatA, stringA);

    testKeyInequality('Test Nil-Boolean inequality', nilA, falseA);
    testKeyInequality('Test Nil-Boolean inequality', nilA, trueA);

    testKeyInequality('Test Nil-String inequality', nilA, emptyStringA);
    testKeyInequality('Test Nil-String inequality', nilA, zeroStringA);
    testKeyInequality('Test Nil-String inequality', nilA, stringA);
    
    testKeyInequality('Test Boolean-String inequality', trueA, emptyStringA);
    testKeyInequality('Test Boolean-String inequality', trueA, zeroStringA);
    testKeyInequality('Test Boolean-String inequality', trueA, stringA);
    testKeyInequality('Test Boolean-String inequality', falseA, emptyStringA);
    testKeyInequality('Test Boolean-String inequality', falseA, zeroStringA);
    testKeyInequality('Test Boolean-String inequality', falseA, stringA);

    const listA = new PseudoArray()
    const element1A = new PseudoInteger(1n);
    const element2A = new PseudoInteger(2n);
    listA.push(element1A);
    listA.push(element2A);
    
    const listB = new PseudoArray()
    const element1B = new PseudoInteger(1n);
    const element2B = new PseudoInteger(2n);
    listB.push(element1B);
    listB.push(element2B);

    const listC = new PseudoArray();
    listC.push(element2B);
    listC.push(element1B);

    testKeyEquality('Test List equality', listA, listB);

    testKeyInequality('Test List inequality', listA, listC);

    const listEmpty = new PseudoArray();

    testKeyInequality('Test List-Integer inequality', listEmpty, zeroIntA);
    testKeyInequality('Test List-Float inequality', listEmpty, zeroFloatA);
    testKeyInequality('Test List-Nil inequality', listEmpty, nilA);
    testKeyInequality('Test List-Boolean inequality', listEmpty, falseA);
    testKeyInequality('Test List-String inequality', listEmpty, emptyStringA);

})