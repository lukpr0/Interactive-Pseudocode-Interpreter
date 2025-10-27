import type Type from "./Type.js";
import type Float from "./Types/Float.js";
import type Integer from "./Types/Integer.js";
import type Boolean from "./Types/Boolean.js";

export type Value 
    = Integer 
    | Float
    | Boolean
    ;