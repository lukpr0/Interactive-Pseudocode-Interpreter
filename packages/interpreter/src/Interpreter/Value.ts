import type { PseudoFloat, PseudoInteger, PseudoBoolean, PseudoArray, PseudoObject, PseudoString, PseudoNil, PseudoSet, PseudoTuple, PseudoDict } from "./Types/index.js";
import type Range from "./Range.js";
import type ArrayIterator from "./ArrayIterator.js";
import type SetIterator from "./SetIterator.js";

export type Value 
    = PseudoInteger
    | PseudoFloat
    | PseudoBoolean
    | PseudoArray
    | PseudoDict
    | PseudoTuple
    | PseudoObject
    | PseudoString
    | PseudoNil
    | PseudoSet
    | Range
    | ArrayIterator
    | SetIterator
    ; 
