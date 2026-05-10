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

export function toSimpleString(value: Value, seen: Set<object> = new Set()): string {
    if (seen.has(value)) {
        return typeToString(value.type);
    }
    switch (value.type) {
        case Type.Integer:
        case Type.Float:
        case Type.Boolean:
        case Type.String:
        case Type.Nil:
            return value.toString();
        case Type.Array:
            seen.add(value);
            return `[${value.value.map(slot => toSimpleString(slot.value, seen)).join(", ")}]`;
        case Type.Set:
            seen.add(value);
            return `{${value.values.entries().map(([_, slot]) => toSimpleString(slot.value, seen))
                .toArray()
                .join(", ")}}`;
        case Type.Dict:
            seen.add(value);
            return `[${value.values.keys()
                .map(key => {
                const keyObj = value.keys.get(key)!.value;
                const entry = value.values.get(key)!.value;
                const keyStr = toSimpleString(keyObj, seen);
                const entryStr = toSimpleString(entry, seen);
                return `${keyStr}: ${entryStr}`;
            }).toArray()
        .join(", ")}]`
        case Type.Tuple:
            seen.add(value);
            return `(${value.value.map(slot => slot.value.toString()).join(", ")})`
        case Type.Iterator:
            return "iterator"
        case Type.Object:
            seen.add(value);
            return `{${value.values.keys()
                .map(key => {
                const entry = value.values.get(key)!.value;
                const valueStr = toSimpleString(entry, seen);
                return `${key}: ${valueStr}`;
            }).toArray()
            .join(", ")}}`
    }
}

export function asKey(value: Value, seen: Set<object> = new Set()): string {
    if (seen.has(value)) {
        return `$cycle$${value.type}$`
    }
    switch (value.type) {
        case Type.Integer:
            return JSON.stringify({
                type: Type.Integer,
                value: value.toString()
            });
        case Type.Float:
            return JSON.stringify({
                type: Type.Float,
                value: value.toString()
            });
        case Type.Boolean:
            return JSON.stringify({
                type: Type.Boolean,
                value: value.toString()
            });
        case Type.String:
            return JSON.stringify({
                type: Type.String,
                value: value.toString()
            });
        case Type.Nil:
            return JSON.stringify({
                type: Type.Nil,
            });
        case Type.Array:
            seen.add(value);
            return JSON.stringify({
                type: Type.Array,
                value: value.value.map(s => asKey(s.value, seen))
            });
        case Type.Set:
            seen.add(value);
            return JSON.stringify({
                type: Type.Set,
                value: value.values.keys().toArray().sort()
            });
        case Type.Dict:
            seen.add(value);
            return JSON.stringify({
                type: Type.Set,
                value: value.values.keys().toArray().sort(),
                keys: value.keys.keys().toArray().sort()
            });
        case Type.Tuple:
            seen.add(value);
            return JSON.stringify({
                type: Type.Tuple,
                value: value.value.map(v => asKey(v.value, seen))
            });
        case Type.Iterator:
            return "iterator"
        case Type.Object:
            seen.add(value);
            return JSON.stringify({
                type: Type.Object,
                value: value.values.entries()
                    .toArray()
                    .sort(([a, ar], [b, br]) => a.localeCompare(b))
                    .map(([key, slot]) => `${key}:${asKey(slot.value, seen)}`)
            });
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