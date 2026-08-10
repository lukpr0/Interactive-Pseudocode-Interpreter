import { PseudoArray, PseudoDict, PseudoFloat, PseudoInteger, PseudoSet, PseudoString, PseudoTuple, Type, type Slot, type SymbolTable, type Value } from "@interactive-pseudo/interpreter";
import DictIterator from "@interactive-pseudo/interpreter/dist/Interpreter/DictIterator";
import { GraphConfig } from "@interactive-pseudo/graph/src/GraphConfig";

type KeyType = PseudoInteger | PseudoString;
type NumericType = PseudoInteger | PseudoFloat

export function getGraphConfig(table: SymbolTable<Slot>): GraphConfig | null {
    let graphSlot = table.getVariable("graph");
    let colorSlot = table.getVariable("colors");
    if (graphSlot == undefined) { 
        return null; 
    }
    let graph = graphSlot.value;
    
    let graphConfig;
    switch (graph.type) {
        case Type.Dict:
            graphConfig = findGraphFromDict(graph);
            break;
        case Type.Array:
        case Type.Set:
            graphConfig = findEdgelistOrSet(graph);
    }

    if (!graphConfig) {
        return null;
    }

    if (colorSlot == undefined) {
        return graphConfig;
    }
    let colorDict = colorSlot.value;
    if (colorDict.type != Type.Dict) {
        return graphConfig;
    }

    let colors = findColors(colorDict);
    if (!colors) {
        return graphConfig;
    }

    graphConfig.nodeColors = colors.nodeColors;
    graphConfig.edgeColors = colors.edgeColors;

    return graphConfig;

}

function findGraphFromDict(graph: PseudoDict): GraphConfig | null {
    let result = findAdjacencyDict(graph);
    if (result) {
        return result;
    }
    result = findAdjacencyListOrSet(graph);
    if (result) {
        return result;
    }
    return null;

}

function findAdjacencyDict(graph: PseudoDict): GraphConfig | null {
    let iter = new DictIterator(graph);
    let result = new GraphConfig();
    for (const node of getNodes(graph)) {
        result.addNode(node);
    }
    while (iter.hasNext()) {
        let entryTuple = iter.next()
        if (entryTuple.type != Type.Tuple) { return null; }
        let [key, value] = entryTuple.value.map(v => v.value);
        if (!isIntOrString(key.type) || value.type != Type.Dict) { return null; }
        let from = (key as KeyType).value;
        let iterAdjacents = new DictIterator(value);
        while (iterAdjacents.hasNext()) {
            let adjacentTuple = iterAdjacents.next();
            if (adjacentTuple.type != Type.Tuple) { continue; }
            let [otherKey, distance] = adjacentTuple.value.map(v => v.value);
            if (!isIntOrString(otherKey.type) || !isNumber(distance.type)) { continue; }
            let to = (otherKey as KeyType).value;
            let distanceValue = Number((distance as NumericType).value);
            result.addEdge(String(from), String(to), distanceValue)
        }
    }
    return result;
}

function findAdjacencyListOrSet(graph: PseudoDict): GraphConfig | null {
    let iter = new DictIterator(graph);
    let result = new GraphConfig();
    for (const node of getNodes(graph)) {
        result.addNode(node);
    }
    while (iter.hasNext()) {
        let entryTuple = iter.next()
        if (entryTuple.type != Type.Tuple) { return null; }
        let [from, value] = entryTuple.value.map(v => v.value);
        if (!isIntOrString(from.type) || value.type != Type.Array && value.type != Type.Set) { return null; }
        for (const slot of getIterFromArrayOrSet(value)) {
            let keyResult = getKey(slot.value);
            if (keyResult) {
                let [to, distanceValue] = keyResult;
                result.addEdge(String((from as KeyType).value), String(to), distanceValue)
            }
        }
    }
    return result;
}

function findEdgelistOrSet(graph: PseudoArray | PseudoSet): GraphConfig | null {
    let result = new GraphConfig()
    let nodes = new Set();
    for (const slot of getIterFromArrayOrSet(graph)) {
        const value = slot.value;
        if (value.type != Type.Tuple) { return null; }
        let [from, to, distance] = value.value.map(v => v.value);
        if (!isIntOrString(from.type) || !isIntOrString(to.type) || distance ?  !isNumber(distance.type) : false) { return null; }
        const fromLabel = String((from as KeyType).value);
        const toLabel = String((to as KeyType).value);
        if (!nodes.has(fromLabel)) {
            result.addNode(fromLabel);
        }
        nodes.add(fromLabel);
        if (!nodes.has(toLabel)) {
            result.addNode(toLabel);
        }
        nodes.add(toLabel);
        const distanceValue = distance ? Number((distance as PseudoInteger | PseudoFloat).value) : 1;
        result.addEdge(fromLabel, toLabel, distanceValue); 
    }
    return result;
}

function getKey(value: Value): [KeyType, number] | null {
    let distanceValue;
    switch (value.type) {
        case Type.Tuple:
            let [toName, distance] = value.value.map(v => v.value)
            if (!isIntOrString(toName.type) || !isNumber(distance.type) ) { return null; }
            distanceValue = (distance as PseudoInteger || PseudoFloat).value
            return [(toName as KeyType), Number(distanceValue)]
        case Type.String:
        case Type.Integer:
            distanceValue = 1;
            return [(value as KeyType), distanceValue]
        default:
            return null;
    }
    
}

function getIterFromArrayOrSet(object: PseudoArray | PseudoSet): Iterable<Slot> {
    if (object instanceof PseudoArray) {
        return object.value;
    } else {
        return object.values.values();
    }
}

function getNodes(graph: PseudoDict): string[] {
    let names = [];
    for (const slot of graph.keys.values()) {
        let value = slot.value;
        if (value.type == Type.String) {
            let name = value.value;
            names.push(name);
        }
    }
    return names;
}

function findColors(colors: PseudoDict): GraphConfig | null {
    const config = new GraphConfig();
    const iterator = new DictIterator(colors);
    while (iterator.hasNext()) {
        const entryTuple = iterator.next()
        if (entryTuple.type != Type.Tuple) { return null; }
        let [key, color] = entryTuple.value.map(v => v.value);
        if (color.type != Type.String) { continue; }
        if (isIntOrString(key.type)) {
            config.setNodeColor(String((key as KeyType).value), color.value);
        }
        if (key.type != Type.Tuple) { continue; }
        let [from, to] = key.value.map(v => v.value);
        if (isIntOrString(from.type) || isIntOrString(to.type)) {
            config.setEdgeColor(String((from as KeyType).value), String((to as KeyType).value), color.value);
        }
    }
    return config;
}

function isIntOrString(key: Type) {
    return key == Type.String || key == Type.Integer;
}

function isNumber(type: Type) {
    return type == Type.Integer || type == Type.Float;
}