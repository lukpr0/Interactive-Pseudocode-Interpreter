import type { Value } from "./Value";

enum Type {
    Integer,
    Float,
    Boolean,
    Array,
    Set,
    Dict,
    Tuple,
    Function,
    Iterator,
    Object,
    String,
    Nil
}

export default Type;

export function typeToString(type: Type): string {
    switch (type) {
        case Type.Integer:
            return "Integer";
        case Type.Float:
            return "Float";
        case Type.Boolean:
            return "Boolean";
        case Type.Array:
            return "Array";
        case Type.Set:
            return "Set";
        case Type.Dict:
            return "Dict";
        case Type.Tuple:
            return "Tuple";
        case Type.Function:
            return "Function"
        case Type.Iterator:
            return "Iterator"
        case Type.Object:
            return "Object"
        case Type.String:
            return "String"
        case Type.Nil:
            return "Nil"
    }
}

export function toSimpleString(value: Value): string {
    switch (value.type) {
        case Type.Array:
            return "Array"
        case Type.Object:
            return "Object"
        case Type.Set:
            return "Set"
        case Type.Dict:
            return "Dict"
        default:
            return value.toString()
    }
}

/*
enum Type {
    Integer = "int",
    Float = "float",
    Boolean = "bool",
    Array = "array",
    Set = "set",
    Tuple = "tuple",
    Function = "function"
}
*/