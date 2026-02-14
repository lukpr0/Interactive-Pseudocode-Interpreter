import { describe } from "node:test";
import { test, expect } from "vitest";
import { type Value, PseudoInteger, PseudoFloat, PseudoBoolean, PseudoString, PseudoNil, PseudoArray, PseudoTuple, Slot, PseudoDict, PseudoSet, PseudoObject } from "../src";
import { testKeyInequality } from "./BaseTest";


function testKeyEquality(name: string, a: Value, b: Value) {
    test(name, () => {
        const aKey = a.asKey();
        const bKey = b.asKey();
        expect(aKey).toEqual(bKey);
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


    const listEmpty = new PseudoArray();
    
    const tupleA = new PseudoTuple()
    tupleA.value.push(new Slot(element1A));
    tupleA.value.push(new Slot(element2A));
    
    const tupleB = new PseudoTuple()
    tupleB.value.push(new Slot(element1B));
    tupleB.value.push(new Slot(element2B));
    
    const tupleC = new PseudoTuple()
    tupleC.value.push(new Slot(element2B));
    tupleC.value.push(new Slot(element1B));

    testKeyEquality('Test Tuple Equality', tupleA, tupleB);
    
    const setA = new PseudoSet()
    setA.insert(element1A);
    setA.insert(element2A);
    
    const setB = new PseudoSet()
    setB.insert(element1B);
    setB.insert(element2B);

    const setC = new PseudoSet();
    setC.insert(element2B);
    setC.insert(element1B);
    
    const setD = new PseudoSet();
    setD.insert(element2B);
    
    testKeyEquality('Test Set equality', setA, setB);
    testKeyEquality('Test Set equality', setA, setC);

    const dictA = new PseudoDict();
    dictA.add(oneIntA, element1A);
    dictA.add(zeroIntA, element2A);
    
    const dictB = new PseudoDict();
    dictB.add(oneIntB, element1B);
    dictB.add(zeroIntB, element2B);
    
    const dictC = new PseudoDict();
    dictC.add(zeroIntB, element2B);
    dictC.add(oneIntB, element1B);

    const dictD = new PseudoDict();
    dictD.add(zeroIntB, element2B);

    testKeyEquality('Test Dict equality', dictA, dictB);
    testKeyEquality('Test Dict equality', dictA, dictC);
    
    const objA = new PseudoObject();
    objA.set("a", element1A);
    objA.set("b", element2A);
    
    const objB = new PseudoObject();
    objB.set("a", element1B);
    objB.set("b", element2B);
    
    const objC = new PseudoObject();
    objC.set("b", element2B);
    objC.set("a", element1B);

    const objD = new PseudoObject();
    objD.set("a", element2B);

    testKeyEquality('Test Object equality', objA, objB);
    testKeyEquality('Test Object equality', objA, objC);

    const everything = [oneIntA, oneFloatA, negOneIntA, negOneFloatB, zeroIntA, zeroFloatA, emptyStringA, zeroStringA, stringA, trueA, falseA, listA, listC, listEmpty, nilA, tupleA, tupleC, setA, setD, dictA, dictD, objA, objD]

    testKeyInequality(everything)


})