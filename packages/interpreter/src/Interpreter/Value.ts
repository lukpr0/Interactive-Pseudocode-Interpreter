import type { PseudoFloat, PseudoInteger, PseudoBoolean, PseudoArray, PseudoObject, PseudoString, PseudoNil, PseudoSet } from "./Types/index.js";
import type Range from "./Range.js";

export type Value 
    = PseudoInteger
    | PseudoFloat
    | PseudoBoolean
    | Range
    | PseudoArray
    | PseudoObject
    | PseudoString
    | PseudoNil
    | PseudoSet
    ; 
