import { describe } from "node:test";
import { PseudoFloat, PseudoInteger } from "../dist/Interpreter/Types";
import { test, expect } from "vitest";

describe('Test equality of keys', () => {
    test('Test Integer equality', () => {
        const a = new PseudoInteger(1n);
        const b = new PseudoInteger(1n);
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).toEqual(bKey)
    });
    
    test('Test Integer equality (negative)', () => {
        const a = new PseudoInteger(-1n);
        const b = new PseudoInteger(-1n);
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).toEqual(bKey)
    });
    
    test('Test Integer equality (zero)', () => {
        const a = new PseudoInteger(0n);
        const b = new PseudoInteger(0n);
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).toEqual(bKey)
    });
    
    test('Test Integer-Float inequality', () => {
        const a = new PseudoInteger(1n);
        const b = new PseudoFloat(1);
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).not.toEqual(bKey)
    });
    
    test('Test Integer-Float inequality (negative)', () => {
        const a = new PseudoInteger(-1n);
        const b = new PseudoFloat(-1);
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).not.toEqual(bKey)
    });
    
    test('Test Integer-Float inequality (zero)', () => {
        const a = new PseudoInteger(0n);
        const b = new PseudoFloat(0);
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).not.toEqual(bKey)
    });
})