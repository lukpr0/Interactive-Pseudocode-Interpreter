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
    const oneFloatA = new PseudoFloat(1);
    const negOneFloatA = new PseudoFloat(-1);
    const zeroFloatA = new PseudoFloat(0);
    testKeyEquality('Test Integer equality', oneIntA, oneIntB);
    
    testKeyEquality('Test Integer equality (negative)', negOneIntA, negOneIntB)
    testKeyEquality('Test Integer equality (zero)', zeroIntA, zeroIntB)
    testKeyInequality('Test Integer-Float inequality', oneIntA, oneFloatA)
    testKeyInequality('Test Integer-Float inequality (negative)', negOneIntA, negOneFloatA)
    testKeyInequality('Test Integer-Float inequality (zero)', zeroIntA, zeroFloatA)
})