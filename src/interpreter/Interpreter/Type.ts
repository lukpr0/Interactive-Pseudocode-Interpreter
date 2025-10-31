
enum Type {
    Integer,
    Float,
    Boolean,
    Array,
    Set,
    Tuple,
    Function,
    Iterator,
    Object,
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
        case Type.Tuple:
            return "Tuple";
        case Type.Function:
            return "Function"
        case Type.Iterator:
            return "Iterator"
        case Type.Object:
            return "Object"
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