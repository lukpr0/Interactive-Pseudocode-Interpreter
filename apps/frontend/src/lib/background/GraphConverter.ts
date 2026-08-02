import { PseudoDict, Type, type Slot, type SymbolTable } from "@interactive-pseudo/interpreter";
import DictIterator from "@interactive-pseudo/interpreter/dist/Interpreter/DictIterator";
import { GraphConfig } from "@interactive-pseudo/graph/src/GraphConfig";

export function findGraph(table: SymbolTable<Slot>): GraphConfig | null {
    let graphSlot = table.getVariable("graph");
    if (graphSlot == undefined) { 
        return null; 
    }
    let graph = graphSlot.value;
    if (graph.type != Type.Dict) {
        return null; 
    }
    let result = findAdjacencyDict(graph);
    if (result) {
        return result;
    }
    result = findAdjacencyList(graph);
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
        let key = entryTuple.value[0].value;
        let value = entryTuple.value[1].value;
        if (key.type != Type.String || value.type != Type.Dict) { return null; }
        let from = key.value;
        let iterAdjacents = new DictIterator(value);
        while (iterAdjacents.hasNext()) {
            let adjacentTuple = iterAdjacents.next();
            console.log(adjacentTuple)
            if (adjacentTuple.type != Type.Tuple) { continue; }
            let otherKey = adjacentTuple.value[0].value;
            let distance = adjacentTuple.value[1].value;
            if (otherKey.type != Type.String || (distance.type != Type.Integer && distance.type != Type.Float)) { console.log(otherKey, distance); continue; }
            let to = otherKey.value;
            let distanceValue = Number(distance.value);
            result.addEdge(from, to, distanceValue)
        }
    }
    return result;
}

function findAdjacencyList(graph: PseudoDict): GraphConfig | null {
    let iter = new DictIterator(graph);
    let result = new GraphConfig();
    for (const node of getNodes(graph)) {
        result.addNode(node);
    }
    while (iter.hasNext()) {
        let entryTuple = iter.next()
        if (entryTuple.type != Type.Tuple) { return null; }
        let from = entryTuple.value[0].value;
        let value = entryTuple.value[1].value;
        if (from.type != Type.String || value.type != Type.Array) { return null; }
        for (const slot of value.value) {
            let to = slot.value;
            let distanceValue;
            switch (to.type) {
                case Type.Tuple:
                    let toName = to.value[0].value
                    let distance = to.value[1].value
                    if (toName.type != Type.String || (distance.type != Type.Integer && distance.type != Type.Float) ) { return null; }
                    distanceValue = distance.value
                    result.addEdge(from.value, toName.value, Number(distanceValue));
                    break;
                case Type.String:
                    distanceValue = 1;
                    result.addEdge(from.value, to.value, distanceValue);
                    break;
                default:
                    return null;
            }
        }
    }
    return result;
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