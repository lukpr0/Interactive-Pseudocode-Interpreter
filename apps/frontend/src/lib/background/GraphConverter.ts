import { Edge, Graph, Node } from "@interactive-pseudo/graph";
import { PseudoDict, PseudoString, Type, type Slot, type SymbolTable } from "@interactive-pseudo/interpreter";
import DictIterator from "@interactive-pseudo/interpreter/dist/Interpreter/DictIterator";

export function findGraph(table: SymbolTable<Slot>): Graph | null {
    let graphSlot = table.getVariable("graph");
    if (graphSlot == undefined) { return null; }
    let graph = graphSlot.value;
    if (graph.type != Type.Dict) { return null; }
    let result = findAdjacencyDict(graph);
    if (result) return result;
    result = findAdjacencyList(graph);
    if (result) return result;
    return null;
}

function findAdjacencyDict(graph: PseudoDict): Graph | null {
    let names: Map<string, Node> = getNodes(graph);
    let iter = new DictIterator(graph);
    let edges = []
    while (iter.hasNext()) {
        let entryTuple = iter.next()
        if (entryTuple.type != Type.Tuple) { return null; }
        let key = entryTuple.value[0].value;
        let value = entryTuple.value[1].value;
        if (key.type != Type.String || value.type != Type.Dict) { return null; }
        let from = names.get(key.value)!;
        let iterAdjacents = new DictIterator(value);
        while (iterAdjacents.hasNext()) {
            let adjacentTuple = iterAdjacents.next();
            if (adjacentTuple.type != Type.Tuple) { continue; }
            let otherKey = adjacentTuple.value[0].value;
            let distance = adjacentTuple.value[1].value;
            if (otherKey.type != Type.String || (distance.type != Type.Integer && distance.type != Type.Float)) { return null; }
            let to = names.get(otherKey.value)!;
            let distanceValue = Number(distance.value);
            let edge = new Edge(from, to, distanceValue);
            edges.push(edge);
        }
    }
    let result = new Graph(names.values().toArray());
    result.addEdges(edges);
    return result;
}

function findAdjacencyList(graph: PseudoDict): Graph | null {
    let names = getNodes(graph);
    let iter = new DictIterator(graph);
    let edges = []
    console.log("got nodes")
    while (iter.hasNext()) {
        let entryTuple = iter.next()
        if (entryTuple.type != Type.Tuple) { return null; }
        let key = entryTuple.value[0].value;
        let value = entryTuple.value[1].value;
        console.log(key, value)
        if (key.type != Type.String || value.type != Type.Array) { return null; }
        let from = names.get(key.value)!;
        console.log("getting edges")
        for (const slot of value.value) {
            let otherKey = slot.value;
            if (otherKey.type != Type.String) { return null; }
            let to = names.get(otherKey.value)!;
            const DISTANCE_VALUE = 1;
            let edge = new Edge(from, to, DISTANCE_VALUE);
            edges.push(edge);
        }
    }
    let result = new Graph(names.values().toArray());
    result.addEdges(edges);
    return result;
}

function getNodes(graph: PseudoDict): Map<string, Node> {
    let names: Map<string, Node> = new Map();
    for (const slot of graph.keys.values()) {
        let value = slot.value;
        if (value.type == Type.String) {
            let name = value.value;
            let node = new Node(name);
            names.set(name, node);
        }
    }
    return names;
}