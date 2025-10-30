import type Float from "./Types/Float.js";
import type Integer from "./Types/Integer.js";
import type Boolean from "./Types/Boolean.js";
import type Array from "./Types/Array.js";
import type Range from "./Range.js";

export type Value 
    = Integer
    | Float
    | Boolean
    | Range
    | Array
    ; 
