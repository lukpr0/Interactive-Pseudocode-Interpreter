import type Float from "./Types/Float.js";
import type Integer from "./Types/Integer.js";
import type Boolean from "./Types/Boolean.js";
import type Array from "./Types/Array.js";
import type Range from "./Range.js";
import type Object from "./Types/Object.js";
import type String from './Types/String.js'

export type Value 
    = Integer
    | Float
    | Boolean
    | Range
    | Array
    | Object
    | String
    ; 
