import { Edge, Graph, Node } from "@interactive-pseudo/graph";
import { PseudoString, Type, type Slot, type SymbolTable } from "@interactive-pseudo/interpreter";
import DictIterator from "@interactive-pseudo/interpreter/dist/Interpreter/DictIterator";

export function findGraph(table: SymbolTable<Slot>): Graph | null {
    let graphSlot = table.getVariable("graph");
    if (graphSlot == undefined) { return null; }
    let graph = graphSlot.value;
    if (graph.type != Type.Dict) { return null; }
    let names: Map<string, Node> = new Map();
    for (const slot of graph.keys.values()) {
        let value = slot.value;
        if (value.type == Type.String) {
            let name = value.value;
            let node = new Node(name);
            names.set(name, node);
        }
    }
    let iter = new DictIterator(graph);
    let edges = []
    while (iter.hasNext()) {
        let entryTuple = iter.next()
        if (entryTuple.type != Type.Tuple) { continue; }
        let key = entryTuple.value[0].value;
        let value = entryTuple.value[1].value;
        if (key.type != Type.String || value.type != Type.Dict) { continue; }
        let from = names.get(key.value)!;
        let iterAdjacents = new DictIterator(value);
        while (iterAdjacents.hasNext()) {
            let adjacentTuple = iterAdjacents.next();
            if (adjacentTuple.type != Type.Tuple) { continue; }
            let otherKey = adjacentTuple.value[0].value;
            let distance = adjacentTuple.value[1].value;
            if (otherKey.type != Type.String || (distance.type != Type.Integer && distance.type != Type.Float)) { continue; }
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